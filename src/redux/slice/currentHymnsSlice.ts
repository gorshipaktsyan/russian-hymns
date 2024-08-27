import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateNames } from '../../config/constants';

interface currentHymnsState {
  currentHymns: number[]; 
}

const initialState: currentHymnsState = {
  currentHymns: [],
};

export const currentHymnsSlice = createSlice({
  name: InitStateNames.currentHymns,
  initialState,
  reducers: {
    setCurrentHymns: (state, action: PayloadAction<number[]>) => {
      console.log(action.payload)
      state.currentHymns = action.payload;
    },
  },
});

export const { setCurrentHymns } = currentHymnsSlice.actions;

export default currentHymnsSlice.reducer;
