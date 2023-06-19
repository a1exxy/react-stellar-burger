import {useEffect} from "react";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css"
import React from "react";
import ModalOverlay from "../modalOverlay/modalOverlay";

export default function Modal(props) {
  const { children, onClose } = props
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
  , props.modalRoot)
}

Modal.propTypes = {
  modalRoot: PropTypes.object,
  onClose: PropTypes.func
}
