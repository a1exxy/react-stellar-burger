// Детали ингредиента

import styles from "./ingredient-details.module.css";
import {useParams} from 'react-router-dom'
import {useSelector} from "../../services/hooks";
import {useMemo} from "react";
import {IBurgerContentIngredient, IIngredient} from "../../services/types";

type TIngredientDetailsProps = {
  ingredientId?: number
}

export default function IngredientDetails(props: TIngredientDetailsProps): JSX.Element {
  const ingredients = useSelector(store => store.loader.feed)
  const {id} = useParams()
  const ingredientId = id ? id : props.ingredientId
  const item = useMemo(() => {
    const itemList = ingredients.filter((e: IIngredient) => e._id === ingredientId)
    if (itemList.length === 1) {
      return itemList[0]
    } else {
      return null
    }
  }, [id, ingredients])
  return (
    <div className={`mt-10 ml-10 mr-10 mb-15 ${styles.ingredientDetails}`}>
      <p className={`text text_type_main-large ${styles.ingredientDetailsHeader}`}>Детали ингредиента</p>
      <img src={item?.image_large} alt={item?.name}></img>
      <p className={`text text_type_main-medium mt-2`}>{item?.name}</p>
      <div className={`mt-8 ${styles.ingredientDetailsParams}`}>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Калории,ккал
          <output className={'text text_type_digits-default'}>{item?.calories}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Белки, г
          <output className={'text text_type_digits-default'}>{item?.proteins}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Жиры, г
          <output className={'text text_type_digits-default'}>{item?.fat}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Углеводы, г
          <output className={'text text_type_digits-default'}>{item?.carbohydrates}</output>
        </div>
      </div>
    </div>
  )
}
