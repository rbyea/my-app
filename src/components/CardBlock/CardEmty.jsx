import React from 'react';
import CardEmtyImg from '../../assets/img/empty-cart.png';
import { Link } from "react-router-dom";

function CardEmty() {
  return (
  <div className="cart cart--empty">
    <h2>Корзина пустая <icon>😕</icon></h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.<br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={CardEmtyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
  )
}

export default CardEmty;