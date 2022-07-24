import React from 'react';
import { SearchContext } from '../../App';
import styles from './SearchStyles.module.scss';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { selectPizzas, setSearchValue } from '../../redux/slices/pizzaSlice';

function Search() {
  const [value, setValue] = React.useState('');
  const { searchValue } = useSelector(selectPizzas);
  const dispatch = useDispatch();

  const searchRef = React.useRef();


  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
    searchRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  )

  const onChangeValue = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.item}>
      <svg className={styles.iconSearch} enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" fill="none" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></circle><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"></line>
      </svg>

      <input ref={searchRef} value={value} onChange={onChangeValue} className={styles.input} placeholder="Поиск пиццы..." />

      {searchValue &&
        <svg onClick={onClickClear} className={styles.iconClose} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path></svg>
      }
    </div>
  )
}

export default Search;