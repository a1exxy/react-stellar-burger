import React, {useState, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from '../appHeader/appHeader'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import ModalOverlay from "../modalOverlay/modalOverlay";

const hardCodeBurgerContentID = [0, 1, 2, 1, 1, 3, 4, 5] // тестовые данные для наполнения бургера
const hardCodeOrderID = '034536' // тестовые данные для окна подтверждения заказа

console.debug('API_INGREDIENTS_URL: ' + process.env.REACT_APP_API_INGREDIENTS_URL) // диагностический вывод источника данных

function App() {
  // Загрузка приложения
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    burgerContent: []
  })
  const [modal, setModal] = useState({
    visible: false,
    body: null
  })
  const closeModal = function () { setModal({visible:false, body: null})  }
  const handleEscBtn = function (e) {
    if (e.code === 'Escape') { closeModal() }
  }
  // Загрузка данных из API
  useEffect(()=>{
    setState({...state, isLoading: true})
    fetch(process.env.REACT_APP_API_INGREDIENTS_URL)
    .then(response => response.json())
    .then(result=>{
      setState({
        ...state ,
        isLoading: false,
        hasError: false,
        ingredients: result.data,
        burgerContent: hardCodeBurgerContentID.map(item => result.data[item])})
    })
    .catch(err => {
      setState({...state, isLoading: false, hasError: true, ingredients: [], burgerContent: []})
      console.error(`Fetch error: ${err}`)
    })
    document.addEventListener('keydown', handleEscBtn)
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
            <BurgerIngredients ingredients={state.ingredients} burgerContent={state.burgerContent} onDetail={onDetail}/>
            <BurgerConstructor ingredients={state.ingredients} burgerContent={state.burgerContent} onOrder={onOrder}/>
          </main>
        </div>
      }
      { modal.visible &&
        <>
          <ModalOverlay onClose={closeModal} />
          <Modal onClose={closeModal}>{modal.body}</Modal>
        </>
      }
    </>
  );
}

export default App;
