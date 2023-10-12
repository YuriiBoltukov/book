import React from "react";
import BookList from "../components/BookList/BookList";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../components/BookDetail/BookDetail";

const MainPage: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/detail/:id" element={<BookDetails />} />
      </Routes>
    </>
  );
};

export default MainPage;
