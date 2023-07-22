import {CONSTRUCTOR, FEED, PROFILE} from '../actions/page'


const initialState = {page: CONSTRUCTOR}

export const page = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR:
      return {page: CONSTRUCTOR}
    case FEED:
      return {page: FEED}
    case PROFILE:
      return {page: PROFILE}
    default:
      return state
  }
}
