import {combineReducers} from 'redux';

import {burger} from './burger'
import type {TBurgerActions} from "./burger";
import {loader} from './loader'
import {order} from './order'
import {TOrderActins} from "./order";
import {modal} from './modal'
import {user} from './user'
import {page} from './page'
import {TPagesActions} from "./page";
import {feed} from '../feed/reducer'
import {TFeedActions} from "../feed/actions";
import {userOrders} from '../userOrders/reducer'
import {TUserOrderActions} from "../userOrders/actions";

export type TClassicActions =
  | TBurgerActions
  | TOrderActins
  | TPagesActions

export type TToolsActions =
  | TFeedActions
  | TUserOrderActions

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


