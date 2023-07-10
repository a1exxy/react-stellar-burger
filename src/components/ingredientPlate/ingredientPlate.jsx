// Плитка ингедиента
import React, {useMemo} from "react";
import styles from "./ingredientPlate.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredientPropType} from '../../utils/prop-types'
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import {MODAL_OPEN} from '../../services/actions/modal'
import IngredientDetails from "../ingredientDetails/ingredientDetails"

export default function IngredientPlate({settings}) {
  const dispatch = useDispatch();
  const burgerContent = useSelector(store => store.burger)
  const onDetail = (body) => { dispatch({type: MODAL_OPEN, body: <IngredientDetails {...body} />}) }
  const count = useMemo(() => burgerContent.ingredients.reduce((sum, current) => current._id === settings._id ? sum + 1 : sum , 0), [burgerContent.ingredients])
  const [{ plateOpacity }, dragTarget] = useDrag({
    type: 'items',
    item: settings ,
    collect: monitor => ({
      plateOpacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <div ref={dragTarget} className={styles.ingredientPlate} style={{opacity: `${plateOpacity}`}} onClick={e => onDetail(settings)}>
      <img className={'ml-4'} src={settings.image} alt={settings.name}/>
      { count && <Counter count={count} size="default" extraClass="" /> }
      <div className={`mt-1 mb-1 ${styles.ingredientPlatePrice}`}>
        <output className="text text_type_digits-default mr-2">{settings.price}</output>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.ingredientPlateDescription}`}>{settings.name}</p>
    </div>
  )
}

IngredientPlate.propTypes = {
  settings: ingredientPropType.isRequired,
}
