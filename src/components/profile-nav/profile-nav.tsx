import React from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from "../../services/hooks";
import {logout} from '../../utils/api-wrappers'
import styles from "./profile-nav.module.css"

export default function ProfileNav():JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {pathname} = useLocation();

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={styles.links}>
      <Link to='/profile' className={`${styles.link} ${pathname === '/profile' && styles.active}`}>
        <p className={`text text_type_main-medium ${styles.cell}`}>Профиль</p>
      </Link>
      <Link to='/profile/orders' className={`${styles.link} ${pathname === '/profile/orders' && styles.active}`}>
        <p className={`text text_type_main-medium ${styles.cell}`}>История заказов</p>
      </Link>
      <button className={`text text_type_main-medium ${styles.cell} ${styles.link}`} onClick={onLogout}> Выход</button>
      <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>В этом разделе вы можете
        изменить свои персональные данные</p>
    </div>
  )
}
