import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isDrawerOpen: false,
  },
  reducers: {
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { setIsDrawerOpen } = drawerSlice.actions;

export default drawerSlice.reducer;
