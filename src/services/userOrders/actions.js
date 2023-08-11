import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('USER_ORDERS_CONNECT')
export const disconnect = createAction('USER_ORDERS_DISCONNECT');
export const wsConnecting = createAction('USER_ORDERS_WS_CONNECTING');
export const wsOpen = createAction('USER_ORDERS_WS_OPEN');
export const wsClose = createAction('USER_ORDERS_WS_CLOSE');
export const wsMessage = createAction('USER_ORDERS_WS_MESSAGE');
export const wsError = createAction('USER_ORDERS_WS_ERROR');
