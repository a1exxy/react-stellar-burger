import styles from "./order-list-item.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {MODAL_OPEN} from "../../../services/actions/modal";
import OrderDescription from '../../order-description/order-description'

const maxIngredients = process.env.REACT_APP_MAX_VIEW_INGRIDIENTS // Максимальное количество отображаемых картинок на одном заказе

export default function OrderListItem(props) {
  const {name, number, createdAt, ingredients} = props.orders
  const {feed} = useSelector(store => store.loader )
  const location = useLocation()
  const navigate = useNavigate()
  const getSumPrice = () => {
    return ingredients.reduce((sum, current) => {
      if (feed.length > 0) {
        const {price} = feed.find(e => e._id === current)
        if(price) {
          return sum + price
        } else {
          return sum
        }
      } else {
        return 0
      }
    }, 0)
  }

  const onClick = () => {
    navigate( `${location.pathname}/${number}`, {state: {background: location.pathname }} )
  }

  return (
      <button className={styles.container} onClick={onClick}>
        <div className={styles.itemHeader}>
          <p className={`text text_type_digits-default`}>#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)}/>
          </p>
        </div>
        <p className={`text text_type_main-medium ${styles.itemDescription}`}>{name}</p>
        <div className={styles.endLine}>
          <ul className={styles.imgList}>
            {ingredients.slice(0,6).reverse().map((item, index) => {
              const {image_mobile, name} = feed ? feed.find(e => e._id === item) : {image_mobile:'', name: ''}
              return (
                <li key={index}>
                  <img src={image_mobile} alt={name} />
                  {ingredients.length > maxIngredients && index === 0 &&
                    <div className={styles.moreIngredients}>
                      <span className={`text text_type_digits-default`}>+{ingredients.length - 5}</span>
                    </div>
                  }
                </li>
              )}
            )}
          </ul>
          <p className={styles.itemPrice}>
            <output className={`text text_type_digits-default mr-2`}>{getSumPrice()}</output>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </button>
  )
}
