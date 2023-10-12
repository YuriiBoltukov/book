import React from "react";
import style from './bookpage.module.scss'
const BookDetails = ({book, setIsDetailsOpen}:any ) => {
  const info = book.volumeInfo
  function handleClick(){
    setIsDetailsOpen(false)
  }
  return (
    <div className={style.details}>
      <div className={style.details_image}>
        <img
          src={info.imageLinks.thumbnail || 'http://placehold.it/150x150/'}
          alt={`Cover`}
        />
      </div>
      <div className={style.details_info}>
        <h2 className={style.details_info_title}>{info.title || ''}</h2>
        <p className={style.details_info_category}>
          <strong>Категория:</strong> {info.categories?.join(", ")}
        </p>
        <p className={style.details_info_author}>
          <strong>Автор(ы):</strong>{" "}
          {info.authors?.join(", ") || " "}
        </p>
        <p className={style.details_info_language}>
          <strong>Язык:</strong> {info.language || " "}
        </p>
        <p className={style.details_info_description}>
          <strong>Описание:</strong> {book.volumeInfo.description || " "}
        </p>
      </div>
      <button onClick={handleClick}>close</button>
    </div>
  );
};

export default BookDetails;