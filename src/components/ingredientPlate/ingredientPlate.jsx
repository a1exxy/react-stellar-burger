// Плитка ингедиента
import React, {useContext} from "react";
import PropTypes from "prop-types";
import styles from "./ingredientPlate.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredientPropType} from '../../utils/prop-types'
import {burgerContext} from "../../services/burgerContext"

export default function IngredientPlate(props) {
  const {burgerContent, setBurgerContent} = useContext(burgerContext)
  const count = burgerContent.reduce((sum, current) => current._id === props.settings._id ? sum + 1 : sum , 0)
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
  settings: ingredientPropType.isRequired,
  onDetail: PropTypes.func.isRequired
}
