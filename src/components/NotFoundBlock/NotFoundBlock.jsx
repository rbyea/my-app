import React from 'react';
import styles from './NotFoundBlock.module.scss';
import ButtonBack from '../ButtonBack'

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <div class="cart cart--empty">
        <h2>Страницы не найдена <icon>😕</icon></h2>
        <p className={styles.offset}>
          К сожалению такой страницы не существует.
        </p>
        <ButtonBack/>
      </div>
    </div>

  );
}

export default NotFoundBlock;