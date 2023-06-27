// конструктор бургера
import React, {useMemo} from "react";
import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import {BURGER_ADD_ELEM, BURGER_REMOVE_ELEM} from '../../services/actions/burger'
import {createOrder} from "../../utils/api"
import {MODAL_OPEN} from '../../services/actions/modal'
import OrderDetails from "../orderDetails/orderDetails";
import BurgerConstructorItem from './burgerConstructorItem/bugerConstructorItem'

export default function BurgerConstructor() {
  const { burgerContent } = useSelector(store => ({ burgerContent: store.burger }))
  const dispatch = useDispatch();

  const [{isHover}, dropTarget] = useDrop({
      accept: "items",
      drop(item) {
        console.log('run useDrop1')
        console.log(item)
        dispatch({type: BURGER_ADD_ELEM, content: item})
      },
      collect: monitor => ({
          isHover: monitor.isOver(),
      })
  });

  const onOrder = () => {
    dispatch(createOrder(burgerContent.map(e => e._id)))
    dispatch({type: MODAL_OPEN, body: <OrderDetails/>})
  }

  return (
    <section className={styles.burgerConstructor}>
      <div ref={dropTarget}  className={`mt-25 ml-4 ${styles.burgerContentList} ${isHover && styles.burgerContentListIllumination}`}>
          <div className={'ml-8'}>
            { burgerContent.bun &&
              <ConstructorElement
                type="top"
                isLocked={true}
                text={burgerContent.bun.name}
                price={burgerContent.bun.price}
                thumbnail={burgerContent.bun.image}
              />
            }
          </div>
          <ul className={`custom-scroll ${styles.constructorList}`}>
             { burgerContent.ingredients.map((item, index) =>
               <BurgerConstructorItem key={item.uuid} element={item} elementIndex={index} />
             )}
          </ul>
          <div className={'ml-8'}>
            { burgerContent.bun &&
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={burgerContent.bun.name}
                price={burgerContent.bun.price}
                thumbnail={burgerContent.bun.image}
              />
            }
          </div>
      </div>
      <div className={styles.sumLine}>
        <output className="text text_type_digits-medium mr-2">{burgerContent.sum}</output>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button"  type="primary" size="medium" onClick={onOrder}>Оформить заказ</Button>
        </div>
      </div>
    </section>
  )
}
