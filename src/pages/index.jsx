import React, { useEffect } from "react";
import styles from "./index.module.css";
import AppHeader from '../components/appHeader/appHeader'
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";
import Modal from "../components/modal/modal";
import { getIngredients } from "../utils/api"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

const modalRoot = document.getElementById("modal"); // элемент в котором окрываются модальные окна

export function Index() {
  // Загрузка приложения

  const dispatch = useDispatch();
  const state = useSelector(store => store.loader)
  const modal = useSelector(store => store.modal)

  useEffect(()=>{
    dispatch(getIngredients()) // Загрузка данных из API
  },[])

  return (
    <>
      { state.isLoading ? <p className={`text text_type_main-large`}>Данные загружаются...</p> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p> :
        <div className={styles.app}>
          <AppHeader/>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </div>
      }
      { modal.visible && <Modal modalRoot={modalRoot}></Modal> }
    </>
  );
}


