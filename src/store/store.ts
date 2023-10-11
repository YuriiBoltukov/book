import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice';
import booksReducer from './slices/booksSlice';
export const store = configureStore({
  reducer: {
    search: searchReducer,
    books: booksReducer
  },
})

export default store;