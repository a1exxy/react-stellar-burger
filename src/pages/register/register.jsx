import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import styles from './register.module.css'
import AppHeader from "../../components/appHeader/appHeader"
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const nameRef = React.useRef(null)
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
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={emailRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
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
          name={'passwd'}
          error={false}
          ref={passwdRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Link to='/' className={styles.link}>
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </Link>

        <p className={`${styles.loginText} text text_type_main-default mt-14`}>
          Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
    </>
  )
}
