import styles from "./orderList.module.css"
import React from "react";
import OrderListItem from './orderListItem/orderListItem'

export default function OrderList(props) {
  const {orders} = props.orders
  return (
    <ul className={`custom-scroll ${styles.container} `}>
      {orders && orders.map((item,index) => <li key={index}><OrderListItem orders={item}/></li>)}
    </ul>
  )
}
