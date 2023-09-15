import {createReducer} from '@reduxjs/toolkit';
import {WebsocketStatus, WebsocketStatusType} from '../../utils/ws';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';


type TUserOrdersInetType = {
  status: string,
  orders: any, // TODO заменить any
  connectingError: string
}

const initialState:TUserOrdersInetType = {
  status: WebsocketStatus.OFFLINE,
  orders: {},
  connectingError: ''
}

export const userOrders = createReducer(initialState, (builder) => {
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
