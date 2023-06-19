// Ингредиенты
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientPlate from '../ingredientPlate/ingredientPlate'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";

export default function BurgerIngredients(props) {
  function calcCounter(arr) {
    return arr.map(item=>{
      return {...item, counter: props.burgerContent.reduce((sum, current) => current._id === item._id ? sum + 1 : sum , 0)}
    })
  }
  const [currentTab, setCurrentTab] = React.useState('buns')
  const buns = calcCounter(props.ingredients.filter(e => e.type === 'bun'))
  const mains = calcCounter(props.ingredients.filter(e => e.type === 'main'))
  const sauces = calcCounter(props.ingredients.filter(e => e.type === 'sauce'))
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
          {buns.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>)}
        </ul>
        <h2 className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>) }
        </ul>
        <h2 className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>)}
        </ul>
      </article>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
  burgerContent: PropTypes.arrayOf(ingredientPropType),
  onDetail: PropTypes.func
};
