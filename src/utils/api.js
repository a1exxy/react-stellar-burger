// Взаимодействие с API
import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../services/actions/loader'
import React from "react";
import {SET_ORDER, CLEAR_ORDER} from '../services/actions/order'
import {LOGGED_IN, LOGGED_OUT, USER_UPDATED, USER_CHECKED} from '../services/actions/user'

const apiURL = process.env.REACT_APP_API
const baseOptions = {method:'GET', headers: {"Content-Type": "application/json;charset=utf-8"}, redirect: 'follow'}


const ingredientsURL = process.env.REACT_APP_API_INGREDIENTS_URL
const ordersURL = process.env.REACT_APP_API_ORDERS

const options = {method:'GET', redirect:'follow'}
export function getIngredients () {
  return function (dispatch) {
    dispatch({ type: SET_START_STATE })
    fetch(ingredientsURL, options)
      .then( res  => {
          if (res.ok){
            return Promise.resolve(res.json())
          } else {
            return Promise.reject(`Ошибка сетевого взаимодействия: ${res.status}`)
          }
        }
      )
      .then( res => {
        dispatch({
          type: SET_OK_STATE,
          feed: res.data
        })
      })
      .catch( err => {
        dispatch({ type: SET_FAIL_STATE })
        console.error(`Ошибка сетевого взаимодействия: ${err}`)
      })
  }
}

export function createOrder ({companents, onSuccess}) {
  return function (dispatch) {
    dispatch({type: CLEAR_ORDER})
    fetch(ordersURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"ingredients": companents})
    })
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(`Ошибка сетевого взаимодействия: ${response.status}`)
      }
    })
    .then(response => {
      if(response.success === true) {
        onSuccess({orderNum: response.order.number, content: companents})
      } else {
          Promise.reject(`Сервер не смог сформировать заказ (${response.message})`)
      }
    })
    .catch(err => {
      console.error(`Ошибка сетевого взаимодействия: ${err.message}`);
    })
  }
}

// -----------------------------------------------------------------------------------------

const setTokensToLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  // функция обновления токена
  return fetch(`${apiURL}/auth/token`,
      { ...baseOptions,
        method: "POST",
        body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
    .then(checkReponse)
    .catch(e => console.error(`Не удалось обновить accessToken (${e})`))
};

export const request = async ({method='GET', path, body=null, auth=false, debug=true}) => {
  // Универсальная функция запроса к API
  const url = `${apiURL}${path}`
  const accessToken = localStorage.getItem('accessToken')
  let options = {
    ...baseOptions,
    method: method,
  }
  if(body){ options.body = JSON.stringify(body)}
  if (auth) {
    if(!accessToken) {return Promise.reject(`Запрос без токена`)}
    options.authorization = accessToken
  }
  if(debug) {
    console.log(`-------------------------------`)
    console.log(`[Debug request] url: ${url}`)
    console.log(`[Debug request] options:`)
    console.log(options)
    console.log(`-------------------------------`)
  }
  try {
    const res = await fetch(url,  options);
    return await checkReponse(res);
  } catch (err) {
    console.log(err)
    if (err.message === "jwt expired" || !err.success ) {
      if(debug){console.info('Run refreshToken')}
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setTokensToLocalStorage(refreshData.accessToken, refreshData.refreshToken)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export const login = ({dispatch, email, passwd}) => {
  console.log('Run apiAuth.login')
  request({
      path:'/auth/login',
      method: 'POST',
      body: {"email": email, "password": passwd}
    })
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: res.user.name, email:res.user.email})
        return true
      } else {
        console.error(`Не удалось пройти аутантификацию`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      alert(e.message)
      return false
    })
}

export const logout = (dispatch) => {
  console.info(`Run apiAuth.logout`)
  const refreshToken = localStorage.getItem('refreshToken')
  request({
      path:'/auth/logout',
      method: 'POST',
      body: {"token": refreshToken}
    })
    .then(res => {
      console.log(res)
      if(res.success) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({type:LOGGED_OUT})
        return true
      } else {
        console.error(`Не удалось разлогинится`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      alert(e.message)
      return false
    })
}

export const register = ({dispatch, name, email, passwd}) => {
  console.info(`Run apiAuth.register`)
  request({
      path:'/auth/register',
      method: 'POST',
      body: {"name": name, "email": email, "password": passwd}
    })
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: name, email:email})
        return true
      } else {
        console.error(`Не удалось пройти регистрацию`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      alert(e.message)
      return false
    })
}

export function getUser () {
  return function (dispatch) {
    console.info(`Run apiAuth.getUser`)
    if (localStorage.getItem("accessToken")) {
      request({
          path: '/auth/user',
          auth: true
        })
        .then(res => {
          console.log(res)
          dispatch({type:LOGGED_IN, user: res.user.name, email:res.user.email})
        })
        .catch(e => console.error(e))
        .finally(dispatch({type:USER_CHECKED}))
    } else {
      console.info('Нет токена')
      dispatch({type:USER_CHECKED})
    }
  }
}

export const updateUser = ({dispatch, name, email, passwd}) => {
  console.info(`Run apiAuth.updateUser`)
  request({
    path: '/auth/user',
    method: 'PATCH',
    auth: true,
    body: {"user": name, "email": email, "password": passwd}
    // Документации для данной ручки нет.
    // Опытным путем определил, что бекенд не меняет имя пользователя, только email и password доступны для изменения
  })
  .then(res => {
    if(res.success) {
      dispatch({type: USER_UPDATED, user: res.user.name, email: res.user.email})
    } else {
      console.error(`Не удолось обновить пользователя`)
    }
  })
  .catch(e => console.error(e))
}

export const passwdReset = ({dispatch, email, redirect}) => {
  console.info(`Run apiAuth.passwdReset`)
  request({
    path: '/password-reset',
    method: 'POST',
    body: {email: email}
  })
  .then(res => {
    if (res.success) {
      // dispatch({type: USER_SET_RECOVERY_EMAIL, recoveryEmail: email})
      console.log(res)
      redirect()
    } else {
      console.error(`Не удолось обновить пользователя`)
    }
  })
  .catch(e => console.error(e))
}
//{"name":"aaaa","email":"a1exx.y@ya.ru","password":"aaaa"}
export const setNewPasswd = ({passwd, code, redirect}) => {
  console.info(`Run apiAuth.setNewPasswd`)
  request({
    path: '/password-reset/reset',
    method: 'POST',
    body: {password:passwd, token:code}
  })
  .then(res => {
    if (res.success) {
      // dispatch({type: USER_SET_RECOVERY_EMAIL, recoveryEmail: email})
      console.error(res)
      redirect()
    } else {
      console.error(`Не удолось установить пароль`)
    }
  })
  .catch(e => console.error(e))
}
