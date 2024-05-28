import { createSlice } from "@reduxjs/toolkit";
import { InitStateNames } from "../../config/constants/InitStateNames";

export const searchSlice = createSlice({
  name: InitStateNames.search,
  initialState: {
    isSearchedHymnsListOpen: false,
    findedHymns: [],
  },
  reducers: {
    setIsSearchedHymnsListOpen: (state, action) => {
      state.isSearchedHymnsListOpen = action.payload;
    },
    setFindedHymns: (state, action) => {
      state.findedHymns = action.payload;
    },
  },
});

export const { setIsSearchedHymnsListOpen, setFindedHymns } =
  searchSlice.actions;

export default searchSlice.reducer;
