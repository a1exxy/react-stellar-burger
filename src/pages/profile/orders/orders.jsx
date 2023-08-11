import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import ProfileNav from '../../../components/profile-nav/profile-nav'
import styles from "./orders.module.css"
import OrderList from '../../../components/order-list/order-list'
import {
  connect as connectUser,
  disconnect as disconnectUser,
} from "../../../services/userOrders/actions";
import {getAccessToken} from "../../../utils/utils";

const WS_USER_ORDERS_URL = process.env.REACT_APP_WS_USER_ORDERS_URL

export default function Orders () {
  const dispatch = useDispatch();
  const {orders} = useSelector(store => store.userOrders)
  const connect = () => dispatch(connectUser(`${WS_USER_ORDERS_URL}?token=${getAccessToken(true)}`))
  const disconnect = () => dispatch(disconnectUser());

  useEffect(()=>{
    connect() // Подклчение обновления всех заказов пользователя
    return () => {
      disconnect()
    }
  },[])
  return (
    <>
      {
        <div className={styles.container}>
            <div className={styles.content}>
              <div>
                <ProfileNav />
              </div>
              <div className={styles.page}>
                <OrderList orders={orders} />
              </div>
          </div>
        </div>
      }
    </>
  )
}
