

export type TIngredientType = 'bun' | 'sauce' | 'main'

export type TIngredient = {
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

export type TBurgerIngredientItem =  TIngredient & { uuid: string }

export type TOrder = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TOrders = {
  orders: Array<TOrder>,
  success: boolean,
  total: number,
  totalToday: number
}

import {CONSTRUCTOR, FEED, PROFILE} from './actions/page'

export type TPages = typeof CONSTRUCTOR | typeof FEED | typeof PROFILE
