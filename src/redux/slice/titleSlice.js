import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "title",
  initialState: {
    title: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;
