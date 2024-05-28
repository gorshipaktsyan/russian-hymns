import { createSlice } from "@reduxjs/toolkit";
import hymns from "../../storage/hymns.json";
import { InitStateNames } from "../../config/constants/InitStateNames";

export const hymnsSlice = createSlice({
  name: InitStateNames.hymns,
  initialState: {
    hymns: hymns || [],
    filteredHymns: [],
  },
  reducers: {},
});

export default hymnsSlice.reducer;
