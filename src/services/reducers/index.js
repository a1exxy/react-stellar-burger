import { combineReducers } from 'redux';

import {burger} from './burger'
import {loader} from './loader'
import {order} from './order'
import {modal} from './modal'

export const rootReducer = combineReducers({
  burger,
  loader,
  order,
  modal
})
