import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateNames } from '../../config/constants';

interface BookmarksState {
  savedHymns: number[]; 
}

const initialState: BookmarksState = {
  savedHymns: [],
};

export const bookmarksSlice = createSlice({
  name: InitStateNames.bookmarks,
  initialState,
  reducers: {
    removeHymn: (state, action: PayloadAction<number>) => {
      state.savedHymns = state.savedHymns.filter((hymn) => hymn.number !== action.payload); // Assuming `number` is a property in your hymn object
    },
    saveHymn: (state, action: PayloadAction<any>) => {
      state.savedHymns.unshift(action.payload); // Replace `any` with the actual type if available
    },
  },
});

export const { removeHymn, saveHymn } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
