import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import styles from './forgot-password.module.css'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {passwdReset} from '../../utils/api-wrappers'

export default function ForgotPassword(): JSX.Element {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const emailRef = React.useRef(null)

  const redirect = () => {
    console.log(`redirect to /reset-password`)
    navigate('/reset-password', {state: {background: "forgot-password"}})
  }

  const onForgot = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!email) {
      navigate('/forgot-password')
    } else {
      passwdReset({email: email, redirect: redirect})
    }
  }

  return (
    <>
      <form className={styles.content} onSubmit={onForgot}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type='email'
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
          value={email}
          name='name'
          error={false}
          ref={emailRef}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
    </>
  )
}
