import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addBooks, BooksState, resetPagination, setBooks, setPagination} from '../../store/slices/booksSlice';
import {getBooks, params} from '../../api';
import BookCard from '../BookCard/BookCard';
import {BookQuery, loadBooks} from '../../shared/utils/book.functions';
import {Book} from '../../shared/models/book.model';

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { books: BooksState }) => state.books);

  useEffect(() => {
    init()
  }, []);

  async function loadMore() {
    dispatch(addBooks(await getBooks()));
  }

  async function init(){
    dispatch(setBooks(await getBooks()));
  }

  async function getBooks(): Promise<Book[]> {
    const queryData: BookQuery = {
      searchStr: state.searchStr,
      filters: {
        category: state.filters.category,
      },
      sort: state.sort
    }

    const {books, pagination} = await loadBooks(queryData, state.pagination)

    dispatch(setPagination(pagination));

    return books;
  }

  return (
    <>
      {
        state.books?.length ? state.books.map((book, i) => {
          return <BookCard book={book} key={i}/>
        }) : 'FATALITY'
      }
      { state.pagination.from < (state.pagination.total ?? 0) && <button onClick={loadMore}>load more</button>}
    </>
  );
};

export default BookList;