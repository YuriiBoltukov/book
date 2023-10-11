import {createSlice} from '@reduxjs/toolkit';
import {Slice} from "@reduxjs/toolkit/src/createSlice";

export interface SearchState {
  searchStr: string;
}

const initialState: SearchState = {
  searchStr: '',
};

const searchSlice: Slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQuery(state,action) {
      state.searchStr = action.payload.trim().toLowerCase();
    },
  },

})
export const {searchQuery} = searchSlice.actions;

export default searchSlice.reducer;