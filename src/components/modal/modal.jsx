import {useEffect} from "react";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css"
import React from "react";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { MODAL_CLOSE } from '../../services/actions/modal'
import { useNavigate } from 'react-router-dom'

const modalRoot = document.getElementById("modal"); // элемент в котором окрываются модальные окна

export default function Modal(props) {
  const navigate = useNavigate()
  const body = props.children
  console.log(body)
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  const handleEscBtn = function (e) {
    if (e.code === 'Escape') { handleModalClose() }
  }
  useEffect(()=>{
    document.addEventListener('keydown', handleEscBtn)
    return () => {document.removeEventListener('keydown', handleEscBtn)}
  },[])

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <ModalOverlay onClose={handleModalClose} />
      <div className={`${styles.modal}`}>
        <button className={styles.modalCloseButton} onClick={handleModalClose}><CloseIcon type="primary" /></button>
        <article className={styles.modalBody}>
          {body}
        </article>
      </div>
    </div>
  , modalRoot)
}

Modal.propTypes = {
  // modalRoot: PropTypes.object,
}
