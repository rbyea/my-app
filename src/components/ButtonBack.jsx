import React from 'react';
import { Link } from "react-router-dom";

const ButtonBack = () => {
  return (
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  )
}

export default ButtonBack