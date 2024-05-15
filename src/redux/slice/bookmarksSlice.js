import { createSlice } from "@reduxjs/toolkit";
import bookmarksStore from "../../../src/view/services/stores/BookmarksStore";
export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    savedHymns: bookmarksStore.get() || [],
  },
  reducers: {
    removeHymn: (state, action) => {
      state.savedHymns = bookmarksStore.remove(action.payload);
    },
    saveHymn: (state, action) => {
      state.savedHymns = bookmarksStore.set(action.payload);
    },
  },
});

export const { removeHymn, saveHymn } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
