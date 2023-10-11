import {Book} from './book.model';

/** book response */
export interface BookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}
