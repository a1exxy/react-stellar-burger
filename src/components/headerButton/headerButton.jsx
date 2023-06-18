import { BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './headerButton.module.css'
export default function HeaderButton(props) {
  return (
    <button className={`pl-5 pr-5 ${styles.headerButton}`}>
      {/*<BurgerIcon type="secondary" />*/}
      {<props.img type={props.active ? 'primary' : 'secondary'} />}
      <span className={`text text_type_main-default pl-2 ${props.active ? styles.headerButtonTextActive : ''}`}>{props.text}</span>
    </button>
  )
}
