import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchedHymnsListOpen: false,
  },
  reducers: {
    setOpenSearchedHymnList: (state, action) => {
      state.searchedHymnsListOpen = action.payload;
    },
  },
});

export const { setOpenSearchedHymnList } = searchSlice.actions;

export default searchSlice.reducer;
