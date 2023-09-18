import styles from './header-button.module.css'
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "../../services/hooks";
import {TPages} from "../../services/types";

type THeaderButtonProps = {
  img: any,
  to: string,
  name: TPages,
  text: string
}

export const HeaderButton = (props: THeaderButtonProps): JSX.Element => {
  const {img: ImgComponent, to, name, text} = props
  const navigate = useNavigate();
  const {page} = useSelector(store => store.page)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch({type: name})
    navigate(to)
  }
  return (
    <button className={`pl-5 pr-5 ${styles.headerButton}`} onClick={onClick}>
      {<ImgComponent type={page === name ? 'primary' : 'secondary'}/>}
      <span
        className={`text text_type_main-default pl-2 ${page === name ? styles.headerButtonTextActive : ''}`}>{text}</span>
    </button>
  )
}

