import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
// import { AppDispatch, AppThunk, RootState } from './types';
import type {} from "redux-thunk/extend-redux";
import {RootState} from './types';
import type {TClassicActions, TToolsActions} from './reducers'
import type {ThunkAction} from "redux-thunk";

type AppActions =
  | TClassicActions
  | TToolsActions

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;



// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useDispatch = () => dispatchHook<AppDispatch>()


