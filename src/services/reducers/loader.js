
import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../actions/loader'

const initialState = { feed:[], isLoading: false, hasError: false }

export const loader = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_STATE:
      return { ...state, isLoading: true, hasError: false}
    case SET_OK_STATE:
      return { feed: action.feed, isLoading: false, hasError: false}
    case SET_FAIL_STATE:
      return { ...state, isLoading: false, hasError: true}
    default:
      return state
  }
}
