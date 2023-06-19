// Плитка ингедиента
import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredientPlate.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredientAndCounterPropType} from '../../utils/prop-types'
export default function IngredientPlate(props) {
  const count = props.settings.counter && props.settings.counter > 0 ? props.settings.counter : null
  const plate =
    <div className={styles.ingredientPlate} onClick={e => props.onDetail(props.settings)}>
      <img className={'ml-4'} src={props.settings.image} alt={props.settings.name}/>
      { count && <Counter count={count} size="default" extraClass="" /> }
      <div className={`mt-1 mb-1 ${styles.ingredientPlatePrice}`}>
        <output className="text text_type_digits-default mr-2">{props.settings.price}</output>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.ingredientPlateDescription}`}>{props.settings.name}</p>
    </div>
  return (
    plate
  )
}

IngredientPlate.propTypes = {
  settings: ingredientAndCounterPropType,
  onDetail: PropTypes.func
}
