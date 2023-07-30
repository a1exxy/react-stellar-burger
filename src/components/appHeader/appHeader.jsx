import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./appHeader.module.css";
import HeaderButton from '../headerButton/headerButton'
import React from "react";
import {CONSTRUCTOR, FEED, PROFILE} from '../../services/actions/page'

export default function AppHeader() {

  return (
    <header className={`pt-4 pb-4 ${styles.appHeader}`}>
      <nav className={styles.appHeaderContent}>
        <div className={styles.leftLink}>
          <HeaderButton to='/' text='Конструктор' img={BurgerIcon} name={CONSTRUCTOR} />
          <HeaderButton to='/feed/' text='Лента заказов' img={ListIcon} name={FEED} />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.appHeaderLK}>
          <HeaderButton to='/profile' text='Личный кабинет' img={ProfileIcon} name={PROFILE} />
        </div>
      </nav>
    </header>
  )
}

