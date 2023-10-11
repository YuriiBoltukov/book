import {BASE_GOOGLE_BOOKS_URL, GOOGLE_BOOKS_API_KEY} from './shared/constants/api.constants';
import {makeQueryParams, QueryParams} from './shared/utils/api.functions';
import {BookResponse} from './shared/models/api.model';

/** MOCK */
export const params = {
  q: "javascript",
  maxResults: 10
};

export async function getBooks(params: QueryParams): Promise<BookResponse | null> {
  const queryParams = makeQueryParams(params);
  const apiUrl = `${BASE_GOOGLE_BOOKS_URL}/volumes?key=${GOOGLE_BOOKS_API_KEY}&${queryParams}`;
  let result: BookResponse | null = null;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      result = await response.json();
    }
  } catch (error) {
    console.error('Произошла ошибка при получении книг:', error);
  } finally {
    return result;
  }
}