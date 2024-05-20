import { createSlice } from "@reduxjs/toolkit";

export const appBarSlice = createSlice({
  name: "appBar",
  initialState: {
    title: "",
    isSaved: false,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setIsSaved: (state, action) => {
      state.isSaved = action.payload;
    },
  },
});

export const { setTitle, setIsSaved } = appBarSlice.actions;

export default appBarSlice.reducer;
