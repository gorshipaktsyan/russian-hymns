import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateNames } from '../../config/constants';

interface HistoryState {
  searchedHymns: any[]; // Replace `any` with the actual type if available
  isConfirmOpen: boolean;
}

const initialState: HistoryState = {
  searchedHymns: [],
  isConfirmOpen: false,
};

export const historySlice = createSlice({
  name: InitStateNames.history,
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.searchedHymns = [];
    },
    addHymn: (state, action: PayloadAction<any>) => {
      state.searchedHymns.unshift(action.payload); // Replace `any` with the actual type if available
    },
    setIsConfirmOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOpen = action.payload;
    },
  },
});

export const { clearHistory, addHymn, setIsConfirmOpen } = historySlice.actions;

export default historySlice.reducer;
