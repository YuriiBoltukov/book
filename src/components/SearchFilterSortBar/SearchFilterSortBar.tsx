import React, { useState } from "react";
import DropdownSelect from "../DropdownSelect/DropdownSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  BooksState,
  resetPagination,
  setBooks,
  setFilters,
  setLoading,
  setPagination,
  setSearchStr,
  setSort,
} from "../../store/slices/booksSlice";
import { BookQuery, loadBooks } from "../../shared/utils/book.functions";
import { SORT_OPTIONS } from "../../shared/constants/sort.constants";
import { CATEGORY_OPTIONS } from "../../shared/constants/filter.constants";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const SearchFilterSortBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: { books: BooksState }) => state.books);
  const from = useSelector(
    (state: { books: BooksState }) => state.books.pagination.from,
  );
  const [form, setForm] = useState({
    q: "",
    category: "",
    orderBy: "",
  });

  /** handlse write down event in input */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setForm({ ...form, q: event.target.value });
    dispatch(setSearchStr(event.target.value));
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  /** handles select category event */
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setForm({ ...form, category: event.target.value });
    dispatch(setFilters({ category: event.target.value }));
  };

  /** handles select sort event */
  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setForm({ ...form, orderBy: event.target.value });
    dispatch(setSort(event.target.value));
  };

  /** sends request */
  async function handleSubmit(event?: React.FormEvent<HTMLElement>) {
    if (event) event.preventDefault();
    try {
      const queryData: BookQuery = {
        searchStr: state.searchStr,
        filters: {
          category: state.filters.category,
        },
        sort: state.sort,
      };
      debugger;
      dispatch(resetPagination());
      dispatch(setLoading(true));

      if (window.location.pathname !== "/") {
        navigate("/");
      }

      const { books, pagination } = await loadBooks(queryData, {
        ...state.pagination,
        from,
      });
      dispatch(setLoading(false));
      dispatch(setBooks(books));
      dispatch(setPagination(pagination));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={form.q}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите текст"
      />
      <div>
        <DropdownSelect
          value={form.category}
          options={CATEGORY_OPTIONS}
          onChange={handleCategoryChange}
        />

        <DropdownSelect
          value={form.orderBy}
          options={SORT_OPTIONS}
          onChange={handleSortOptionChange}
        />
      </div>

      <Button onClick={handleSubmit} loading={state.loading}>
        Отправить
      </Button>
    </form>
  );
};

export default SearchFilterSortBar;