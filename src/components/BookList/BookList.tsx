import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooks,
  BooksState,
  setLoading,
  setPagination,
} from "../../store/slices/booksSlice";
import BookCard from "../BookCard/BookCard";
import { BookQuery, loadBooks } from "../../shared/utils/book.functions";
import { Book } from "../../shared/models/book.model";
import style from "./booksList.module.scss";
import { Button } from "antd";

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { books: BooksState }) => state.books);

  /**
   * Loads more books and adds them to the list.
   */
  async function loadMore() {
    try {
      dispatch(setLoading(true));
      const newBooks = await getBooks();
      dispatch(addBooks(newBooks));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error loading more books:", error);
    }
  }

  /**
   * Retrieves a list of books based on the current query parameters.
   * @returns A Promise that resolves to an array of Book objects.
   */
  async function getBooks(): Promise<Book[]> {
    const queryData: BookQuery = {
      searchStr: state.searchStr,
      filters: {
        category: state.filters.category,
      },
      sort: state.sort,
    };

    try {
      const { books, pagination } = await loadBooks(
        queryData,
        state.pagination,
      );
      dispatch(setPagination(pagination));
      return books;
    } catch (error) {
      console.error("Error loading books:", error);
      throw error;
    }
  }

  return (
    <div>
      {state.pagination.total !== 0 ? (
        <p>Found {state.pagination.total} results</p>
      ) : null}

      <div className={style.books}>
        {state.books?.length
          ? state.books.map((book, i) => {
              return <BookCard book={book} key={i} />;
            })
          : null}
      </div>
      {state.pagination.from < (state.pagination.total ?? 0) && (
        <Button
          className={style.books_button}
          onClick={loadMore}
          loading={state.loading}
        >
          load more
        </Button>
      )}
    </div>
  );
};

export default BookList;
