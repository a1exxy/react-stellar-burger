import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import styles from '../login.module.css'
import AppHeader from "../../../components/appHeader/appHeader"
import { Link } from 'react-router-dom';

export default function NewPasswd() {
  const [code, setCode] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const codeRef = React.useRef(null)
  const passwdRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => passwdRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <>
      <AppHeader />
      <div className={styles.content}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
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
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setPasswd(e.target.value)}
          value={code}
          name={'code'}
          error={false}
          ref={codeRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Link to='/' className={styles.link}>
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </Link>

        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
    </>
  )
}
