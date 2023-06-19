import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css"

const modalRoot = document.getElementById("modal");

export default function Modal(props) {
  const { children, onClose } = props
  return ReactDOM.createPortal(
    <div className={`${styles.modal}`}>
      <button className={styles.modalCloseButton} onClick={onClose}><CloseIcon type="primary" /></button>
      <article className={styles.modalBody}>
        {children}
      </article>
    </div>
  , modalRoot)
}

Modal.propTypes = {
  onClose: PropTypes.func
}
