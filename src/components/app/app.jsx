import React, {useState, useEffect, createContext} from "react";
import styles from "./app.module.css";
import AppHeader from '../appHeader/appHeader'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import {getIngredients, createOrder} from "../../utils/api"
import {burgerContext} from "../../services/burgerContext"
import {ingredientContext} from "../../services/ingredientContext"

const modalRoot = document.getElementById("modal"); // элемент в котором окрываются модальные окна

function App() {
  // Загрузка приложения
  const [state, setState] = useState({ isLoading: false, hasError: false })
  const [ingredients, setIngredients] = useState([])
  const [burgerContent, setBurgerContent] = useState([])

  const [order, setOrder] = useState(null)

  const [modal, setModal] = useState({ visible: false, body: null })
  const closeModal = function () { setModal({visible:false, body: null}) }
  const setStartState = function () {setState({isLoading: true, hasError: false})}
  const setOkState = function () {setState({isLoading: false, hasError: false})}
  const setFailState = function () {setState({isLoading: false, hasError: true})}

  // Загрузка данных из API
  useEffect(()=>{
    setStartState()
    getIngredients()
      .then(result => {
        setIngredients(result.data)
        setOkState()
      })
      .catch(err => {
        setFailState()
        console.error(err)
      })
  },[])

  const onDetail = function (props) { setModal({visible:true, body: <IngredientDetails {...props} />}) }

  const onOrder = function (components) {
    // функция сохранения заказа
    createOrder(components)
      .then(result => {
        if(result.success === true){
          console.info(`Заказ создан`)
          setOrder(result.order.number)
          setModal({visible:true, body: <OrderDetails orderID={result.order.number} />})
        }
        else {
          console.error(`Сервер не смог сформировать заказ (${result.message})`)
        }
      })
      .catch(err => {
        console.error(`Ошибка сохранения заказа (${err})`)
      })
  }

  return (
    <>
      { state.isLoading ? <p className={`text text_type_main-large`}>Данные загружаются...</p> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p> :
        <div className={styles.app}>
          <AppHeader/>
          <main className={styles.main}>
            <burgerContext.Provider value={{burgerContent, setBurgerContent}}>
              <ingredientContext.Provider value={{ingredients, setIngredients}}>
                <BurgerIngredients onDetail={onDetail}/>
                <BurgerConstructor onOrder={onOrder}/>
              </ingredientContext.Provider>
            </burgerContext.Provider>
          </main>
        </div>
      }
      { modal.visible && <Modal modalRoot={modalRoot} onClose={closeModal}>{modal.body}</Modal> }
    </>
  );
}

export default App;
