import {BURGER_ADD_ELEM, BURGER_REMOVE_ELEM, BURGER_MOVE_ELEM} from '../actions/burger'
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const initialState = {
  sum: 2847,
  counters: {
    "643d69a5c3f7b9001cfa0941": 1,
    "643d69a5c3f7b9001cfa093e": 1,
    "643d69a5c3f7b9001cfa0942": 2,
  },
  bun:
    {
    "_id": "643d69a5c3f7b9001cfa093c",
    "uuid": "cc085be8-14bf-11ee-ac24-6f21e9e3df38",
    "name": "Краторная булка N-200i",
    "index": 0,
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
  ingredients: [
    {
      "_id": "643d69a5c3f7b9001cfa0941",
      "uuid": "cce45698-14bf-11ee-87ed-4f47755f59b0",
      "name": "Биокотлета из марсианской Магнолии",
      "index": 1,
      "type": "main",
      "proteins": 420,
      "fat": 142,
      "carbohydrates": 242,
      "calories": 4242,
      "price": 424,
      "image": "https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa093e",
      "uuid": "cd96e9ca-14bf-11ee-a10b-07b3c532b0f6",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "index": 2,
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa0942",
      "uuid": "ce0a8772-14bf-11ee-a38b-8f9ea2dd2938",
      "name": "Соус Spicy-X",
      "index": 3,
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa0942",
      "uuid": "ce0a8772-14bf-11ee-a38b-8f9ea2dd2931",
      "name": "Соус Spicy-X",
      "index": 3,
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0
    }
  ]
}

const calcCounters = (arr) => {
  let res = {}
  arr.forEach(i => {
    if (res[i._id]) {
      res[i._id]++
    } else {
      res[i._id] = 1
    }
  })
  return res
}

export const burger = (state = initialState, action) => {
  let res = null
  switch (action.type) {
    case BURGER_ADD_ELEM:
      if(action.content.type === 'bun'){
        res = {...state, sum: state.sum + action.content.price, bun: {...action.content}}
      } else {
        res = {...state, sum: state.sum + action.content.price, ingredients: [...state.ingredients, {...action.content, uuid: uuidv4()}]}
      }
      res = {...res, counters: calcCounters(res.ingredients)}
      return res

    case BURGER_REMOVE_ELEM:
        res = {
        ...state,
        sum: state.sum - state.ingredients.find(i => i.uuid === action.uuid).price,
        ingredients: state.ingredients.filter(item => item.uuid !== action.uuid)
      }
      res = {...res, counters: calcCounters(res.ingredients)}
      return res

    case BURGER_MOVE_ELEM:
      console.log('run BURGER_MOVE_ELEM')
      // console.log(state.ingredients)
      const {from, to} = action
      const arr = [...state.ingredients]
      // console.log(`from:${from}, to:${to}`)
      arr.splice(to,0,arr.splice(from, 1)[0])
      // console.log(arr)
      return {...state, ingredients: arr}

    default:
      return state
  }
}
