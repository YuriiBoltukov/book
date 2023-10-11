import React from "react";
import { Card } from 'antd';
import {Book} from '../../shared/models/book.model';

type FCBook = { book: Book };

const BookCard: React.FC<FCBook> = ({book}: FCBook) => {
  return (
    <Card
      hoverable
      style={{ width: 80 }}
      cover={<img alt="example" src={book.volumeInfo.imageLinks.smallThumbnail} />}
    >
      <Card.Meta title={book.volumeInfo.title} description={book.volumeInfo.authors ? book.volumeInfo.authors.join(' ') : ''} />
    </Card>
  );
};

export default BookCard;