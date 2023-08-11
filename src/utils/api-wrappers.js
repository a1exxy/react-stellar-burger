import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../services/actions/loader'
import {SET_ORDER, CLEAR_ORDER} from '../services/actions/order'
import {LOGGED_IN, LOGGED_OUT, USER_UPDATED, USER_CHECKED} from '../services/actions/user'
import {
  apiCreateOrder,
  apiGetIngredients,
  apiGetOrder,
  apiGetUser,
  apiLogin,
  apiLogout, apiPasswdReset,
  apiRegister, apiSetNewPasswd, apiUpdateUser,
} from "./api";
import {getAccessToken, setTokensToLocalStorage} from './utils'
import React from "react";


export function getIngredients () {
  return function (dispatch) {
    dispatch({ type: SET_START_STATE })
    apiGetIngredients()
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
    apiCreateOrder({companents})
    .then(response => {
      if(response.success === true) {
        dispatch({type: SET_ORDER, number: response.order.number, content: companents, name: response.name})
      } else {
        return Promise.reject(`Сервер не смог сформировать заказ (${response.message})`)
      }
    })
    .catch(err => {
      console.error(`Ошибка сетевого взаимодействия: ${err.message}`);
      console.log(err)
    })
  }
}

export const getOrder = ({orderId}) => {
  return function (dispatch) {
    apiGetOrder({orderId})
    .then(res => {
      if(res && res.success) {
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
}

export const login = ({email, passwd}) => {
  return function (dispatch) {
    apiLogin({email, passwd})
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: res.user.name, email:res.user.email})
        // connectUserOrders(dispatch)
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
}

export const logout = () => {
  return function (dispatch) {
    apiLogout()
    .then(res => {
      if (res.success) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({type: LOGGED_OUT})
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
}

export const register = ({name, email, passwd, redirect}) => {
  return function (dispatch) {
    apiRegister({name, email, passwd})
    .then(res => {
      if(res.success) {
        setTokensToLocalStorage(res.accessToken, res.refreshToken)
        dispatch({type:LOGGED_IN, user: name, email:email})
        redirect()
      } else {
        console.error(`Не удалось пройти регистрацию`)
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
}

export function getUser () {
  return function (dispatch) {
    if (getAccessToken()) {
      apiGetUser()
      .then(res => {
        if(res && res.success) {
          dispatch({type: LOGGED_IN, user: res.user.name, email: res.user.email})
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

export const updateUser = ({name, email, passwd}) => {
  return function (dispatch) {
    apiUpdateUser({name, email, passwd})
    .then(res => {
      if(res.success) {
        dispatch({type: USER_UPDATED, user: res.user.name, email: res.user.email})
      } else {
        console.error(`Не удолось обновить пользователя`)
      }
    })
    .catch(e => console.error(e))
  }
}

export const passwdReset = ({email, redirect}) => {
  apiPasswdReset({email})
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
  apiSetNewPasswd({passwd, code})
  .then(res => {
    if (res.success) {
      redirect()
    } else {
      console.error(`Не удолось установить пароль`)
    }
  })
  .catch(e => console.error(e))
}
