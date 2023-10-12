import React, {useState} from 'react';
import { Card } from 'antd';
import {Book} from '../../shared/models/book.model';
import style from './bookCard.module.scss'
import BookDetails from '../BookPage/BookPage';

type FCBook = { book: Book };

const BookCard: React.FC<FCBook> = ({book}: FCBook) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCardClick = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  return (
    <>
    <Card
      hoverable
      style={{ width: 180 }}
      className={style.card}
      cover={<img alt="example" src={book.volumeInfo?.imageLinks?.smallThumbnail} />}
      onClick={handleCardClick}
    >
      <Card.Meta title={book.volumeInfo.title} description={book.volumeInfo.authors ? book.volumeInfo.authors.join(' ') : ''} />
    </Card>
  {isDetailsOpen && <BookDetails book={book} setIsDetailsOpen={setIsDetailsOpen} isDetailsOpen={isDetailsOpen}/>}
    </>
  );
};

export default BookCard;