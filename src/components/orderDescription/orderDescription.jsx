// Детали заказа
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import styles from "./orderDescription.module.css"

export default function OrderDescription() {
  // const order = useSelector(store => store.order )
  let {id} = useParams()
  console.log(id)
  return (
    <>
      <br/>
      Тут будет информация о заказа (OrderDescription)
      <br/>
      id: {id}
    </>
  )
}
