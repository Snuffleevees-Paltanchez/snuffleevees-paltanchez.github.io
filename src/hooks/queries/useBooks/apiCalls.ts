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
    isDeleted,
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
        isDeleted: `${isDeleted}`,
      },
    })
  }

  const bookByISBNQuery = async (isbn: string) => {
    return await client.get<BookResponse>(`/books/isbn/${isbn}`)
  }

  const bookRecommendationsByISBNQuery = async (isbn: string) => {
    return await client.get<BookResponse[]>(`/books/recommendations/${isbn}`)
  }

  const deleteBookMutation = async (id: number) => {
    const response = await client.delete<{
      data: BookResponse
    }>(`/books/${id}`)
    return response.data
  }

  const restoreBookMutation = async (id: number) => {
    const response = await client.put<{
      data: BookResponse
    }>(`/books/restore/${id}`)
    return response.data
  }

  return {
    booksQuery,
    bookByISBNQuery,
    bookRecommendationsByISBNQuery,
    deleteBookMutation,
    restoreBookMutation,
  }
}
