// Ингредиенты
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo, useRef} from "react";
import IngredientPlate from '../ingredientPlate/ingredientPlate'
import { useSelector } from 'react-redux';

export default function BurgerIngredients() {
  const { ingredients } = useSelector(store => ({ ingredients: store.loader.feed }))

  const [currentTab, setCurrentTab] = React.useState('buns')

  const buns = useMemo(() => ingredients.filter(e => e.type === 'bun'), [ingredients])
  const mains = useMemo(() => ingredients.filter(e => e.type === 'main'), [ingredients])
  const sauces = useMemo(() => ingredients.filter(e => e.type === 'sauce'), [ingredients])

  const ingredientsBlocks = {
   buns: useRef(null),
   mains: useRef(null),
   sauces: useRef(null)
  }
  const listRef = useRef(null)

  const onTabClick = function (value) {
    setCurrentTab(value)
    ingredientsBlocks[value].current.scrollIntoView({behavior: "smooth", block: "start"})
  }
  const onScroll = (evt) => {
    const scroll = listRef.current.scrollTop
    const tops = {
      buns: ingredientsBlocks.buns.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top,
      mains: ingredientsBlocks.mains.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top,
      sauces: ingredientsBlocks.sauces.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top
    }
    const setTab = (tab) => {
      if(currentTab !== tab){
        setCurrentTab(tab)
      }
    }
    if (scroll >= 0 && scroll < tops.sauces) {
      setTab('buns')
    } else if (scroll >= tops.sauces && scroll < tops.mains) {
      setTab('sauces')
    } else {
      setTab('mains')
    }
  }
  return (
    <section  className={styles.burgerIngredients}>
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
      <article ref={listRef} className={`custom-scroll ${styles.ingrediensList}`} onScroll={onScroll}>
        <h2 ref={ingredientsBlocks.buns} className={`text text_type_main-medium buns`}>Булки</h2>
        <ul className={styles.ingrediensTypeList}>
          {buns.map((item, index) => <li key={index}><IngredientPlate settings={item} /></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.sauces} className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate settings={item} /></li>) }
        </ul>
        <h2 ref={ingredientsBlocks.mains} className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate settings={item} /></li>)}
        </ul>
      </article>
    </section>
  )
}
