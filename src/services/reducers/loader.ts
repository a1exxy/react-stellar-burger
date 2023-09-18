import {SET_START_STATE, SET_OK_STATE, SET_FAIL_STATE} from '../actions/loader'
import {TIngredient} from "../types";

type TLoaderState = {
  feed: Array<TIngredient>,
  isLoading: boolean,
  hasError: boolean
}

const initialState: TLoaderState = {feed: [], isLoading: false, hasError: false}

type TLoaderAction =
  | {type: typeof SET_START_STATE}
  | {type: typeof SET_OK_STATE, feed: Array<TIngredient>}
  | {type: typeof SET_FAIL_STATE}

export const loader = (state = initialState, action: TLoaderAction) => {
  switch (action.type) {
    case SET_START_STATE:
      return {...state, isLoading: true, hasError: false}
    case SET_OK_STATE:
      return {feed: action.feed, isLoading: false, hasError: false}
    case SET_FAIL_STATE:
      return {...state, isLoading: false, hasError: true}
    default:
      return state
  }
}
