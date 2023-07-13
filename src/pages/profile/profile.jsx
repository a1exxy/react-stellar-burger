import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./profile.module.css"
import React from "react";
import AppHeader from "../../components/appHeader/appHeader"
import { Link } from 'react-router-dom';
export default function Profile() {
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
        <div className={styles.links}>
          <p className={`text text_type_main-medium ${styles.cell}`}>Профиль</p>
          <Link to='/' className={styles.link}><p className={`text text_type_main-medium ${styles.cell}`}>История заказов</p></Link>
          <Link to='/' className={styles.link}><p className={`text text_type_main-medium ${styles.cell}`}>Выход</p></Link>
          <p className={`text text_type_main-small text_color_inactive ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

        <div className={styles.inputs}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            icon={'EditIcon'}
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
            icon={'EditIcon'}
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
            icon={'EditIcon'}
            value={passwd}
            name={'passwd'}
            error={false}
            ref={passwdRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
      </div>
    </>

  )
}
