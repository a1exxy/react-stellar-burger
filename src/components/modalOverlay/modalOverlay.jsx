// import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import styles from "./modalOverlay.module.css"

// const modalRoot = document.getElementById("modal");
export default function ModalOverlay(props) {
  // return ReactDOM.createPortal(
  //   <div className={styles.modalOverlay} style={props.visible ? {visibility: "visible"}: {visibility: "hidden"}}></div>
  //   , modalRoot)
  //style={props.visible ? {visibility: "visible"}: {visibility: "hidden"}

  return (
    <div className={styles.modalOverlay} >
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {

}
