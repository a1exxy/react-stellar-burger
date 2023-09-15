// Ингредиенты
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo, useRef} from "react";
import IngredientPlate from '../ingredient-plate/ingredient-plate'
import {useSelector} from '../../services/hooks'
import {v4 as uuidv4} from 'uuid';
import type {IIngredient, IBurgerContentIngredient} from '../../services/types'

export default function BurgerIngredients() {
  const ingredients = useSelector(store => store.loader.feed)

  const [currentTab, setCurrentTab] = React.useState('buns')

  const buns = useMemo(() => ingredients.filter((e: IIngredient) => e.type === 'bun'), [ingredients])
  const mains = useMemo(() => ingredients.filter((e: IIngredient) => e.type === 'main'), [ingredients])
  const sauces = useMemo(() => ingredients.filter((e: IIngredient) => e.type === 'sauce'), [ingredients])

  const ingredientsBlocks = {
    buns: useRef(null),
    mains: useRef(null),
    sauces: useRef(null)
  }
  const listRef = useRef(null)

  const onTabClick = function (value: string) {
    setCurrentTab(value)
    // @ts-ignore
    ingredientsBlocks[value].current.scrollIntoView({behavior: "smooth", block: "start"})
  }
  const onScroll = () => {
    // @ts-ignore
    const scroll = listRef.current.scrollTop
    const tops = {
      // @ts-ignore
      buns: ingredientsBlocks.buns.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top,
      // @ts-ignore
      mains: ingredientsBlocks.mains.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top,
      // @ts-ignore
      sauces: ingredientsBlocks.sauces.current.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top
    }
    const setTab = (tab: string) => {
      if (currentTab !== tab) {
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
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{display: 'flex'}}>
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
          {buns.map((item: IIngredient, index: number) => <li key={index}><IngredientPlate settings={item}/></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.sauces} className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item: IIngredient) => <li key={uuidv4()}><IngredientPlate settings={item}/></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.mains} className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item: IIngredient, index: number) => <li key={index}><IngredientPlate settings={item}/></li>)}
        </ul>
      </article>
    </section>
  )
}
