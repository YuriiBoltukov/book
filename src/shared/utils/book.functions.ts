import { getBooks } from "../../api";
import { Book, CommonQuery, Pagination } from "../models/book.model";

export interface BookQuery extends CommonQuery {}

/**
 * Loads a list of books based on the provided query parameters and pagination.
 */
export async function loadBooks(
  params: BookQuery,
  pagination: Pagination,
): Promise<{ books: Book[]; pagination: Partial<Pagination> }> {
  try {
    const booksResponse = await getBooks(params, pagination);

    if (!booksResponse) {
      return { books: [], pagination };
    }

    const books = booksResponse?.items;
    const newPagination = {
      from: pagination.from + pagination.limit,
      total: booksResponse.totalItems,
    };

    return { books: books, pagination: newPagination };
  } catch (error) {
    console.error("Error loading books:", error);
    return { books: [], pagination };
  }
}
