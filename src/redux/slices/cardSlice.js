import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    itemsPizza: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
        setAddItem(state, action) {
            const countItems = state.itemsPizza.find(obj => obj.id == action.payload.id);
            if(countItems) {
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
        }
    },
});

export const { setAddItem } = cardSlice.actions;

export default cardSlice.reducer;
