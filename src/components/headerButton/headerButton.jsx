import PropTypes from "prop-types";
import styles from './headerButton.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function HeaderButton(props) {
  const { img:ImgComponent, to, name, text} = props
  const navigate = useNavigate();
  const {page} = useSelector(store => store.page)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch({type:name})
    navigate(to)
  }
  return (
    <button className={`pl-5 pr-5 ${styles.headerButton}`} onClick={onClick}>
        {<ImgComponent type={page === name ? 'primary' : 'secondary'} />}
        <span className={`text text_type_main-default pl-2 ${page === name ? styles.headerButtonTextActive : ''}`}>{text}</span>
    </button>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
