import React from "react";
import style from "./header.module.scss";
import SearchFilterSortBar from "../SearchFilterSortBar/SearchFilterSortBar";

const Header = () => {
  return (
    <div className={style.header}>
      <h1 className={style.header_title}>Search for books</h1>
      <SearchFilterSortBar />
    </div>
  );
};

export default Header;
