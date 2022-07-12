import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories';
import Sort, { objSort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PaginationBlock from '../components/Pagination'
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPage, setFilters } from '../redux/slices/filterSlice';
import {setItems, fetchPizzas} from '../redux/slices/pizzaSlice';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {categoryId, sort, page} = useSelector((state) => state.filterReducer);
  const {items} = useSelector((state) => state.pizzaReducer);
  
  const {searchValue} = React.useContext(SearchContext)
  const [visibleSkeleton, setVisibleSkeleton] = React.useState(true);

  const getPizzas = async () => {

    setVisibleSkeleton(true);

    const categoryFetch = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeFetch = '&sortBy=' + `${sort.sortProperty.replace('-', '')}`;
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      dispatch(fetchPizzas({
        page,
        categoryFetch,
        sortTypeFetch,
        order,
        search,
      }))
      setVisibleSkeleton(false);
    } catch (error) {
        console.log(error)
    }
      // const {data} = await axios.get(`https://62c1d18c2af60be89ece4372.mockapi.io/items?page=${page}&limit=4${categoryFetch}${sortTypeFetch}&order=${order}${search}`)

    // window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  React.useEffect(() => {
    if(window.location.search) {
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

    if(!isSearch.current) {
      getPizzas();
    } 
  }, [categoryId, sort, searchValue, page]);

  React.useEffect(() => {
    if(isMounted.current) {
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
  return(
    <>
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory}/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            visibleSkeleton == true ? skeletrons : pizzas
          }
        </div>
        <PaginationBlock page={page} onChangePagination={onChangePagination}/>
    </>
  );
}

export default Home;

