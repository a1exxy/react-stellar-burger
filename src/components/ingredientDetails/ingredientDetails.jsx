// Детали ингредиента

// import PropTypes from "prop-types";
import styles from "./ingredientDetails.module.css";
import {apiItemType} from '../../utils/prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useMemo, useEffect, useState} from "react";

export default function IngredientDetails() {
  const ingredients = useSelector(store => store.loader.feed )
  const {id} = useParams()
  const item = useMemo(() => {
    const itemList = ingredients.filter(e => e._id === id)
    if(itemList.length === 1) {
      return itemList[0]
    } else {
      return null
    }
  }, [id, ingredients])
  return (
    <div className={`mt-10 ml-10 mr-10 mb-15 ${styles.ingredientDetails}`}>
      <p className={`text text_type_main-large ${styles.ingredientDetailsHeader}`}>Детали ингредиента</p>
      <img src={item && item.image_large} alt={item && item.name}></img>
      <p className={`text text_type_main-medium mt-2`}>{item && item.name}</p>
      <div className={`mt-8 ${styles.ingredientDetailsParams}`}>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`} >
          Калории,ккал
          <output className={'text text_type_digits-default'}>{item && item.calories}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Белки, г
          <output className={'text text_type_digits-default'}>{item && item.proteins}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Жиры, г
          <output className={'text text_type_digits-default'}>{item && item.fat}</output>
        </div>
        <div className={`${styles.ingredientDetailsParamsCell} text text_type_main-default text_color_inactive`}>
          Углеводы, г
          <output className={'text text_type_digits-default'}>{item && item.carbohydrates}</output>
        </div>
      </div>
    </div>
  )
}
