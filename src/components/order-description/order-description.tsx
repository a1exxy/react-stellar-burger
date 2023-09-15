// Детали заказа
import {useParams} from 'react-router-dom';
import styles from "./order-description.module.css"
import React, {useEffect, useMemo} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrder} from '../../utils/api-wrappers'
import Thumbnail from '../thumbnail/thumbnail'
import {useSelector, useDispatch} from "../../services/hooks";
import type {IIngredient} from '../../services/types'

type TIngredientCount = {
  element: IIngredient,
  count: number
}

export default function OrderDescription(props: { id?: string }): JSX.Element {
  const storeIngredients = useSelector(store => store.loader.feed)
  const dispatch = useDispatch();
  const {id} = useParams()
  const orderId = id ? id : props.id
  const order = useSelector(store => store.order)
  useEffect(() => {
    dispatch(getOrder({orderId: orderId}))
  }, [orderId])

  const ingredients: { elements: Array<TIngredientCount>, sumPrice: number } = useMemo(() => {
      let ingredientsHash: Record<string, number> = {}
      if (order.content && order.content.length > 0) {
        order.content.forEach((item: string) => {
          if (item in ingredientsHash) {
            ingredientsHash[item] += 1
          } else {
            ingredientsHash[item] = 1
          }
        })
      }
      let res: Array<TIngredientCount> = []
      let sumPrice: number = 0
      for (let key in ingredientsHash) {
        const item = storeIngredients.find((e: IIngredient) => e._id === key)!
        res = [...res, {element: item, count: ingredientsHash[key]}]
        sumPrice += item.price * ingredientsHash[key]
      }
      return {elements: res, sumPrice: sumPrice}
    },
    [order.content]
  )

  return (
    <div className={styles.page}>
      <div className={styles.orderDetails}>
        <h1 className={`text text_type_digits-default ${styles.orderNumber}`}>#{order && order.number}</h1>
        <p className={`text text_type_main-medium mt-10 mb-3 ${styles.itemDescription}`}>{order && order.name}</p>
        {order && order.status === 'done' ?
          <p className={`${styles.doneOrderNumber} text text_type_main-default`}>Выполнен</p> : ''}
        <h2 className={'text text_type_main-medium mt-15 mb-6'}>Состав:</h2>
        <ul className={`custom-scroll ${styles.elementsBlock}`}>
          {ingredients.elements.map((item: TIngredientCount, index: number) => {
              return (<li key={index} className={styles.element}>
                <div className={styles.elementImg}>
                  <Thumbnail image_mobile={item.element.image_mobile} name={item.element.name}/>
                </div>
                <p className={`text text_type_main-small ${styles.elementDescription}`}>{item.element.name}</p>
                <div className={styles.elementPriceBlock}>
                  <output className={`text text_type_digits-default`}>{item.count}</output>
                  <p className='text text_type_digits-default mr-1 ml-1'> x </p>
                  <output className={`text text_type_digits-default mr-2`}>{item.element.price}</output>
                  <CurrencyIcon type="primary"/>
                </div>
              </li>)
            }
          )}
        </ul>
        <div className={styles.endLine}>
          <p className="text text_type_main-default text_color_inactive">
            {order && <FormattedDate date={new Date(order.createdAt!)}/>}
          </p>
          <p className={styles.sumBlock}>
            <output className={`text text_type_digits-default mr-2`}>{order && ingredients.sumPrice}</output>
            <CurrencyIcon type="primary"/>
          </p>
        </div>
      </div>
    </div>
  )
}
