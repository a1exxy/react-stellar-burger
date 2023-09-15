import styles from "./order-list.module.css"
import React from "react";
import OrderListItem from './order-list-item/order-list-item'
import type {TAllOrders, TOrder} from '../../services/types'


export default function OrderList(props: { orders: TAllOrders }): JSX.Element {
  const {orders} = props
  return (
    <ul className={`custom-scroll ${styles.container} `}>
      {orders && orders.orders.map((item: TOrder, index: number) => <li key={index}><OrderListItem orders={item}/>
      </li>)}
    </ul>
  )
}


