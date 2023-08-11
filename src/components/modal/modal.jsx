import {useEffect} from "react";
import ReactDOM from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css"
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useLocation, useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal"); // элемент в котором окрываются модальные окна

export default function Modal(props) {
  const {children} = props
  const location = useLocation()
  const navigate = useNavigate()
  function onClose () {
    if (location.state && location.state.background) {
      navigate(location.state.background)
    }
  }

  const handleEscBtn = function (e) {
    if (e.code === 'Escape') { onClose() }
  }
  useEffect(()=>{
    document.addEventListener('keydown', handleEscBtn)
    return () => {document.removeEventListener('keydown', handleEscBtn)}
  },[])

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal}`}>
        <button className={styles.modalCloseButton} onClick={onClose}><CloseIcon type="primary" /></button>
        <article className={styles.modalBody}>
          {children}
        </article>
      </div>
    </div>
  , modalRoot)
}
