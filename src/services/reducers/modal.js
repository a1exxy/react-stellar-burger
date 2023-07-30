import {MODAL_OPEN, MODAL_CLOSE} from '../actions/modal'

const initialState = {visible:false, body: null}

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {visible: true, body: action.body}
    case MODAL_CLOSE:
      return initialState
    default:
      return state
  }
}
