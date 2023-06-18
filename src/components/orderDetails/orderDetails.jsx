// Детали заказа
import PropTypes from "prop-types";
import styles from "./orderDetails.module.css"
import checkImg from "../../images/check.svg"
export default function OrderDetails(props) {
  return (
    <>
      <p>034536</p>
      <p>идентификатор заказа</p>
      <img src={checkImg}></img>
      <p>Ваш заказ начали готовить</p>
      <p>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}
OrderDetails.propTypes = {

}
