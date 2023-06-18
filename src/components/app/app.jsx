import React, {useState, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from '../appHeader/appHeader'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../BurgerIngredients/burgerIngredients";


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

  return (
    <>
      { state.isLoading ? <p className={`text text_type_main-large`}>Данные загружаются...</p> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p> :
        <div className={styles.app}>
          <AppHeader/>
          <main className={styles.main}>
            <BurgerIngredients state={state} />
            <BurgerConstructor state={state} />
          </main>
        </div>
      }
    </>
  );
}

export default App;
