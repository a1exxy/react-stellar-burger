import styles from "./order-list.module.css"
import React from "react";
import OrderListItem from './order-list-item/order-list-item'
import type {TOrders, TOrder} from '../../services/types'


export default function OrderList(props: { orders: TOrders | null }): JSX.Element {
  const {orders} = props
  return (
    <ul className={`custom-scroll ${styles.container} `}>
      {orders?.orders?.map((item: TOrder, index: number) => <li key={index}><OrderListItem orders={item}/>
      </li>)}
    </ul>
  )
}


