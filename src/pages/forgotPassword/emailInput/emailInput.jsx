import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import styles from './emailInput.module.css'
import AppHeader from "../../../components/appHeader/appHeader"
import { Link } from 'react-router-dom';

export default function EmailInput() {
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const emailRef = React.useRef(null)
  const passwdRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => emailRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <>
      <AppHeader />
      <div className={styles.content}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'name'}
          error={false}
          ref={emailRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Link to='/' className={styles.link}>
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </Link>

        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
    </>
  )
}
