import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect, useState} from "react";
import styles from './reset-password.module.css'
import { Link } from 'react-router-dom';
import {setNewPasswd} from '../../utils/api-wrappers'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux";

export default function ResetPassword() {
  const navigate = useNavigate()
  const [code, setCode] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const codeRef = React.useRef(null)
  const passwdRef = React.useRef(null)
  const [viewPass, setViewPass] = useState(false)

  const onIconClick = () => { viewPass ? setViewPass(false) : setViewPass(true) }
  useEffect(()=> {
    viewPass ? passwdRef.current.type = 'text' : passwdRef.current.type = 'password'
  }, [viewPass])

  const redirect = () => {
    navigate('/login')
  }

  const onSave = (evt) => {
    evt.preventDefault()
    setNewPasswd({passwd:passwd, code:code, redirect:redirect})
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSave}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type='password'
          placeholder='Введите новый пароль'
          onChange={e => setPasswd(e.target.value)}
          icon='ShowIcon'
          value={passwd}
          name='passwd'
          error={false}
          ref={passwdRef}
          onIconClick={onIconClick}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Input
          type='text'
          placeholder='Введите код из письма'
          onChange={e => setCode(e.target.value)}
          value={code}
          name='code'
          error={false}
          ref={codeRef}
          onIconClick={onIconClick}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
    </>
  )
}
