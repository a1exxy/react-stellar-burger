import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {socketMiddleware} from './middleware/socket-middleware'

import {
  connect as FeedWsConnect,
  disconnect as FeedWsDisconnect,
  wsOpen as FeedWsOpen,
  wsClose as FeedWsClose,
  wsMessage as FeedWsMessage,
  wsError as FeedWsError,
  wsConnecting as FeedWsConnecting
} from "./feed/actions";

import {
  connect as UserOrdersWsConnect,
  disconnect as UserOrdersWsDisconnect,
  wsOpen as UserOrdersWsOpen,
  wsClose as UserOrdersWsClose,
  wsMessage as UserOrdersWsMessage,
  wsError as UserOrdersWsError,
  wsConnecting as UserOrdersWsConnecting
} from "./userOrders/actions";

const FeedMiddleware = socketMiddleware({
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
})

const UserOrdersMiddleware = socketMiddleware({
  wsConnect: UserOrdersWsConnect,
  wsDisconnect: UserOrdersWsDisconnect,
  wsConnecting: UserOrdersWsConnecting,
  onOpen: UserOrdersWsOpen,
  onClose: UserOrdersWsClose,
  onError: UserOrdersWsError,
  onMessage: UserOrdersWsMessage,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(thunk, FeedMiddleware, UserOrdersMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})
