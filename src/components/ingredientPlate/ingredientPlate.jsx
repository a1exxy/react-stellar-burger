// Плитка ингедиента
import React, {useMemo} from "react";
import styles from "./ingredientPlate.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from '../../utils/prop-types'
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom'

export default function IngredientPlate({settings}) {
  const location = useLocation()
  const burgerContent = useSelector(store => store.burger)
  const ingredientId = settings._id
  const count = useMemo(() =>
    burgerContent.ingredients.length > 0
        ? burgerContent.ingredients.reduce((sum, current) => current._id === settings._id ? sum + 1 : sum , 0)
        : null,
    [burgerContent.ingredients, ingredientId]
  )
  const [{ plateOpacity }, dragTarget] = useDrag({
    type: 'items',
    item: settings ,
    collect: monitor => ({
      plateOpacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Link
      className={styles.link}
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
    >
      <div ref={dragTarget} className={styles.ingredientPlate} style={{opacity: `${plateOpacity}`}} >
        <img className={'ml-4'} src={settings.image} alt={settings.name}/>
        { count ? <Counter count={count} size="default" extraClass="" />: ''}
        <div className={`mt-1 mb-1 ${styles.ingredientPlatePrice}`}>
          <output className="text text_type_digits-default mr-2">{settings.price}</output>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.ingredientPlateDescription}`}>{settings.name}</p>
      </div>
    </Link>
  )
}

IngredientPlate.propTypes = {
  settings: ingredientPropType.isRequired,
}
