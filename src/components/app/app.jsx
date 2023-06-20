import React, {useState, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from '../appHeader/appHeader'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import getApiInfo from "../../utils/api"

const modalRoot = document.getElementById("modal"); // элемент в котором окрываются модальные окна

const hardCodeBurgerContentID = [0, 1, 2, 1, 1, 3, 4, 5] // тестовые данные для наполнения бургера
const hardCodeOrderID = '034536' // тестовые данные для окна подтверждения заказа


const ingredientsURL = process.env.REACT_APP_API_INGREDIENTS_URL
console.debug('API_INGREDIENTS_URL: ' + ingredientsURL) // диагностический вывод источника данных

function App() {
  // Загрузка приложения
  const [state, setState] = useState({ isLoading: false, hasError: false })
  const [ingredients, setIngredients] = useState([])
  const [burgerContent, setBurgerContent] = useState([])
  const [modal, setModal] = useState({ visible: false, body: null })
  const closeModal = function () { setModal({visible:false, body: null}) }
  const setStartState = function () {setState({isLoading: true, hasError: false})}
  const setOkState = function () {setState({isLoading: false, hasError: false})}
  const setFailState = function () {setState({isLoading: false, hasError: true})}

  // Загрузка данных из API
  useEffect(()=>{
    setStartState()
    getApiInfo(ingredientsURL)
      .then(result => {
        setIngredients(result.data)
        setBurgerContent(hardCodeBurgerContentID.map(item => result.data[item]))
        setOkState()
      })
      .catch(err => {
        setFailState()
        console.error(err)
      })
  },[])

  const onDetail = function (props) { setModal({visible:true, body: <IngredientDetails {...props} />}) }
  const onOrder = function (props) { setModal({visible:true, body: <OrderDetails {...props} orderID={hardCodeOrderID} />}) }

  return (
    <>
      { state.isLoading ? <p className={`text text_type_main-large`}>Данные загружаются...</p> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p> :
        <div className={styles.app}>
          <AppHeader/>
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} burgerContent={burgerContent} onDetail={onDetail}/>
            <BurgerConstructor ingredients={ingredients} burgerContent={burgerContent} onOrder={onOrder}/>
          </main>
        </div>
      }
      { modal.visible && <Modal modalRoot={modalRoot} onClose={closeModal}>{modal.body}</Modal> }
    </>
  );
}

export default App;
