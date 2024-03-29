import React, {useRef} from "react";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import styles from './burger-constructor-item.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from '../../../services/hooks'
import {BURGER_REMOVE_ELEM, BURGER_MOVE_ELEM} from '../../../services/actions/burger'
import {TBurgerIngredientItem} from '../../../services/types'

type IBurgerConstructorItemProps = {
  element: TBurgerIngredientItem,
  elementIndex: number
}

export const BurgerConstructorItem = ({element, elementIndex}: IBurgerConstructorItemProps): JSX.Element => {
  const ref = useRef<HTMLLIElement>(null)
  const burgerContent = useSelector(store => store.burger)
  const dispatch = useDispatch();
  const burgerItemType = 'burgerItemType'
  const findIndex = (uuid: string) => burgerContent.ingredients.findIndex((i: TBurgerIngredientItem) => i.uuid === uuid)

  const [{isDragging}, drag] = useDrag(
    () => ({
      type: burgerItemType,
      item: {uuid: element.uuid},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          const dragIndex = findIndex(item.uuid)
          const hoverIndex = findIndex(element.uuid)
          dispatch({type: BURGER_MOVE_ELEM, from: hoverIndex, to: dragIndex})
        }
      },
    }),
  )
  const opacity = isDragging ? 0.5 : 1
  const [, drop] = useDrop(
    () => ({
      accept: burgerItemType,
      hover(item: TBurgerIngredientItem, monitor) {
        if (!ref.current) {
          return
        }
        const dragUUID = item.uuid
        const hoverUUID = element.uuid


        const dragIndex = findIndex(item.uuid)
        const hoverIndex = findIndex(element.uuid)
        if (dragUUID === hoverUUID) {
          return
        }

        // Determine rectangle on screen
        const hoverBoundingRect : DOMRect = ref.current.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY: number =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset: XYCoord | null = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY: number | null = clientOffset ? clientOffset.y - hoverBoundingRect.top : null
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        dispatch({type: BURGER_MOVE_ELEM, from: dragIndex, to: hoverIndex})
      },
    }),
  )

  const handleDelete = (item: TBurgerIngredientItem) => {
    dispatch({type: BURGER_REMOVE_ELEM, uuid: item.uuid})
  }
  drag(drop(ref))

  return (
    <>
      <li ref={ref} className={`${styles.constructorListItem}`} style={{opacity}}>
        <div className={styles.dragIcon}><DragIcon type="primary"/></div>
        <ConstructorElement text={element.name} price={element.price} thumbnail={element.image}
                            handleClose={() => handleDelete(element)}/>
      </li>
    </>
  )
}
