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
    minRatingAvg,
    maxRatingAvg,
    ratingCount,
    sortByRating,
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
        minRatingAvg: minRatingAvg?.toString(),
        maxRatingAvg: maxRatingAvg?.toString(),
        ratingCount: ratingCount?.toString(),
        sortByRating,
        page: page?.toString(),
        limit: limit?.toString(),
      },
    })
  }

  const bookByISBNQuery = async (isbn: string) => {
    return await client.get<BookResponse>(`/books/isbn/${isbn}`)
  }

  const bookRecommendationsByISBNQuery = async (isbn: string) => {
    return await client.get<BookResponse[]>(`/books/recommendations/${isbn}`)
  }

  return {
    booksQuery,
    bookByISBNQuery,
    bookRecommendationsByISBNQuery,
  }
}
