import React from 'react';
import { Link } from "react-router-dom";

function ButtonBack() {
  return(
    <Link to="/" class="button button--black">
      <span>Вернуться назад</span>
    </Link>
  )
}

export default ButtonBack