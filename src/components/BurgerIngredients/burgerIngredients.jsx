
import styles from './burgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientPlate from '../ingredientPlate/ingredientPlate'
import {data} from '../../utils/data'

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('buns')
  const buns = data.filter(e => e.type === 'bun')
  const mains = data.filter(e => e.type === 'main')
  const sauces = data.filter(e => e.type === 'sauce')
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <article className={`custom-scroll ${styles.ingrediensList}`}>
        <h2 className={`text text_type_main-medium`}>Булки</h2>
        <ul className={styles.ingrediensTypeList}>
          {buns.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>)}
        </ul>
        <h2 className={`text text_type_main-medium`}>Соусы</h2>
        <ul className={styles.ingrediensTypeList}>
          {sauces.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>) }
        </ul>
        <h2 className={`text text_type_main-medium`}>Начинки</h2>
        <ul className={styles.ingrediensTypeList}>
          {mains.map((item, index) => <li key={index}><IngredientPlate {...item} /></li>)}
        </ul>
      </article>
    </section>
  )
}
