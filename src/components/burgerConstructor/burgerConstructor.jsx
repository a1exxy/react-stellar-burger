// конструктор бургера
import React from "react";
import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import {apiItemType} from '../../utils/api'
import PropTypes from "prop-types";
export default function BurgerConstructor(props) {
  const bun = props.burgerContent.filter(e=>e.type === 'bun')
  const burgerMains= props.burgerContent.filter(e=>e.type !== 'bun')
  if (bun.length > 1) console.error(`Булок больше одной`)
  return (
    <section className={styles.burgerConstructor}>
      { props.burgerContent.length > 0 && <>
      <div className='mt-25 ml-4' style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
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
      <div className={styles.sumLine} style={{textAlign: "right"}}>
        <output className="text text_type_digits-medium mr-2">610</output>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button  htmlType="button" type="primary" size="medium">Оформить заказ</Button>
        </div>
      </div>
    </>}
    </section>
  )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(apiItemType)),
    burgerContent: PropTypes.arrayOf(PropTypes.shape(apiItemType))
};
