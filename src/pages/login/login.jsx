import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import styles from './login.module.css'
import AppHeader from "../../components/appHeader/appHeader"
import { Link } from 'react-router-dom';

export default function Login() {
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
        <p className="text text_type_main-medium">Вход</p>
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
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setPasswd(e.target.value)}
          icon={'ShowIcon'}
          value={passwd}
          name={'name'}
          error={false}
          ref={passwdRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Link to='/' className={styles.link}>
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </Link>

        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className={`${styles.recoveryText} text text_type_main-default`}>
          Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
      </div>
    </>
  )
}
