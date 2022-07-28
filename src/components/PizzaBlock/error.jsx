import React from 'react'

const PizzasError = () => {

  return (
    <div className="cart cart--empty">
      <h2>Произошла ошибка <span>😕</span></h2>
      <p>
        Что-то пошло не так, попробуйте повторить попытку позже.
      </p>
    </div>
  );
}

export default PizzasError;