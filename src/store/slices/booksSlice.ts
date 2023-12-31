import { createSlice } from "@reduxjs/toolkit";
import { Book, CommonQuery, Pagination } from "../../shared/models/book.model";
import { SORT } from "../../shared/constants/sort.constants";
import { CATEGORY } from "../../shared/constants/filter.constants";

export interface BooksState extends CommonQuery {
  books: Book[];
  loading: boolean;
  pagination: Pagination;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  searchStr: "",
  filters: {
    category: CATEGORY[0].value,
  },
  sort: SORT[0].value,
  pagination: {
    from: 0,
    limit: 30,
    total: null,
  },
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, { payload }: { payload: Book[] }) => {
      state.books = payload;
    },
    addBooks: (state, { payload }: { payload: Book[] }) => {
      state.books = [...state.books, ...payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchStr(state, action) {
      state.searchStr = action.payload.trim().toLowerCase();
    },
    setFilters(state, { payload }) {
      state.filters = payload;
    },
    setSort(state, { payload }) {
      state.sort = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = { ...state.pagination, ...payload };
    },
    resetState(state) {
      state = initialState;
    },
    resetPagination(state) {
      state.pagination = {
        from: 0,
        limit: 30,
        total: null,
      };
    },
  },
});

export const {
  setBooks,
  addBooks,
  setLoading,
  setSearchStr,
  setFilters,
  setSort,
  setPagination,
  resetPagination,
} = booksSlice.actions;

export default booksSlice.reducer;
