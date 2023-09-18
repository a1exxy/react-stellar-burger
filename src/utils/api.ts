// Взаимодействие с API

import {TIngredient, TOrder} from '../services/types';
import {setTokensToLocalStorage} from './utils'

const apiURL = process.env.REACT_APP_API!

type TOptions = {
  method: string,
  headers: Record<string, string>,
  body?: string,
}


export type TResponse<T> = {
  success: boolean;
} & T
// | string;

export type TUser = {
  user: {
    email: string,
    name: string
  }
}

export type TTokens = {
  accessToken: string,
  refreshToken: string,
}

export type TLogin = TTokens & TUser

type TRequestProps = {
  method?: string,
  path: string,
  body?: object | null,
  auth?: boolean,
  debug?: boolean
}

type TGetOrderResponse = TOrder & {
  owner: string
}

type TOrderCreated = {
  name: string,
  order: {
    ingredients: Array<TOrder>,
    _id: string,
    owner: {
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string,
    },
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    price: number
  }
}

const baseOptions: TOptions = {method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8"}}

const checkReponse = <T>(res: Response): Promise<TResponse<T>> => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};

export const refreshToken = (): Promise<TResponse<TLogin>> => {
  // функция обновления токена
  return fetch(`${apiURL}/auth/token`,
    {
      ...baseOptions,
      method: "POST",
      body: JSON.stringify({token: localStorage.getItem("refreshToken")})
    }
  )
    .then(checkReponse<TLogin>)
    .catch(e => {
      // console.error(`Не удалось обновить accessToken (${e})`)
      return Promise.reject(e.message)
    })
}


export const request = async <T>({
                                   method = 'GET',
                                   path,
                                   body = null,
                                   auth = false,
                                   debug = false
                                 }: TRequestProps): Promise<TResponse<T>> => {
  // Универсальная функция запроса к API
  const url = `${apiURL}${path}`
  const accessToken = localStorage.getItem('accessToken')
  let options: TOptions = {
    ...baseOptions,
    method: method,
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  if (auth) {
    if (!accessToken) {
      return Promise.reject(`Запрос без токена`)
    }
    options.headers.authorization = accessToken
  }
  if (debug) {
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
    if (debug) {
      console.debug(`[Debug request] Reponse:`)
      console.debug(res)
    }
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired" || !err.success || err.status === 403 || err.status === 401 || err.code === 401) {
      if (debug) {
        console.debug('[Debug request] Run refreshToken')
      }
      const refreshData = await refreshToken(); //обновляем токен
      console.log('refreshData:')
      console.log(refreshData)

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setTokensToLocalStorage(refreshData.accessToken, refreshData.refreshToken)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err.message);
    }
  }
}

export function apiGetIngredients(): Promise<TResponse<{ data: TIngredient }>> {
  return request({path: '/ingredients'})
}

export function apiCreateOrder({companents}: { companents: Array<string> }): Promise<TResponse<TOrderCreated>> {
  return request({
    method: "POST",
    path: '/orders',
    body: {"ingredients": companents},
    auth: true,
    debug: false
  })
}


export const apiGetOrder = ({orderId}: { orderId: string }): Promise<TResponse<{ orders: Array<TGetOrderResponse> }>> => {
  return request({path: `/orders/${orderId}`, debug: false})
}

export const apiLogin = ({email, passwd}: { email: string, passwd: string }): Promise<TResponse<TLogin>> => {
  return request<TLogin>({
    path: '/auth/login',
    method: 'POST',
    body: {"email": email, "password": passwd}
  })
}

export const apiLogout = (): Promise<any> => {
  return request({
    path: '/auth/logout',
    method: 'POST',
    body: {"token": localStorage.getItem('refreshToken')}
  })
}

export const apiRegister = ({name, email, passwd}: { name: string, email: string, passwd: string }): Promise<TResponse<TLogin>> => {
  return request({
    path: '/auth/register',
    method: 'POST',
    body: {"name": name, "email": email, "password": passwd}
  })
}

export function apiGetUser(): Promise<TResponse<TUser>> {
  return request({
    path: '/auth/user',
    auth: true
  })
}

export const apiUpdateUser = ({name, email, passwd}: { name: string, email: string, passwd: string }): Promise<TResponse<TUser>> => {
  return request({
    path: '/auth/user',
    method: 'PATCH',
    auth: true,
    body: {"user": name, "email": email, "password": passwd}
    // Документации для данной ручки нет.
    // Опытным путем определил, что бекенд не меняет имя пользователя, только email и password доступны для изменения
  })
}

export const apiPasswdReset = ({email}: { email: string }): Promise<TResponse<{ message: string }>> => {
  return request({
    path: '/password-reset',
    method: 'POST',
    body: {email: email}
  })
}

export const apiSetNewPasswd = ({passwd, code}: { passwd: string, code: string }): Promise<TResponse<{ message: string }>> => {
  return request({
    path: '/password-reset/reset',
    method: 'POST',
    body: {password: passwd, token: code}
  })
}
