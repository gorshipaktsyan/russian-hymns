import { createSlice } from "@reduxjs/toolkit";
import historyStore from "../../view/services/stores/HistoryStore";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    searchedHymns: historyStore.get(),
  },
  reducers: {
    clearHistory: (state) => {
      state.searchedHymns = historyStore.clear();
    },
    addHymn: (state, action) => {
      state.searchedHymns = historyStore.set(action.payload);
    },
  },
});

export const { clearHistory, addHymn } = historySlice.actions;

export default historySlice.reducer;
