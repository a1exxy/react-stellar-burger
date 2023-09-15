import {SET_ORDER, CLEAR_ORDER} from '../actions/order'

type TOrderStore = {
  number: null | number,
  content: null | Array<any>, // TODO убрать ANY
  name: null | string,
  status: null | string,
  createdAt: null | string
}

type TSetOrderAction = {
  type : typeof SET_ORDER
  number: number,
  content: Array<any>, // TODO убрать ANY
  name: string,
  status: string,
  createdAt: string
}

type TClearOrderAction = {
  type: typeof CLEAR_ORDER
}

export type TOrderActins =
  | TSetOrderAction
  | TClearOrderAction

const initialState: TOrderStore = {number: null, content: null, name: null, status: null, createdAt: null}

export const order = (state = initialState, action: TOrderActins) => {
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
