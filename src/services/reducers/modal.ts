import {MODAL_OPEN, MODAL_CLOSE} from '../actions/modal'

type TModalState = {
  visible: boolean,
  body: null | JSX.Element
}

const initialState: TModalState = {visible: false, body: null}

type TModalAction =
  | { type: typeof MODAL_OPEN, body: JSX.Element }
  | { type: typeof MODAL_CLOSE }

export const modal = (state = initialState, action: TModalAction) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {visible: true, body: action.body}
    case MODAL_CLOSE:
      return initialState
    default:
      return state
  }
}
