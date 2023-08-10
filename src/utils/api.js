// Взаимодействие с API

import {setTokensToLocalStorage} from './utils'

const apiURL = process.env.REACT_APP_API
const baseOptions = {method:'GET', headers: {"Content-Type": "application/json;charset=utf-8"}, redirect: 'follow'}

const checkReponse = (res) => {
  // console.log(`RUN checkReponse`)
  // console.log(res)
  // console.log(`=======================`)
  // return res.ok ? res.json() : res.json().catch((err) => Promise.reject(err));
  const r = res.ok ? res.json() : Promise.reject(res);
  // console.log(r)
  return r
};

export const refreshToken = () => {
  // функция обновления токена
  return fetch(`${apiURL}/auth/token`,
  { ...baseOptions,
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken")})
      }
    )
    .then(checkReponse)
    .catch(e => console.error(`Не удалось обновить accessToken (${e})`))
}

export const request = async ({method='GET', path, body=null, auth=false, debug=false}) => {
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
    console.debug(`-------------------------------`)
    console.debug(`[Debug request] url: ${url}`)
    console.debug(`[Debug request] >`)
    console.debug(`[Debug request] params: `)
    console.debug(`[Debug request] method=${method}`)
    console.debug(`[Debug request] path=${path}`)
    console.debug(`[Debug request] body=${body}`)
    console.debug(`[Debug request] auth=${auth}`)
    console.debug(`[Debug request] debug=${debug}`)
    console.debug(`[Debug request] >`)
    console.debug(`[Debug request] options:`)
    console.debug(options)
    console.debug(`-------------------------------`)
  }
  try {
    const res = await fetch(url, options);
    if(debug){
      console.debug(`[Debug request] Reponse:`)
      console.debug(res)
    }
    return await checkReponse(res);
  } catch (err) {
    if (err && (err.message === "jwt expired" || !err.success || err.status === 403 || err.status === 401 || err.code === 401 )) {
      // console.log(err)
      if(debug){console.debug('[Debug request] Run refreshToken')}
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

export function apiGetIngredients () {
  return request({path: '/ingredients'})
}

export function apiCreateOrder ({companents}) {
  return request({
      method: "POST",
      path: '/orders',
      body: {"ingredients": companents},
      auth: true,
      debug: false
    })
}

export const apiGetOrder = ({orderId}) => {
  return request({path: `/orders/${orderId}`, debug: false})
}

export const apiLogin = ({email, passwd}) => {
  return request({
      path:'/auth/login',
      method: 'POST',
      body: {"email": email, "password": passwd}
    })
}

export const apiLogout = () => {
  return request({
      path:'/auth/logout',
      method: 'POST',
      body: {"token": localStorage.getItem('refreshToken')}
    })
}

export const apiRegister = ({ name, email, passwd}) => {
  return request({
      path:'/auth/register',
      method: 'POST',
      body: {"name": name, "email": email, "password": passwd}
    })
}

export function apiGetUser () {
  return request({
    path: '/auth/user',
    auth: true
  })
}

export const apiUpdateUser = ({name, email, passwd}) => {
  return request({
    path: '/auth/user',
    method: 'PATCH',
    auth: true,
    body: {"user": name, "email": email, "password": passwd}
    // Документации для данной ручки нет.
    // Опытным путем определил, что бекенд не меняет имя пользователя, только email и password доступны для изменения
  })
}

export const apiPasswdReset = ({email}) => {
  return request({
    path: '/password-reset',
    method: 'POST',
    body: {email: email}
  })
}

export const apiSetNewPasswd = ({passwd, code}) => {
  return request({
    path: '/password-reset/reset',
    method: 'POST',
    body: {password:passwd, token:code}
  })
}
