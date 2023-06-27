import React, {useRef, useCallback}  from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from './burgerConstructorItem.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import {BURGER_ADD_ELEM, BURGER_REMOVE_ELEM, BURGER_MOVE_ELEM} from '../../../services/actions/burger'
import {burgerConstructorItemElementPropType} from '../../../utils/prop-types'
import PropTypes from "prop-types";
export default function BurgerConstructorItem ({element, elementIndex}) {
    const ref = useRef(null)
    const burgerContent = useSelector(store => store.burger)
    const dispatch = useDispatch();
    const burgerItemType = 'burgerItemType'

    const findIndex = uuid =>  burgerContent.ingredients.findIndex(i => i.uuid === uuid)

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: burgerItemType,
        item: { uuid: element.uuid },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
          const { id: droppedId, originalIndex } = item
          const didDrop = monitor.didDrop()
          if (!didDrop) {
            const dragIndex = findIndex(item.uuid)
            const hoverIndex = findIndex(element.uuid)
            dispatch({type: BURGER_MOVE_ELEM, from:hoverIndex, to:dragIndex})
          }
        },
      }),
    )
    const opacity = isDragging ? 0.5 : 1
    const [, drop] = useDrop(
    () => ({
      accept: burgerItemType,
      hover(item, monitor) {
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
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
          dispatch({type: BURGER_MOVE_ELEM, from:dragIndex, to:hoverIndex})
      },
    }),
  )

  const handleDelete= (evt, item) => {
    dispatch({type: BURGER_REMOVE_ELEM, uuid: item.uuid})
  }
  drag(drop(ref))

  return (
    <>
      <li  ref={ref} className={`${styles.constructorListItem}`} style={{opacity}}>
        <div className={styles.dragIcon}><DragIcon type="primary" /></div>
        <ConstructorElement text={element.name} price={element.price} thumbnail={element.image} handleClose={e => handleDelete(e, element)} />
      </li>
    </>
  )
}

BurgerConstructorItem.propTypes = {
  element: burgerConstructorItemElementPropType,
  elementIndex: PropTypes.number
}
