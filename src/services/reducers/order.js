import {SET_ORDER, CLEAR_ORDER} from '../actions/order'

const initialState = { number: null, content: null, name: null, status: null}

export const order = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        number: action.number,
        content: action.content,
        name: action.name,
        status: action.status,
        createdAt: action.createdAt
      }
    case CLEAR_ORDER:
      return initialState
    default:
      return state
  }
}
