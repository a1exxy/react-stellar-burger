// конструктор бургера
import React from "react";
import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";

export default function BurgerConstructor(props) {
  const bun = props.burgerContent.filter(e=>e.type === 'bun')
  const burgerMains= props.burgerContent.filter(e=>e.type !== 'bun')
  const burgerPrice = props.burgerContent.reduce((sum,item)=> sum + item.price,0)
  if (bun.length > 1) console.error(`Булок больше одной`)
  return (
    <section className={styles.burgerConstructor}>
      { props.burgerContent.length > 0 && <>
      <div className={`mt-25 ml-4 ${styles.burgerContentList}`}>
        <div className={'ml-8'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun[0].name}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
        <ul className={`custom-scroll ${styles.constructorList}`}>
          { burgerMains.map((item, index) =>
              <li key={index} className={styles.constructorListItem}>
                <DragIcon type="primary"/>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </li>
            )
          }
        </ul>
        <div className={'ml-8'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun[0].name}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
      </div>
      <div className={styles.sumLine}>
        <output className="text text_type_digits-medium mr-2">{burgerPrice}</output>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button  htmlType="button" type="primary" size="medium" onClick={e => props.onOrder(props)}>Оформить заказ</Button>
        </div>
      </div>
    </>}
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  burgerContent: PropTypes.arrayOf(ingredientPropType).isRequired,
  onOrder: PropTypes.func.isRequired
};
