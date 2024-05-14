import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    drawerOpen: false,
  },
  reducers: {
    setOpenDrawer: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const { setOpenDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
