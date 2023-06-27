import {BURGER_ADD_ELEM, BURGER_REMOVE_ELEM, BURGER_MOVE_ELEM} from '../actions/burger'
import { v4 as uuidv4 } from 'uuid';
import calcCounters from '../../utils/calcCounters'

const initialState = {
  bun: null,
  ingredients: []
}

export const burger = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_ADD_ELEM:
      if(action.content.type === 'bun'){
        return {...state, bun: {...action.content}}
      } else {
        return {...state, ingredients: [...state.ingredients, {...action.content, uuid: uuidv4()}]}
      }

    case BURGER_REMOVE_ELEM:
        return { ...state, ingredients: state.ingredients.filter(item => item.uuid !== action.uuid) }

    case BURGER_MOVE_ELEM:
      const {from, to} = action
      const arr = [...state.ingredients]
      arr.splice(to,0,arr.splice(from, 1)[0])
      return {...state, ingredients: arr}

    default:
      return state
  }
}
