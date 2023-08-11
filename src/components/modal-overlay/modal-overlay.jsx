import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

export default function ModalOverlay(props) {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}
