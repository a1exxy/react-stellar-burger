import { Outlet, useParams } from 'react-router-dom';
import React from "react";
import { useSelector } from 'react-redux';
import ProfileNav from '../../../components/profileNav/profileNav'
import styles from "./orders.module.css"
import OrderList from '../../../components/orderList/orderList'

export default function Orders () {
  const {id} = useParams()
  const {orders} = useSelector(store => store.userOrders)

  return (
    <>
      {id ? <Outlet /> :
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
