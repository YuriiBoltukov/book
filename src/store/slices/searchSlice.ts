import {createSlice} from '@reduxjs/toolkit';
import {Slice} from "@reduxjs/toolkit/src/createSlice";

const initialState: SearchState = {
  searchStr: '',
};

export interface SearchState {
  searchStr: string;
}

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