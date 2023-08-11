import { combineReducers } from 'redux';

import {burger} from './burger'
import {loader} from './loader'
import {order} from './order'
import {modal} from './modal'
import {user} from './user'
import {page} from './page'
import {feed} from '../feed/reducer'
import {userOrders} from '../userOrders/reducer'

export const rootReducer = combineReducers({
  burger,
  loader,
  order,
  modal,
  user,
  page,
  feed,
  userOrders,
})
