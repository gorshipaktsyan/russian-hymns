import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    searchedHymns: [],
  },
  reducers: {
    clearHistory: (state) => {
      state.searchedHymns = [];
    },
    addHymn: (state, action) => {
      state.searchedHymns.push(action.payload);
    },
  },
});

export const { clearHistory, addHymn } = historySlice.actions;

export default historySlice.reducer;
