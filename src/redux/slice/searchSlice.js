import { createSlice } from "@reduxjs/toolkit";
import { InitStateNames } from "../../config/constants";

export const searchSlice = createSlice({
  name: InitStateNames.search,
  initialState: {
    isSearchedHymnsListOpen: false,
    foundHymns: [],
  },
  reducers: {
    setIsSearchedHymnsListOpen: (state, action) => {
      state.isSearchedHymnsListOpen = action.payload;
    },
    setFoundHymns: (state, action) => {
      state.foundHymns = action.payload;
    },
  },
});

export const { setIsSearchedHymnsListOpen, setFoundHymns } =
  searchSlice.actions;

export default searchSlice.reducer;
