import React from "react";
import { Card } from "antd";
import { Book } from "../../shared/models/book.model";
import style from "./bookCard.module.scss";

import { Link } from "react-router-dom";

type FCBook = { book: Book };

const BookCard: React.FC<FCBook> = ({ book }: FCBook) => {
  return (
    <>
      <Card
        hoverable
        style={{ width: 180 }}
        className={style.card}
        cover={
          <img
            alt="example"
            src={book.volumeInfo?.imageLinks?.smallThumbnail}
          />
        }
      >
        <Card.Meta
          title={book.volumeInfo.title}
          description={
            book.volumeInfo.authors ? book.volumeInfo.authors.join(" ") : ""
          }
        />
        <Link to={"/detail/" + book.id}>Detail</Link>
      </Card>
    </>
  );
};

export default BookCard;
