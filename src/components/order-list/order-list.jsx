import styles from "./order-list.module.css"
import React from "react";
import OrderListItem from './order-list-item/order-list-item'
import PropTypes from "prop-types";

export default function OrderList(props) {
  const {orders} = props.orders
  return (
    <ul className={`custom-scroll ${styles.container} `}>
      {orders && orders.map((item,index) => <li key={index}><OrderListItem orders={item}  /></li>)}
    </ul>
  )
}


OrderList.propTypes = {
  orders: PropTypes.object,
}
