import { createSlice } from '@reduxjs/toolkit';
import {Book} from '../../shared/models/book.model';

export interface BooksState {
  books: Book[];
  loading: boolean;
}

const initialState: BooksState = {
  books: [],
  loading: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, {payload}: {payload: Book[]}) => {
      state.books = payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }


})


export const {setBooks, setLoading} = booksSlice.actions;

export default booksSlice.reducer;