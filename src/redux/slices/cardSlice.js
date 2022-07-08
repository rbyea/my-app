import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  itemsPizza: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action) {
      state.itemsPizza.push(action.payload);
      state.itemsPizza = count++;
    },
    removeItem(state, action) {
      state.itemsPizza = state.itemsPizza.filter((obj) => obj.id != action.payload);
    },
    clearItem(state, action) {
      state.itemsPizza = [];
    },
  },
});

export const { addItem, removeItem, clearItem } = cardSlice.actions;

export default cardSlice.reducer;
