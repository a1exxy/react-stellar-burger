import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css"
import ModalOverlay from "../modalOverlay/modalOverlay";

import React from "react";

const modalRoot = document.getElementById("modal");
export default function Modal(props) {
  const { children, onClose } = props;
  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${styles.modal} show`}>
        <button className={styles.modalCloseButton} onClick={onClose}><CloseIcon type="primary" /></button>
        <article className={styles.modalBody}>
          {children}
        </article>
      </div>
    </ModalOverlay>
  , modalRoot)
}

Modal.propTypes = {

}
