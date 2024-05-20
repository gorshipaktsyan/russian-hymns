import { createSlice } from "@reduxjs/toolkit";

export const appBarSlice = createSlice({
  name: "appBar",
  initialState: {
    title: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = appBarSlice.actions;

export default appBarSlice.reducer;
