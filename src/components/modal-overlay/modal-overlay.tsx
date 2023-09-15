import styles from "./modal-overlay.module.css"

interface IModalOverlayPropsType {
  onClose(): void
}

export default function ModalOverlay(props: IModalOverlayPropsType): JSX.Element {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose}></div>
  )
}
