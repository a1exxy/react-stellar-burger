import {createReducer} from '@reduxjs/toolkit';
import {WebsocketStatus} from '../../utils/ws';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';
import type {TOrders} from '../types'

type IFeedState = {
  status: string,
  orders: TOrders | null,
  connectingError: string
}

const initialState: IFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: null,
  connectingError: ''
}

export const feed = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload
    })
})
