import React from "react";
import styles from "./thumbnail.module.css"

export default function Thumbnail(props: { image_mobile: string, name: string }): JSX.Element {
  const {image_mobile, name} = props
  return (
    <div className={styles.container}>
      <img src={image_mobile} alt={name} className={styles.img}/>
    </div>
  )
}
