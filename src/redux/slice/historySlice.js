import { createSlice } from "@reduxjs/toolkit";
import historyService from "../../services/HistoryService";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    searchedHymns: historyService.get(),
    isConfirmOpen: false,
  },
  reducers: {
    clearHistory: (state) => {
      state.searchedHymns = historyService.clear();
    },
    addHymn: (state, action) => {
      state.searchedHymns = historyService.set(action.payload);
    },
    setIsConfirmOpen: (state, action) => {
      state.isConfirmOpen = action.payload;
    },
  },
});

export const { clearHistory, addHymn, setIsConfirmOpen } = historySlice.actions;

export default historySlice.reducer;
