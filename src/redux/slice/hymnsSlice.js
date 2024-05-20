import { createSlice } from "@reduxjs/toolkit";
import hymns from "../../storage/hymns.json";

export const hymnsSlice = createSlice({
  name: "hymns",
  initialState: {
    hymns: hymns || [],
    filteredHymns: [],
  },
  reducers: {},
});

export default hymnsSlice.reducer;
