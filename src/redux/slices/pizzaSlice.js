import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { page, categoryFetch, sortTypeFetch, order, search } = params;
  const { data } = await axios.get(
    `https://62c1d18c2af60be89ece4372.mockapi.io/items?page=${page}&limit=4${categoryFetch}${sortTypeFetch}&order=${order}${search}`,
  );
  console.log(data);
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      console.log(state, 'loading');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      console.log(state, 'ok');
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log('error');
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
