// Ингредиенты
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo, useRef, useContext} from "react";
import IngredientPlate from '../ingredientPlate/ingredientPlate'
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import {burgerContext} from "../../services/burgerContext"


export default function BurgerIngredients(props) {
  const {burgerContent, setBurgerContent} = useContext(burgerContext)
  const [currentTab, setCurrentTab] = React.useState('buns')

  const buns = useMemo(() => props.ingredients.filter(e => e.type === 'bun'))
  const mains = useMemo(() => props.ingredients.filter(e => e.type === 'main'))
  const sauces = useMemo(() => props.ingredients.filter(e => e.type === 'sauce'))

  const ingredientsBlocks = {
   buns: useRef(null),
   mains: useRef(null),
   sauces: useRef(null)
  }

  const onTabClick = function (value) {
    setCurrentTab(value)
    ingredientsBlocks[value].current.scrollIntoView({behavior: "smooth", block: "start"})
  }

  const onPlateClick = function (evt) { // const onPlateClick = props.onDetail // TODO Вернуть при добавлении перетаскивания
    // console.log('Run onPlateClick')
    // console.log(evt)
    if(evt.type !== 'bun' || (evt.type === 'bun' && burgerContent.filter(e => e.type === 'bun').length === 0 )) {
      setBurgerContent([...burgerContent, evt])
    }
  }

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <article className={`custom-scroll ${styles.ingrediensList}`}>
        <h2 ref={ingredientsBlocks.buns} className={`text text_type_main-medium buns`}>Булки</h2>
        <ul className={styles.ingrediensTypeList}>
          {buns.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={onPlateClick} /></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.sauces} className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={onPlateClick} /></li>) }
        </ul>
        <h2 ref={ingredientsBlocks.mains} className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate settings={item} onDetail={onPlateClick} /></li>)}
        </ul>
      </article>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  onDetail: PropTypes.func
};
