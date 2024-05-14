import { createSlice } from "@reduxjs/toolkit";
import bookmarksStore from "../../../src/view/services/stores/BookmarksStore";
export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    savedHymns: bookmarksStore.get(),
  },
  reducers: {
    removeHymn: (state, action) => {
      state.savedHymns = state.savedHymns.filter(
        (hymn) => hymn !== action.payload
      );
    },
    saveHymn: (state, action) => {
      state.savedHymns.push(action.payload);
    },
  },
});

export const { removeHymn, saveHymn } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
