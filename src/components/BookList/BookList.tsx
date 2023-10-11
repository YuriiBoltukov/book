import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BooksState, setBooks} from '../../store/slices/booksSlice';
import {getBooks, params} from '../../api';
import BookCard from '../BookCard/BookCard';

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: { books: BooksState }) => state.books.books);

  useEffect(() => {
    loadBooks()
  }, []);

  async function loadBooks(){
    const booksResponse = await getBooks(params);
    if (!booksResponse) return;

    const books = booksResponse?.items;
    dispatch(setBooks(books));
  }

  return (
    <>
      {
        books?.length ? books.map((book, i) => {
          return <BookCard book={book} key={i}/>
        }) : 'FATALITY'
      }
    </>
  );
};

export default BookList;