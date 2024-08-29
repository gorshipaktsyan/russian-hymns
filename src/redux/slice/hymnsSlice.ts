import { createSlice } from '@reduxjs/toolkit';

import { InitStateNames } from '../../config/constants';
import { hymnsService } from '../../services';

interface HymnsState {
  hymns: any[];
  filteredHymns: any[];
}

const initialState: HymnsState = {
  hymns: hymnsService.get() || [],
  filteredHymns: []
};

export const hymnsSlice = createSlice({
  name: InitStateNames.hymns,
  initialState,
  reducers: {}
});

export default hymnsSlice.reducer;
