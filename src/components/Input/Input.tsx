import React, {useState} from 'react';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import {useDispatch, useSelector} from 'react-redux';
import {
  BooksState,
  resetPagination,
  setBooks,
  setFilters,
  setPagination,
  setSearchStr,
  setSort,
} from '../../store/slices/booksSlice';
import {BookQuery, loadBooks} from '../../shared/utils/book.functions';
import {SORT_OPTIONS} from '../../shared/constants/sort.constants';
import {CATEGORY_OPTIONS} from '../../shared/constants/filter.constants';

const Input: React.FC = () => {

  const dispatch = useDispatch();
  const state = useSelector((state: { books: BooksState }) => state.books);
  const from = useSelector((state: { books: BooksState }) => state.books.pagination.from);
  const [form, setForm] = useState({
    q: '',
    category: '',
    orderBy: '',
  });

  /** handlse write down event in input */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setForm({...form, q: event.target.value})
    dispatch(setSearchStr(event.target.value))
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  /** handles select category event */
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: event.target.value });
    dispatch(setFilters({category: event.target.value}))
  };

  /** handles select sort event */
  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, orderBy: event.target.value });
    dispatch(setSort(event.target.value))
  };

  /** sends request */
  async function handleSubmit (event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    const queryData: BookQuery = {
      searchStr: state.searchStr,
      filters: {
        category: state.filters.category,
      },
      sort: state.sort
    }
    console.log(from)
    dispatch(resetPagination())
    console.log(from)
    const {books, pagination} = await loadBooks(queryData, {...state.pagination, from});
    dispatch(setBooks(books));
    dispatch(setPagination(pagination));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={form.q}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder='Введите текст'
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
      <button type='submit'>Отправить</button>
    </form>
  );
};

export default Input;