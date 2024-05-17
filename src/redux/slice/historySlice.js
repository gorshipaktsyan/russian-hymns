import { createSlice } from "@reduxjs/toolkit";
import historyService from "../../services/HistoryService";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    searchedHymns: historyService.get(),
  },
  reducers: {
    clearHistory: (state) => {
      state.searchedHymns = historyService.clear();
    },
    addHymn: (state, action) => {
      state.searchedHymns = historyService.set(action.payload);
    },
  },
});

export const { clearHistory, addHymn } = historySlice.actions;

export default historySlice.reducer;
