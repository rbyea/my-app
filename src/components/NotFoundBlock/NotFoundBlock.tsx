import React from 'react';
import styles from './NotFoundBlock.module.scss';
import ButtonBack from '../ButtonBack'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <div className="cart cart--empty">
        <h2>Страницы не найдена <span>😕</span></h2>
        <p className={styles.offset}>
          К сожалению такой страницы не существует.
        </p>
        <ButtonBack />
      </div>
    </div>

  );
}

export default NotFoundBlock;