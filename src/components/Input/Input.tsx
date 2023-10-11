import React, {useState} from 'react';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import {useDispatch, useSelector} from 'react-redux';
import {searchQuery, SearchState} from '../../store/slices/searchSlice';

const Input: React.FC = () => {

  const dispatch = useDispatch();
  const query = useSelector((state: { search: SearchState }) => state.search.searchStr);
  const [form, setForm] = useState({
    q: '',
    category: '',
    orderBy: '',
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setForm({...form, q: event.target.value})
    dispatch(searchQuery(event.target.value))
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: event.target.value });
  };

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, orderBy: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  const categoryOptions: string[] = ['all', 'ART', 'BIOGRAPHY', 'BUSINESS', 'COMICS', 'COMPUTERS', 'COOKING', 'FICTION', 'GARDENING', 'HEALTH & FITNESS', 'HISTORY', 'MEDICAL', 'NATURE', 'POETRY', 'SCIENCE'];
  const sortOptions: string[] = ['relevance', 'newest'];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={form.q}
        onChange={handleInputChange}
        placeholder='Введите текст'
      />
      <div>
      <DropdownSelect
        value={form.category}
        options={categoryOptions}
        onChange={handleCategoryChange}
      />

      <DropdownSelect
        value={form.orderBy}
        options={sortOptions}
        onChange={handleSortOptionChange}
      />
      </div>
      <button type='submit'>Отправить</button>
    </form>
  );
};

export default Input;