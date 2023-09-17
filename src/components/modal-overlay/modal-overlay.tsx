import styles from "./modal-overlay.module.css"

type TModalOverlayPropsType = {
  onClose(): void
}

export default function ModalOverlay(props: TModalOverlayPropsType): JSX.Element {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose}></div>
  )
}
