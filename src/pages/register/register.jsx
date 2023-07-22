import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect, useState} from "react";
import styles from './register.module.css'
import { Link } from 'react-router-dom';
import { register } from '../../utils/api'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')

  const nameRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const passwdRef = React.useRef(null)

  const [viewPass, setViewPass] = useState(false)
  const onIconClick = () => { viewPass ? setViewPass(false) : setViewPass(true) }
  useEffect(()=> {
    viewPass ? passwdRef.current.type = 'text' : passwdRef.current.type = 'password'
  }, [viewPass])

  const onRegister = (evt) => {
    evt.preventDefault()
    if(register({dispatch:dispatch, name:name, email:email, passwd:passwd})){
      navigate("/profile");
    }

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
          ref={emailRef}
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
        <Link to='/' className={styles.link}>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </Link>

        <p className={`${styles.loginText} text text_type_main-default mt-14`}>
          Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
    </>
  )
}
