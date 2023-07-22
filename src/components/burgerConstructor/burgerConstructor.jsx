// конструктор бургера
import React, {useMemo} from "react";
import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import {BURGER_ADD_ELEM, BURGER_REMOVE_ELEM} from '../../services/actions/burger'
import {createOrder} from "../../utils/api"
import {MODAL_OPEN} from '../../services/actions/modal'
import OrderCreated from "../orderCreated/orderCreated";
import BurgerConstructorItem from './burgerConstructorItem/bugerConstructorItem'
import {SET_ORDER} from '../../services/actions/order'
import { Navigate, useNavigate } from 'react-router-dom'

export default function BurgerConstructor() {
  const burgerContent = useSelector(store => store.burger)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const bunPrice = useMemo(()=> burgerContent.bun ? burgerContent.bun.price : 0, [burgerContent.bun])
  const burgerPrice = useMemo(()=>burgerContent.ingredients.reduce((sum,item) => sum + item.price, 0) + bunPrice, [burgerContent.ingredients, bunPrice])

  const [{isHover}, dropTarget] = useDrop({
      accept: "items",
      drop(item) {
        dispatch({type: BURGER_ADD_ELEM, content: item})
      },
      collect: monitor => ({
          isHover: monitor.isOver(),
      })
  });
  const createOrderSuccess = ({orderNum, content}) => {
    dispatch({type: SET_ORDER, number: orderNum, content: content})
  }
  const onOrder = () => {
    let ids = burgerContent.ingredients.map(e => e._id)
    if(burgerContent.bun) { ids = [...ids, burgerContent.bun._id] }
    dispatch(createOrder({ companents: ids, onSuccess: createOrderSuccess }))
    navigate('profile/orders/created')
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
        <output className="text text_type_digits-medium mr-2">{burgerPrice}</output>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button"  type="primary" size="medium" onClick={onOrder}>Оформить заказ</Button>
        </div>
      </div>
    </section>
  )
}
