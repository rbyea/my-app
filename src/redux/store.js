import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cardReducer from './slices/cardSlice';
import pizzaReducer from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterReducer,
    cardReducer,
    pizzaReducer,
  },
});
