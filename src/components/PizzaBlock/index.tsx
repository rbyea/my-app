import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CartItemsPizza, selectItemId, setAddItem } from '../../redux/slices/cardSlice';

type PizzaBlockProps = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, imageUrl, price, sizes, types }) => {
  const [typeCount, setTypeCount] = useState(0);
  const [sizeCount, setSizeCount] = useState(0);

  const typeName = ['тонкое', 'традиционное'];

  const dispatch = useDispatch();

  const cardItem = useSelector(selectItemId)

  const addItemPizza = () => {
    const item: CartItemsPizza =
    {
      id,
      title,
      imageUrl,
      price,
      size: sizes[sizeCount],
      types: typeName[typeCount],
      count: 0
    }
    dispatch(setAddItem(item))
  }


  const addedCount = cardItem ? cardItem.count : 0;


  return (

    <div className="pizza-width">
      <div className="pizza-block">
        <Link to={`/item/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
        </Link>

        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {
              types.map((i) => (
                <li key={i} onClick={() => setTypeCount(i)} className={(typeCount == i) ? 'active' : (types.length == 1) ? 'active' : ''}>{typeName[i]}</li>
              ))
            }
          </ul>
          <ul>

            {
              sizes.map((value, i) => (
                <li key={i} onClick={() => setSizeCount(i)} className={sizeCount == i ? 'active' : ''}>{value}</li>
              ))
            }
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={addItemPizza} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>

            {
              addedCount > 0 &&
              <i>{addedCount}</i>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;