import React from 'react';
import { Link } from 'react-router-dom';

import styles from './notFound404.module.css';
import pageNotFound from "../../images/notFound404.jpg";
import AppHeader from "../../components/appHeader/appHeader"

export const NotFound404 = () => {
  return (
    <>
      <AppHeader/>
      <div className={styles.container}>

        <div className={styles.content}>
          <img alt="page not found" src={pageNotFound} />
          <br />
          <Link to='/' className={styles.link}>Перейти на главную</Link>
        </div>
      </div>
    </>
  );
};
