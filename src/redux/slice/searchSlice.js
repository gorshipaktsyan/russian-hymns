import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
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
