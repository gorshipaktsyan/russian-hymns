import { createSlice } from "@reduxjs/toolkit";
import bookmarksService from "../../services/BookmarksService";

export const bookmarks = "bookmarks";

export const bookmarksSlice = createSlice({
  name: bookmarks,
  initialState: {
    savedHymns: bookmarksService.get() || [],
  },
  reducers: {
    removeHymn: (state, action) => {
      state.savedHymns = bookmarksService.remove(action.payload);
    },
    saveHymn: (state, action) => {
      state.savedHymns = bookmarksService.set(action.payload);
    },
  },
});

export const { removeHymn, saveHymn } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
