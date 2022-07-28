import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: JSON.parse(localStorage.getItem('price')) || 0,
  itemsPizza: JSON.parse(localStorage.getItem('cart')) || [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setAddItem(state, action) {
      const countItems = state.itemsPizza.find((obj) => obj.id == action.payload.id);
      if (countItems) {
        countItems.count++;
      } else {
        state.itemsPizza.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.itemsPizza.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    setMinusCount(state, action) {
      const countItems = state.itemsPizza.find((obj) => obj.id == action.payload);
      if (countItems) {
        console.log(countItems.count);
        countItems.count--;
      }
      state.totalPrice = state.itemsPizza.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    setRemoveItem(state, action) {
      state.itemsPizza = state.itemsPizza.filter((obj) => obj.id != action.payload);
      state.totalPrice = state.itemsPizza.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    setClearItem(state) {
      state.itemsPizza = [];
      state.totalPrice = 0;
    },
  },
});

export const { setAddItem, setClearItem, setRemoveItem, setMinusCount } = cardSlice.actions;
export const selectCard = (state) => state.cardReducer;
export const selectItem = (state) => state.cardReducer.itemsPizza;
export const selectItemId = (id) => (state) =>
  state.cardReducer.itemsPizza.find((obj) => obj.id == id);

export default cardSlice.reducer;
