import { createSlice } from "@reduxjs/toolkit";
import hymns from "../../view/services/storage/hymns.json";

export const hymnsSlice = createSlice({
  name: "hymns",
  initialState: {
    hymns: hymns || [],
  },
  reducers: {},
});

export default hymnsSlice.reducer;
