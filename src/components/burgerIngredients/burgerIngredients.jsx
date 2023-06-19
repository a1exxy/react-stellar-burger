// Ингредиенты
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo, useRef} from "react";
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

  const buns = useMemo(() => calcCounter(props.ingredients.filter(e => e.type === 'bun')))
  const mains = useMemo(() => calcCounter(props.ingredients.filter(e => e.type === 'main')))
  const sauces = useMemo(() => calcCounter(props.ingredients.filter(e => e.type === 'sauce')))

  const ingredientsBlocks = {
   buns: useRef(null),
   mains: useRef(null),
   sauces: useRef(null)
  }

  const onClick = function (value) {
    setCurrentTab(value)
    ingredientsBlocks[value].current.scrollIntoView({behavior: "smooth", block: "start"})
  }

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={onClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={onClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={onClick}>
          Начинки
        </Tab>
      </div>
      <article className={`custom-scroll ${styles.ingrediensList}`}>
        <h2 ref={ingredientsBlocks.buns} className={`text text_type_main-medium buns`}>Булки</h2>
        <ul className={styles.ingrediensTypeList}>
          {buns.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.sauces} className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>) }
        </ul>
        <h2 ref={ingredientsBlocks.mains} className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={props.onDetail} /></li>)}
        </ul>
      </article>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  burgerContent: PropTypes.arrayOf(ingredientPropType).isRequired,
  onDetail: PropTypes.func
};
