// Детали ингредиента

// import PropTypes from "prop-types";
import styles from "./ingredientDetails.module.css";
import {apiItemType} from '../../utils/prop-types'


export default function IngredientDetails(props) {
  return (
    <div className={`mt-10 ml-10 mr-10 mb-15 ${styles.ingredientDetails}`}>
      <p className={`text text_type_main-large ${styles.ingredientDetailsHeader}`}>Детали ингредиента</p>
      <img src={props.image_large} alt={props.name}></img>
      <p className={`text text_type_main-medium mt-2`}>{props.name}</p>
      <div className={`mt-8 ${styles.ingredientDetailsParams}`}>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`} >
          Калории,ккал
          <output className={'text text_type_digits-default'}>{props.calories}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Белки, г
          <output className={'text text_type_digits-default'}>{props.proteins}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Жиры, г
          <output className={'text text_type_digits-default'}>{props.fat}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Углеводы, г
          <output className={'text text_type_digits-default'}>{props.carbohydrates}</output>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ...apiItemType
}.isRequired
