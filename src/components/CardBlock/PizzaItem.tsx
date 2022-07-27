import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPizzas, setItemId } from '../../redux/slices/pizzaSlice';

const PizzaItem: React.FC = () => {
  const dispatch = useDispatch();
  const { itemId } = useSelector(selectPizzas)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62c1d18c2af60be89ece4372.mockapi.io/items/' + params.id);
        dispatch(setItemId(data))
      } catch (error) {
        alert('Ошибка, пицца не найдена!')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!Object.keys(itemId).length) {
    return (
      <>Загрузка..</>
    )
  }

  return (
    <div>
      <h1>{itemId.title}</h1>
      <img src={itemId.imageUrl} alt="" />

      <div>
        Цена:{itemId.price} ₽
      </div>
    </div>
  )
}

export default PizzaItem;