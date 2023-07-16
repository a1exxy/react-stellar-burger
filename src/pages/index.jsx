import React, { useEffect } from "react";
import styles from "./index.module.css";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';

export function Index() {
  return (
        <div className={styles.app}>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </div>
  )
}


