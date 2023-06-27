// Детали заказа
import { useSelector } from 'react-redux';
import styles from "./orderDetails.module.css"
import checkImg from "../../images/check.svg"

export default function OrderDetails() {
  const { order } = useSelector(store => ({ order: store.order }))
  return (
    <div className={`mt-30 mb-30 ${styles.orderDetails}`}>
      <p className={'text text_type_digits-large'}>{order.number}</p>
      <p className={'text text_type_main-medium mt-8 mb-15'}>идентификатор заказа</p>
      <img src={checkImg} alt={'изображение галки'}></img>
      <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
