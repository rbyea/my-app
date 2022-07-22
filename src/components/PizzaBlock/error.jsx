import React from 'react'

function PizzasError() {

  return (
    <div className="cart cart--empty">
      <h2>Произошла ошибка <icon>😕</icon></h2>
      <p>
        Что-то пошло не так, попробуйте повторить попытку позже.
      </p>
    </div>
  );
}

export default PizzasError;