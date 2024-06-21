import { useMikbooksClient } from '@/hooks/useClients'
import type { BookQuery, BooksResponse, BookResponse } from './types'

export const useBooksRequests = () => {
  const client = useMikbooksClient()

  /**
   * Get the book info from the API
   * @returns The book info
   */
  const booksQuery = async ({
    title,
    authorId,
    authorName,
    isbn,
    category,
    minPrice,
    maxPrice,
    page,
    limit,
  }: BookQuery) => {
    return await client.get<BooksResponse>('/books', {
      params: {
        title,
        authorId,
        authorName,
        isbn,
        category,
        minPrice,
        maxPrice,
        page: page?.toString(),
        limit: limit?.toString(),
      },
    })
  }

  const bookByISBNQuery = async (isbn: string) => {
    return await client.get<BookResponse>(`/books/isbn/${isbn}`)
  }

  return {
    booksQuery,
    bookByISBNQuery,
  }
}
