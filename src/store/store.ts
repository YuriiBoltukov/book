import { configureStore } from "@reduxjs/toolkit";
import booksReducer, { BooksState } from "./slices/booksSlice";

export type BooksReducer = { booksReducer: BooksState };

export const store = configureStore({
  reducer: {
    booksReducer,
  },
});

export default store;
