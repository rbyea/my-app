import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemsPizza = {
  id: number;
  title: string;
  imageUrl: string;
  size: number;
  count: number;
  price: number;
  types: string;
}

interface CartSliceState {
  totalPrice: number;
  itemsPizza: CartItemsPizza[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  itemsPizza: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {

    setAddItem(state, action: PayloadAction<CartItemsPizza>) {
      const countItems = state.itemsPizza.find(obj => obj.id == action.payload.id);
      if (countItems) {
        countItems.count++
      } else {
        state.itemsPizza.push({
          ...action.payload,
          count: 1
        });
      }

      state.totalPrice = state.itemsPizza.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    setMinusCount(state, action: PayloadAction<number>) {
      const countItems = state.itemsPizza.find(obj => obj.id == action.payload);
      if (countItems) {
        countItems.count--
      }
    },
    setRemoveItem(state, action: PayloadAction<number>) {
      state.itemsPizza = state.itemsPizza.filter((obj) => obj.id != action.payload)
    },
    setClearItem(state) {
      state.itemsPizza = [];
      state.totalPrice = 0;
    }
  },
});

export const { setAddItem, setClearItem, setRemoveItem, setMinusCount } = cardSlice.actions;
export const selectCard = (state: RootState) => state.cardReducer
export const selectItem = (state: RootState) => state.cardReducer.itemsPizza
export const selectItemId = (id: number) => (state: RootState) => state.cardReducer.itemsPizza.find((obj) => obj.id == id)

export default cardSlice.reducer;
