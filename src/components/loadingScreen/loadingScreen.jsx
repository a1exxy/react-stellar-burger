import clock from '../../images/clock.gif'
import React from "react";
import styles from "./loadingScreen.module.css"

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <img className={styles.clock} src={clock} alt='часы'/>
      <p className={`text text_type_main-large`}>Данные загружаются...</p>
    </div>
  )
}
