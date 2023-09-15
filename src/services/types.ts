import {rootReducer} from "./reducers";

export type RootState = ReturnType<typeof rootReducer>

export type TIngredientType = 'bun' | 'sauce' | 'main'

export interface IIngredient {
  _id: string,
  name: string,
  type: TIngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}


export interface IBurgerContentIngredient extends IIngredient {
  uuid: string
}

export interface IBurgerConstructorItemElement extends IIngredient {
  uuid: string
}

export type TOrderListItem = {
  name: string,
  number: number,
  createdAt: string,
  ingredients: Array<string>
}

export type TOrder = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TOrders = Array<TOrder>

export type TAllOrders = {
  orders: Array<TOrder>,
  success: boolean,
  total: number,
  totalToday: number
}

import {CONSTRUCTOR, FEED, PROFILE} from './actions/page'

export type TPages = typeof CONSTRUCTOR | typeof FEED | typeof PROFILE
