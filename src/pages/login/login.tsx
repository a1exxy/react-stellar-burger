import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useState, useEffect} from "react";
import styles from './login.module.css'
import {Link, useNavigate} from 'react-router-dom';
import {login} from '../../utils/api-wrappers'
import {useDispatch, useSelector} from "../../services/hooks";

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('')
  const [inputPasswd, setInputPasswd] = useState('')
  const [viewPass, setViewPass] = useState(false)
  const loginRef = React.useRef(null)
  const passRef = React.useRef(null)
  const onIconClick = () => {
    viewPass ? setViewPass(false) : setViewPass(true)
  }

  useEffect(() => {
    // @ts-ignore
    viewPass ? passRef.current.type = 'text' : passRef.current.type = 'password'
  }, [viewPass])

  const onLogin = (evt: React.FormEvent) => {
    evt.preventDefault()
    dispatch(login({email: inputEmail, passwd: inputPasswd}))
    if (user.user) {
      navigate('/')
    }
    setInputPasswd('')
  }

  return (
    <>
      <form className={styles.content} onSubmit={onLogin}>
        <p className="text text_type_main-medium">Вход</p>
        <Input
          type='email'
          placeholder='E-mail'
          onChange={e => setInputEmail(e.target.value)}
          value={inputEmail}
          name='name'
          error={false}
          ref={loginRef}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Input
          type='password'
          placeholder='Пароль'
          onChange={e => setInputPasswd(e.target.value)}
          icon='ShowIcon'
          value={inputPasswd}
          name='name'
          error={false}
          ref={passRef}
          onIconClick={onIconClick}
          errorText='Ошибка'
          size='default'
          extraClass="ml-1"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>

        <p className={`${styles.regText} text text_type_main-default mt-14`}>
          Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className={`${styles.recoveryText} text text_type_main-default`}>
          Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
      </form>
    </>
  )
}
