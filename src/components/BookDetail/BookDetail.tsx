import React from "react";
import style from "./bookDetail.module.scss";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BooksReducer } from "../../store/store";

const BookDetails = () => {
  const { id } = useParams();
  const book = useSelector((state: BooksReducer) =>
    state.booksReducer.books.find((book) => {
      return book.id === id;
    }),
  );

  return (
    <div className={style.details}>
      {book ? (
        <div>
          <div className={style.details_image}>
            <img
              src={
                book.volumeInfo.imageLinks.thumbnail ||
                require("../../assets/images/book.jpg")
              }
              alt="book"
            />
          </div>
          <div className={style.details_info}>
            <h2 className={style.details_info_title}>
              {book.volumeInfo.title || ""}
            </h2>
            <p className={style.details_info_category}>
              <strong>Категория:</strong>{" "}
              {book.volumeInfo.categories?.join(", ")}
            </p>
            <p className={style.details_info_author}>
              <strong>Автор(ы):</strong>{" "}
              {book.volumeInfo.authors?.join(", ") || " "}
            </p>
            <p className={style.details_info_description}>
              <strong>Описание:</strong> {book.volumeInfo.description || " "}
            </p>
          </div>
        </div>
      ) : (
        "nothing"
      )}

      <Link to="/">close</Link>
    </div>
  );
};

export default BookDetails;
