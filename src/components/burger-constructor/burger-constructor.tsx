// конструктор бургера
import React, {useMemo} from "react";
import {Button, CurrencyIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useDrop} from "react-dnd";
import {BURGER_ADD_ELEM} from '../../services/actions/burger'
import {createOrder} from "../../utils/api-wrappers"
import {BurgerConstructorItem} from './burger-constructor-item/buger-constructor-item'
import {getAccessToken} from '../../utils/utils'
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "../../services/hooks";
import {TBurgerIngredientItem, TIngredient} from '../../services/types'

type TCollectedProps = {
  isHover: boolean
}

export default function BurgerConstructor(): JSX.Element {
  const burgerContent = useSelector((store) => store.burger)
  const dispatch = useDispatch();
  const bunPrice = useMemo(() => burgerContent.bun ? burgerContent.bun.price : 0, [burgerContent.bun])
  const burgerPrice = useMemo(
    () => burgerContent.ingredients.reduce((sum: number, item: TBurgerIngredientItem) => sum + item.price, 0) +
      bunPrice, [burgerContent.ingredients, bunPrice]
  )
  const navigate = useNavigate();
  const [{isHover}, dropTarget] = useDrop<TIngredient, unknown, TCollectedProps>({
    accept: "items",
    drop(item: TIngredient) {
      dispatch({type: BURGER_ADD_ELEM, content: item})
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  });

  const onOrder = () => {
    let ids = burgerContent.ingredients.map((e: TBurgerIngredientItem) => e._id)
    if (burgerContent.bun) {
      ids = [...ids, burgerContent.bun._id, burgerContent.bun._id]
    }
    if (getAccessToken()) {
      dispatch(createOrder({companents: ids}))
      navigate('/ordercreated', {state: {background: '/'}})
    } else {
      navigate('/login', {state: {background: '/'}})
    }
  }

  return (
    <section className={styles.burgerConstructor}>
      <div ref={dropTarget}
           className={`mt-25 ml-4 ${styles.burgerContentList} ${isHover && styles.burgerContentListIllumination}`}>
        <div className={'ml-8'}>
          {burgerContent.bun &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${burgerContent.bun.name} (верх)`}
              price={burgerContent.bun.price}
              thumbnail={burgerContent.bun.image}
            />
          }
        </div>
        <ul className={`custom-scroll ${styles.constructorList}`}>
          {burgerContent.ingredients.map((item: TBurgerIngredientItem, index: number) =>
            <BurgerConstructorItem key={item.uuid} element={item} elementIndex={index}/>
          )}
        </ul>
        <div className={'ml-8'}>
          {burgerContent.bun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${burgerContent.bun.name} (низ)`}
              price={burgerContent.bun.price}
              thumbnail={burgerContent.bun.image}
            />
          }
        </div>
      </div>
      <div className={styles.sumLine}>
        <output className="text text_type_digits-medium mr-2">{burgerPrice}</output>
        <CurrencyIcon type="primary"/>
        <div className='ml-10'>
          <Button htmlType="button" type="primary" size="medium" onClick={onOrder}>Оформить заказ</Button>
        </div>
      </div>
    </section>
  )
}
