import React, {useState, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from '../appHeader/appHeader'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../BurgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import ModalOverlay from "../modalOverlay/modalOverlay"

const hardCodeBurgerContentID = [0, 1, 2, 1, 1, 3, 4, 5] // тестовые данные для наполнения бургера

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
    visible: true,
    body: null
  })
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

  },[])

  const closeModal = function () { setModal({visible:false, body: null})  }
  const onDetail = function (item) { setModal({visible:true, body: item}) }
  const onOrder = function (item) { setModal({visible:true, body: item}) }

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
            <Modal onClose={closeModal}>{modal.body}</Modal>
      }
    </>
  );
}

export default App;
