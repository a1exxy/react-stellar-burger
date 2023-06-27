// Взаимодействие с API
import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../services/actions/loader'
import React from "react";
import {SET_ORDER, CLEAR_ORDER} from '../services/actions/order'


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

export function createOrder (companents) {
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
          dispatch({type: SET_ORDER, number: response.order.number, content: companents})
      } else {
          Promise.reject(`Сервер не смог сформировать заказ (${response.message})`)
      }
    })
    .catch(err => {
      console.error(`Ошибка сетевого взаимодействия: ${err.message}`);
    })
  }
}
