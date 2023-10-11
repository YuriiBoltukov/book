import {BookQuery} from './book.functions';
import {CATEGORY_OPTIONS} from '../constants/filter.constants';
import {Pagination} from '../models/book.model';

export type QueryParams = Record<string, string | number | boolean>;

/** Makes query params from object */
export function makeQueryParamsString (queryParams: QueryParams): string {
  const query: string = Object.keys(queryParams)
    .map((key: string) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  return query;
}

export function makeQueryParamsForBooks(params: BookQuery, pagination: Pagination): QueryParams {
  let searchStr: string = params.searchStr;

  if (params.filters.category !== CATEGORY_OPTIONS[0]) {
    searchStr = `${searchStr}+subject:${params.filters.category}`
  }

  const requestData = {
    orderBy: params.sort,
    q: searchStr || 'a',
    maxResults: pagination.limit,
    startIndex: pagination.from,
  }

  return requestData;
}