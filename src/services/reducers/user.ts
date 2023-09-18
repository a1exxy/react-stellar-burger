import {LOGGED_IN, LOGGED_OUT, USER_UPDATED, USER_CHECKED, USER_SET_RECOVERY_EMAIL} from '../actions/user'

type TUserStore = {
  isAuthChecked: boolean,
  recoveryEmail: string | null,
  user: string | null,
  email: string | null
}
type TSetRecoveryMailAction = {
  type: typeof USER_SET_RECOVERY_EMAIL,
  recoveryEmail: string
}
type TLoggedInAction = {
  type: typeof LOGGED_IN,
  user: string,
  email: string
}
type TUpdatedAction = {
  type: typeof USER_UPDATED,
  user: string,
  email: string
}

type TUserAction =
  | TSetRecoveryMailAction
  | {type: typeof USER_CHECKED}
  | TLoggedInAction
  | {type: typeof LOGGED_OUT}
  | TUpdatedAction

const initialState: TUserStore = {isAuthChecked: false, recoveryEmail: null, user: null, email: null}

export const user = (state = initialState, action: TUserAction) => {
  switch (action.type) {
    case USER_SET_RECOVERY_EMAIL:
      return {...state, recoveryEmail: action.recoveryEmail}
    case USER_CHECKED:
      return {...state, isAuthChecked: true}
    case LOGGED_IN:
      return {...state, isAuthChecked: true, user: action.user, email: action.email}
    case LOGGED_OUT:
      return {...initialState, isAuthChecked: true}
    case USER_UPDATED:
      return {...state, user: action.user, email: action.email}
    default:
      return state
  }
}
