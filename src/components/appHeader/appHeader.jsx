import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./appHeader.module.css";
import HeaderButton from '../headerButton/headerButton'

export default function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${styles.appHeader}`}>
      <nav className={styles.appHeaderContent}>
        <div className={styles.leftLink}>
          <HeaderButton text='Конструктор' img={BurgerIcon} active/>
          <HeaderButton text='Лента заказов' img={ListIcon} />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.appHeaderLK}>
          <HeaderButton text='Личный кабинет' img={ProfileIcon} />
        </div>
      </nav>
    </header>
  )
}

