import {CONSTRUCTOR, FEED, PROFILE} from '../actions/page'

import {TPages} from "../types";

export type TPagesActions = {type: TPages}

const initialState : {page: TPages} = {page: CONSTRUCTOR}

export const page = (state = initialState, action: TPagesActions) => {
  switch (action.type) {
    case CONSTRUCTOR:
      return {...state, page: CONSTRUCTOR}
    case FEED:
      return {...state, page: FEED}
    case PROFILE:
      return {...state, page: PROFILE}
    default:
      return state
  }
}
