// Детали ингредиента

import PropTypes from "prop-types";
import styles from "./ingredientDetails.module.css";

export default function IngredientDetails(props) {

  return (
    <>
      <p className={'text text_type_main-large'}>Детали ингредиента</p>
      <img src={props.image_large} alt={props.name}></img>
      <p>Биокотлета из марсианской Магнолии</p>
      <span>Калории,ккал<output>{props.calories}</output></span>
      <span>Белки, г<output>{props.proteins}</output></span>
      <span>Жиры, г<output>{props.fat}</output></span>
      <span>Углеводы, г<output>{props.carbohydrates}</output></span>
    </>
  )
}

IngredientDetails.propTypes = {

}
