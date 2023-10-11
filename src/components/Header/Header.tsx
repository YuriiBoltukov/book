import React from "react";
import style from './header.module.scss'
import {getBooks} from '../../api';
import Input from '../Input/Input';


const Header = () => {
  return (
    <div className={style.header}>
      <h1 className={style.header_title}>Search for books</h1>
      <Input />
    </div>
  );
};

export default Header;