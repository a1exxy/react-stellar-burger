import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect, useState} from "react";
import styles from './register.module.css'
import {Link} from 'react-router-dom';
import {register} from '../../utils/api-wrappers'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "../../services/hooks";

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwdRef = React.useRef<HTMLInputElement>(null)
  const [viewPass, setViewPass] = useState<boolean>(false)
  const onIconClick = () => {
    setViewPass(!viewPass)
  }

  useEffect(() => {
    if (passwdRef.current) {
      viewPass ? passwdRef.current.type = 'text' : passwdRef.current.type = 'password'
    }
  }, [viewPass])

  const redirect = () => {
    console.log(`redirect to /profile`)
    navigate('/profile')
  }

  const onRegister = (evt: React.FormEvent) => {
    evt.preventDefault()
    console.log(`RUN onRegister`)
    dispatch(register({name: name, email: email, passwd: passwd, redirect: redirect}))
  }

  return (
    <>
      <form className={styles.content} onSubmit={onRegister}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type='text'
          placeholder='Имя'
          onChange={e => setName(e.target.value)}
          value={name}
          name='name'
          error={false}
          ref={nameRef}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Input
          type='email'
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
          value={email}
          name='email'
          error={false}
          ref={emailRef}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Input
          type='password'
          placeholder='Пароль'
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className={`${styles.loginText} text text_type_main-default mt-14`}>
          Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
    </>
  )
}
