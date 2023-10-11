import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import {getBooks} from '../../api';
const initialState = {
  //books: getBooks(),
  loading: false,
  error: null,
};
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      //state.books = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }


})
export const { setBooks, setLoading, setError } = booksSlice.actions;

export const selectBooks = (state:any) => state.books.books;

export default booksSlice.reducer;