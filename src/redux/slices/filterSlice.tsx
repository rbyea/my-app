import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


type SortSliceType = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface SortSliceState {
  categoryId: number;
  page: number;
  sort: SortSliceType;
}

const initialState: SortSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  page: 1,
};

export const filterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortSliceType>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<SortSliceState>) {
      state.sort = action.payload.sort;
      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setPage, setFilters } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filterReducer

export default filterSlice.reducer;
