import { createSlice } from "@reduxjs/toolkit";

export const currentNumberSlice = createSlice({
  name: "currentNumber",
  initialState: {
    currentNumber: [],
  },
  reducers: {
    setCurrentNumber: (state, action) => {
      state.currentNumber = action.payload;
    },
  },
});

export const { setCurrentNumber } = currentNumberSlice.actions;

export default currentNumberSlice.reducer;
