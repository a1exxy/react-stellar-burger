import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./profile.module.css"
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {updateUser, logout} from '../../utils/api'

const viewPasswd = '*****'

export default function Profile() {
  const {user, email} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [name, setName] = React.useState(user)
  const [login, setEmail] = React.useState(email)

  const [passwd, setPasswd] = React.useState(viewPasswd)
  const [edit, setEdit] = React.useState({name:true, email:true, passwd:true})


  const nameRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const passwdRef = React.useRef(null)
  const onEditIconClick = (ref) => {
    console.log(ref)
    setEdit({...edit, [ref.current.name]:false})
    setTimeout(() => ref.current.focus(), 0)
  }
  const onCancel = () => {
    setPasswd(viewPasswd)
    setName(user)
    setEmail(email)
    setEdit({name:true, email:true, passwd:true})
  }
  const onSave = (evt) => {
    evt.preventDefault()
    console.log(`Save update profile`)
    updateUser({dispatch: dispatch, name: name, email:login, passwd:passwd})
    setEdit({name:true, email:true, passwd:true})
    // console.log(user)
  }
  const onLogout = (evt) => {
    logout(dispatch)
    navigate('/')
  }
  return (
    <>
      <div className={styles.content}>
        <div className={styles.links}>
          <p className={`text text_type_main-medium ${styles.cell}`}>Профиль</p>
          <Link to='/profile/orders' className={styles.link}><p className={`text text_type_main-medium ${styles.cell}`}>История заказов</p></Link>
          <button className={`text text_type_main-medium ${styles.cell} ${styles.link}`} onClick={onLogout}> Выход </button>
          <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

        <form className={styles.inputs}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            icon={'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            ref={nameRef}
            onIconClick={() => onEditIconClick(nameRef)}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            disabled={edit.name}
          />
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={e => setEmail(e.target.value)}
            icon={'EditIcon'}
            value={login}
            name={'email'}
            error={false}
            ref={emailRef}
            onIconClick={() => onEditIconClick(emailRef)}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            disabled={edit.email}
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
            onIconClick={() => onEditIconClick(passwdRef)}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            disabled={edit.passwd}
          />
          { (!edit.name || !edit.email || !edit.passwd ) &&
            <div className={styles.buttons}>
              <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
              <Button htmlType="submit" type="primary" size="medium" onClick={onSave}>Сохранить</Button>
            </div>
          }
        </form>
      </div>
    </>

  )
}
