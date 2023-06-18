// Плитка ингедиента
import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredientPlate.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {apiItemType} from '../../utils/api'
export default function IngredientPlate(props) {
  return (
    <div className={styles.ingredientPlate}>
      <img className={'ml-4'} src={props.image} alt={props.name}/>
      {props.counter &&
        <Counter count={props.counter} size="default" extraClass="" />
      }
      <div className={`mt-1 mb-1 ${styles.ingredientPlatePrice}`}>
        <output className="text text_type_digits-default mr-2">{props.price}</output>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.ingredientPlateDescription}`}>{props.name}</p>
    </div>
  )
}

IngredientPlate.propTypes = {
  ...apiItemType,
  counter: PropTypes.number
}
