// Ингредиенты
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo, useRef} from "react";
import IngredientPlate from '../ingredient-plate/ingredient-plate'
import {useSelector} from '../../services/hooks'
import {v4 as uuidv4} from 'uuid';
import type {TIngredient} from '../../services/types'

type TIngredients = 'buns' | 'mains' | 'sauces'

export default function BurgerIngredients() {
  const ingredients = useSelector(store => store.loader.feed)

  const [currentTab, setCurrentTab] = React.useState('buns')

  const buns = useMemo(() => ingredients.filter((e: TIngredient) => e.type === 'bun'), [ingredients])
  const mains = useMemo(() => ingredients.filter((e: TIngredient) => e.type === 'main'), [ingredients])
  const sauces = useMemo(() => ingredients.filter((e: TIngredient) => e.type === 'sauce'), [ingredients])

  type TIngredientBlocks = Record<string, React.RefObject<HTMLHeadingElement>>

  const ingredientsBlocks: TIngredientBlocks = {
    buns: useRef(null),
    mains: useRef(null),
    sauces: useRef(null)
  }
  const listRef = useRef<HTMLElement>(null)

  const onTabClick = (value: string) => {
    setCurrentTab(value)
    ingredientsBlocks[value].current!.scrollIntoView({behavior: "smooth", block: "start"})
  }
  const onScroll = () => {
    const scroll = listRef.current!.scrollTop
    const tops = {
      buns: ingredientsBlocks.buns.current!.getBoundingClientRect().top - listRef.current!.getBoundingClientRect().top,
      mains: ingredientsBlocks.mains.current!.getBoundingClientRect().top - listRef.current!.getBoundingClientRect().top,
      sauces: ingredientsBlocks.sauces.current!.getBoundingClientRect().top - listRef.current!.getBoundingClientRect().top
    }
    const setTab = (tab: TIngredients) => {
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
          {buns.map((item: TIngredient, index: number) => <li key={index}><IngredientPlate settings={item}/></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.sauces} className={`text text_type_main-medium sauces`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item: TIngredient) => <li key={uuidv4()}><IngredientPlate settings={item}/></li>)}
        </ul>
        <h2 ref={ingredientsBlocks.mains} className={`text text_type_main-medium mains`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item: TIngredient, index: number) => <li key={index}><IngredientPlate settings={item}/></li>)}
        </ul>
      </article>
    </section>
  )
}
