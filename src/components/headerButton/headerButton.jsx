import PropTypes from "prop-types";
import styles from './headerButton.module.css'
export default function HeaderButton(props) {
  const ImgComponent = props.img
  return (
    <a href='#' className={`pl-5 pr-5 ${styles.headerButton}`}>
      {<ImgComponent type={props.active ? 'primary' : 'secondary'} />}
      <span className={`text text_type_main-default pl-2 ${props.active ? styles.headerButtonTextActive : ''}`}>{props.text}</span>
    </a>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string,
  img: PropTypes.func
}
