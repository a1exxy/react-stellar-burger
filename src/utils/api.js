// Взаимодействие с API
import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../services/actions/loader'
import {SET_ORDER, CLEAR_ORDER} from '../services/actions/order'
import {LOGGED_IN, LOGGED_OUT, USER_UPDATED, USER_CHECKED} from '../services/actions/user'
import {
  connect as connectUser,
  disconnect as disconnectUser,
} from "../services/userOrders/actions";

const apiURL = process.env.REACT_APP_API
const baseOptions = {method:'GET', headers: {"Content-Type": "application/json;charset=utf-8"}, redirect: 'follow'}
const WS_USER_ORDERS_URL = process.env.REACT_APP_WS_USER_ORDERS_URL

const getAccessToken = () => {
  return localStorage.getItem("accessToken")
}

const connectUserOrders = (dispatch) => {
  dispatch(connectUser(`${WS_USER_ORDERS_URL}?token=${getAccessToken().replace('Bearer ', '')}`));
}


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
      })
    })
    .then(checkReponse)
    .catch(e => console.error(`Не удалось обновить accessToken (${e})`))
};

const request = async ({method='GET', path, body=null, auth=false, debug=false}) => {
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
    console.log(`[Debug request] >`)
    console.log(`[Debug request] params: `)
    console.log(`[Debug request] method=${method}`)
    console.log(`[Debug request] path=${path}`)
    console.log(`[Debug request] body=${body}`)
    console.log(`[Debug request] auth=${auth}`)
    console.log(`[Debug request] debug=${debug}`)
    console.log(`[Debug request] >`)
    console.log(`[Debug request] options:`)
    console.log(options)
    console.log(`-------------------------------`)
  }
  try {
    const res = await fetch(url,  options);
    return await checkReponse(res);
  } catch (err) {
    if (err && (err.message === "jwt expired" || !err.success )) {
      if(debug){console.info('Run refreshToken')}
      const refreshData = await refreshToken(); //обновляем токен
      if (refreshData && !refreshData.success) {
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

export function getIngredients () {
  return function (dispatch) {
    dispatch({ type: SET_START_STATE })
      request({path: '/ingredients'})
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

export function createOrder ({companents}) {
  return function (dispatch) {
    dispatch({type: CLEAR_ORDER})
    request({
      method: "POST",
      path: '/orders',
      body: {"ingredients": companents},
      auth: true,
      debug: true
    })
    .then(response => {
      console.log(response)
      if(response.success === true) {
        dispatch({type: SET_ORDER, number: response.order.number, content: companents, name: response.name})
      } else {
          Promise.reject(`Сервер не смог сформировать заказ (${response.message})`)
      }
    })
    .catch(err => {
      console.error(`Ошибка сетевого взаимодействия: ${err.message}`);
      console.log(err)
    })
  }
}

export const getOrder = ({dispatch, orderId}) => {
  request({path: `/orders/${orderId}`, debug: false})
    .then(res => {
      if(res && res.success) {
        // console.log(res.orders[0])
        dispatch({type:SET_ORDER,
          number: res.orders[0].number,
          content:res.orders[0].ingredients,
          name: res.orders[0].name,
          status: res.orders[0].status,
          createdAt: res.orders[0].createdAt
        })
      }
    })
    .catch(e => {
      console.error(`Ошибка получения заказа (${e})`)
    })
}

export const login = ({dispatch, email, passwd}) => {
  request({
      path:'/auth/login',
      method: 'POST',
      body: {"email": email, "password": passwd}
    })
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: res.user.name, email:res.user.email})
        connectUserOrders(dispatch)
        return true
      } else {
        console.error(`Не удалось пройти аутантификацию`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      return false
    })
}

export const logout = (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken')
  request({
      path:'/auth/logout',
      method: 'POST',
      body: {"token": refreshToken}
    })
    .then(res => {
      if(res.success) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({type:LOGGED_OUT})
        dispatch(disconnectUser())
        return true
      } else {
        console.error(`Не удалось разлогинится`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      return false
    })
}

export const register = ({dispatch, name, email, passwd}) => {
  request({
      path:'/auth/register',
      method: 'POST',
      body: {"name": name, "email": email, "password": passwd}
    })
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: name, email:email})
        connectUserOrders(dispatch)
        return true
      } else {
        console.error(`Не удалось пройти регистрацию`)
        return false
      }
    })
    .catch(e => {
      console.error(e)
      return false
    })
}



export function getUser () {
  return function (dispatch) {
    const accessToken = getAccessToken()
    if (accessToken) {
      request({
          path: '/auth/user',
          auth: true
        })
        .then(res => {
          // console.log(res)
          if(res && res.success) {
            dispatch({type: LOGGED_IN, user: res.user.name, email: res.user.email})
            connectUserOrders(dispatch)
          }
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

export const passwdReset = ({email, redirect}) => {
  request({
    path: '/password-reset',
    method: 'POST',
    body: {email: email}
  })
  .then(res => {
    if (res.success) {
      redirect()
    } else {
      console.error(`Не удолось обновить пользователя`)
    }
  })
  .catch(e => console.error(e))
}

export const setNewPasswd = ({passwd, code, redirect}) => {
  request({
    path: '/password-reset/reset',
    method: 'POST',
    body: {password:passwd, token:code}
  })
  .then(res => {
    if (res.success) {
      redirect()
    } else {
      console.error(`Не удолось установить пароль`)
    }
  })
  .catch(e => console.error(e))
}
