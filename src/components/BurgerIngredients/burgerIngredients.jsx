// Ингредиенты
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientPlate from '../ingredientPlate/ingredientPlate'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {apiItemType} from "../../utils/api";

export default function BurgerIngredients(props) {
  const [currentTab, setCurrentTab] = React.useState('buns')
  const buns = props.ingredients.filter(e => e.type === 'bun')
  const mains = props.ingredients.filter(e => e.type === 'main')
  const sauces = props.ingredients.filter(e => e.type === 'sauce')
  React.useEffect(()=>{
    document.querySelector(`.${currentTab}`).scrollIntoView({behavior: "smooth", block: "start"})
  },[currentTab])
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <article className={`custom-scroll ${styles.ingrediensList}`}>
        <h2 className={`text text_type_main-medium buns`}>Булки</h2>
        <ul className={styles.ingrediensTypeList}>
          {buns.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>)}
        </ul>
        <h2 className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>) }
        </ul>
        <h2 className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>)}
        </ul>
      </article>
    </section>
  )
}

BurgerConstructor.propTypes = {
    ingredients: apiItemType,
    burgerContent: apiItemType
};
