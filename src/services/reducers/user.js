import {LOGGED_IN, LOGGED_OUT, USER_UPDATED, USER_CHECKED, USER_SET_RECOVERY_EMAIL} from '../actions/user'

const initialState = {isAuthChecked: false, recoveryEmail: null, user: null, email: null }

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_RECOVERY_EMAIL:
      return {...state, recoveryEmail: {...action}.recoveryEmail}
    case USER_CHECKED:
      return {...state, isAuthChecked: true}
    case LOGGED_IN:
      return {...state, isAuthChecked: true, user: {...action}.user, email: {...action}.email}
    case LOGGED_OUT:
      return {...initialState, isAuthChecked: true}
    case USER_UPDATED:
      return {...state, user: {...action}.user, email: {...action}.email}
    default:
      return state
  }
}
