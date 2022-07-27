import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  size: number[];
  count: number;
  price: number;
  types: number[];
}

const initialState = {
  items: [],
  status: 'loading',
  itemId: {},
  searchValue: '',
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
  const { page, categoryFetch, sortTypeFetch, order, search } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://62c1d18c2af60be89ece4372.mockapi.io/items?page=${page}&limit=4${categoryFetch}${sortTypeFetch}&order=${order}${search}`,
  );

  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
    setItemId(state, action: PayloadAction<Pizza[]>) {
      state.itemId = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'succes';
      state.itemId = {};
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    })
  }
});

export const { setItems, setItemId, setSearchValue } = pizzaSlice.actions;

export const selectPizzas = (state: RootState) => state.pizzaReducer;

export default pizzaSlice.reducer;
