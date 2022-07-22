import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { page, categoryFetch, sortTypeFetch, order, search } = params;
  const { data } = await axios.get(
    `https://62c1d18c2af60be89ece4372.mockapi.io/items?page=${page}&limit=4${categoryFetch}${sortTypeFetch}&order=${order}${search}`,
  );
  
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
  itemId: {},
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setItemId(state, action) {
      state.itemId = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
      state.itemId = {};
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems, setItemId } = pizzaSlice.actions;

export const selectPizzas = (state) => state.pizzaReducer;

export default pizzaSlice.reducer;
