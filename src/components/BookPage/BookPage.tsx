import React, { useEffect } from "react";
import style from "./bookpage.module.scss";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BooksState } from "../../store/slices/booksSlice";
const BookDetails = () => {
  const { id } = useParams();
  const book = useSelector((state: { books: BooksState }) =>
    state.books.books.find((book) => {
      return book.id === id;
    }),
  );
  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className={style.details}>
      {book ? (
        <div>
          <div className={style.details_image}>
            <img
              src={
                book.volumeInfo.imageLinks.thumbnail ||
                "http://placehold.it/150x150/"
              }
              alt={`Cover`}
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
