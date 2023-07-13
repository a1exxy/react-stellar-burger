import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./appHeader.module.css";
import HeaderButton from '../headerButton/headerButton'
import { Link } from 'react-router-dom';
import React from "react";

export default function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${styles.appHeader}`}>
      <nav className={styles.appHeaderContent}>
        <div className={styles.leftLink}>
          <Link to='/' className={styles.link}><HeaderButton text='Конструктор' img={BurgerIcon} active/></Link>
          <HeaderButton text='Лента заказов' img={ListIcon} />
          {/*<Link to='/orders' className={styles.link}><HeaderButton text='Лента заказов' img={ListIcon} /></Link>*/}
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.appHeaderLK}>
          <Link to='/profile' className={styles.link}><HeaderButton text='Личный кабинет' img={ProfileIcon} /></Link>
        </div>
      </nav>
    </header>
  )
}

