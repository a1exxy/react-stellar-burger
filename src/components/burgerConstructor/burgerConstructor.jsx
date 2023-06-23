// конструктор бургера
import React, {useContext, useReducer} from "react";
import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import PropTypes from "prop-types";
import {burgerContext, priceContext} from "../../services/burgerContext"

const priceInitialState = 0

export default function BurgerConstructor(props) {
  const {burgerContent, setBurgerContent} = useContext(burgerContext)
  const bun = burgerContent.filter(e => e.type === 'bun')
  const burgerMains= burgerContent.filter(e => e.type !== 'bun')
  const burgerPrice = burgerContent.reduce((sum,item) => sum + item.price, 0)
  const burgerContentList = burgerContent.map(e => e._id)
  if (bun.length > 1) console.error(`Булок больше одной`)

  return (
    <section className={styles.burgerConstructor}>
      <div className={`mt-25 ml-4 ${styles.burgerContentList}`}>
        { bun.length > 0 && <>
          <div className={'ml-8'}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun[0].name}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        </>}
        <ul className={`custom-scroll ${styles.constructorList}`}>
          { burgerMains.map((item, index) =>
              <li key={index} className={styles.constructorListItem}>
                <DragIcon type="primary"/>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </li>
            )
          }
        </ul>
        { bun.length > 0 && <>
          <div className={'ml-8'}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun[0].name}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        </>}
      </div>
      <div className={styles.sumLine}>
        <output className="text text_type_digits-medium mr-2">{burgerPrice}</output>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button"  type="primary" size="medium" onClick={e => props.onOrder(burgerContentList)}>Оформить заказ</Button>
        </div>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  onOrder: PropTypes.func.isRequired
};
