import React, { useEffect, useState } from "react";
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
import { SORT } from "../../shared/constants/sort.constants";
import { CATEGORY } from "../../shared/constants/filter.constants";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Space } from "antd";
import style from "./searchFilterSortBar.module.scss";

const SearchFilterSortBar: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: { books: BooksState }) => state.books);
  const from = useSelector(
    (state: { books: BooksState }) => state.books.pagination.from,
  );
  const [form, setForm] = useState({
    q: "",
    category: CATEGORY?.[0].value,
    orderBy: SORT?.[0].value,
  });

  /**
   * Handler for changing the input value in the search field.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setForm({ ...form, q: event.target.value });
    dispatch(setSearchStr(event.target.value));
  };

  /**
   * Handler for pressing the Enter key in the search input field.
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  /**
   * Handler for changing the selected category.
   */
  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category: value });
    dispatch(setFilters({ category: value }));
  };

  /**
   * Handler for changing the selected sorting option.
   */
  const handleSortOptionChange = (value: string) => {
    setForm({ ...form, orderBy: value });
    dispatch(setSort(value));
  };

  /**
   * Handler to set disabled status for button
   */
  const handleDisabled = () => {
    const a = form.q === "" && form.category === CATEGORY[0].value;
    setDisabled(a);
  };

  /**
   * Sends a request to load books based on selected parameters.
   */
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

  useEffect(() => {
    handleDisabled();
  }, [form]);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className="form-wrapper">
        <Space wrap>
          <div className={style.form_item}>
            <label>Search</label>
            <Input
              type="text"
              placeholder="Enter request"
              value={form.q}
              onChange={handleInputChange}
              style={{ width: 240 }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={style.form_item}>
            <label>Category</label>
            <Select
              // @ts-ignore
              value={CATEGORY?.[0].value}
              style={{ width: 120 }}
              onChange={handleCategoryChange}
              options={CATEGORY}
            />
          </div>
          <div className={style.form_item}>
            <label>Sort method</label>
            <Select
              // @ts-ignore
              value={SORT?.[0].value}
              style={{ width: 120 }}
              onChange={handleSortOptionChange}
              options={SORT}
            />
          </div>
        </Space>
      </div>
      <Button
        disabled={disabled}
        onClick={handleSubmit}
        loading={state.loading}
        style={{ width: 120 }}
      >
        Send request
      </Button>
    </form>
  );
};

export default SearchFilterSortBar;
