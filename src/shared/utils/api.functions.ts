export type QueryParams = Record<string, string | number | boolean>;

/** Makes query params from object */
export function makeQueryParams (queryParams: QueryParams): string {
  const query: string = Object.keys(queryParams)
    .map((key: string) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  return query;
}