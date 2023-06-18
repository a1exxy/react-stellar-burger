import PropTypes from "prop-types";
import styles from './headerButton.module.css'
export default function HeaderButton(props) {
  return (
    <button className={`pl-5 pr-5 ${styles.headerButton}`}>
      {<props.img type={props.active ? 'primary' : 'secondary'} />}
      <span className={`text text_type_main-default pl-2 ${props.active ? styles.headerButtonTextActive : ''}`}>{props.text}</span>
    </button>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string,
  img: PropTypes.func
}
