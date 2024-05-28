import { createSlice } from "@reduxjs/toolkit";
import { InitStateNames } from "../../config/constants/InitStateNames";
import { filterArray } from "../../utils/filter";

export const bookmarksSlice = createSlice({
  name: InitStateNames.bookmarks,
  initialState: {
    savedHymns: [],
  },
  reducers: {
    removeHymn: (state, action) => {
      state.savedHymns = filterArray(
        state.savedHymns,
        "number",
        action.payload,
        "!=="
      );
    },
    saveHymn: (state, action) => {
      state.savedHymns.unshift(action.payload);
    },
  },
});

export const { removeHymn, saveHymn } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
