import {BASE_GOOGLE_BOOKS_URL, GOOGLE_BOOKS_API_KEY} from './shared/constants/api.constants';
import {makeQueryParamsForBooks, makeQueryParamsString, QueryParams} from './shared/utils/api.functions';
import {BookResponse} from './shared/models/api.model';
import {BookQuery} from './shared/utils/book.functions';
import {Pagination} from './shared/models/book.model';

/** MOCK */
export const params = {
  q: "javascript",
  maxResults: 10
};

export async function getBooks(params: BookQuery, pagination: Pagination): Promise<BookResponse | null> {
  const query: QueryParams = makeQueryParamsForBooks(params, pagination);
  const queryParams = makeQueryParamsString(query);
  const apiUrl = `${BASE_GOOGLE_BOOKS_URL}/volumes?key=${GOOGLE_BOOKS_API_KEY}&${queryParams}`;
  let result: BookResponse | null = null;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      result = await response.json() as BookResponse;
      if (!result?.items) result.items = [];
    }
  } catch (error) {
    console.error('Произошла ошибка при получении книг:', error);
  } finally {
    return result;
  }
}