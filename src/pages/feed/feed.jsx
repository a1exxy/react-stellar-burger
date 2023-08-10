import styles from './feed.module.css'
import OrderList from '../../components/order-list/order-list'
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from "react";
import {connect as connectFeet, disconnect as disconnectFeet} from "../../services/feed/actions";


const WS_ALL_ORDERS_URL = process.env.REACT_APP_WS_ALL_ORDERS_URL

export default function Feed () {
  const dispatch = useDispatch();
  const {orders} = useSelector(store => store.feed)
  const doneOrders = orders ? orders.orders.filter(e => e.status === 'done') : []
  const workOrders = orders ? orders.orders.filter(e => e.status !== 'done') : []
  const connect = () => dispatch(connectFeet(WS_ALL_ORDERS_URL));
  const disconnect = () => dispatch(disconnectFeet());
  useEffect(()=>{
    connect() // Подклчение обновления всех заказов
    return () => {
      disconnect()
    }
  },[])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.page}>
          <h1 className={`text text_type_main-large`}>Лента заказов</h1>
          <div className={styles.panels}>
            <section className={styles.orderListBlock}>
              {orders && <OrderList orders={orders} /> }
            </section>
            <section className={styles.sumBlock}>
              <div className={styles.orders}>
                  <h2 className="text text_type_main-medium ">Готовы:</h2>
                  <h2 className="text text_type_main-medium ">В работе:</h2>
                  <ul className={styles.orderList}>
                    {doneOrders.slice(0,15).map((item, index) =>
                      <li key={index} className={`${styles.doneOrderNumber} text text_type_digits-default `}>{item.number}</li>
                    )}
                  </ul>
                  <ul className={styles.orderList}>
                    {workOrders.slice(0,15).map((item, index) =>
                      <li key={index} className="text text_type_digits-default">{item.number}</li>
                    )}
                  </ul>
              </div>
              <div>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <output className="text text_type_digits-large">{orders && orders.total}</output>
              </div>
              <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <output className="text text_type_digits-large">{orders && orders.totalToday}</output>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
