import React from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom'

import Categories from '../components/Categories';
import Sort, { objSort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PaginationBlock from '../components/Pagination'
import Error from '../components/PizzaBlock/error'
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas, selectPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { categoryId, sort, page } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  console.log(status)
  const { searchValue } = React.useContext(SearchContext)

  const getPizzas = async () => {

    const categoryFetch = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeFetch = '&sortBy=' + `${sort.sortProperty.replace('-', '')}`;
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      page,
      categoryFetch,
      sortTypeFetch,
      order,
      search,
    }))
    // window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = objSort.find((obj) => obj.sortProperty == params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    isSearch.current = false

    if (!isSearch.current) {
      getPizzas();
    }
  }, [categoryId, sort, searchValue, page]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page,
        sortProperty:
          sort.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort, searchValue, page])

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const skeletrons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePagination = (i) => {
    dispatch(setPage(i))
  }
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status == 'loading' ? skeletrons : (status == 'error' ? <Error /> : pizzas)
        }
      </div>
      <PaginationBlock page={page} onChangePagination={onChangePagination} />
    </>
  );
}

export default Home;

