import { combineReducers } from 'redux';

import {burger} from './burger'
import {loader} from './loader'
import {order} from './order'
import {modal} from './modal'
import {user} from './user'
import {page} from './page'

export const rootReducer = combineReducers({
  burger,
  loader,
  order,
  modal,
  user,
  page
})
