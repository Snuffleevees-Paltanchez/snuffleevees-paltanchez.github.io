import { useMikbooksClient } from '@/hooks/useClients'
import type { BookQuery, BooksResponse, BookResponse, PriceResponse } from './types'

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
    sortByRatingCount,
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
        sortByRatingCount: sortByRatingCount,
        sortByRating,
        page: page?.toString(),
        limit: limit?.toString(),
        isDeleted: `${isDeleted}`,
      },
    })
  }

  const bookByIdQuery = async (id: number) => {
    return await client.get<BookResponse>(`/books/id/${id}`)
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

  const deletePriceMutation = async (id: number) => {
    const response = await client.delete<{
      data: PriceResponse
    }>(`/prices/${id}`)
    return response.data
  }

  const restorePriceMutation = async (id: number) => {
    const response = await client.put<{
      data: PriceResponse
    }>(`/prices/restore/${id}`)
    return response.data
  }

  const updatePriceAmountMutation = async ({ id, price }: { id: number; price: number }) => {
    const response = await client.put<PriceResponse>(`/prices/${id}`, {
      price,
    })
    return response
  }

  return {
    booksQuery,
    bookByIdQuery,
    bookByISBNQuery,
    bookRecommendationsByISBNQuery,
    deleteBookMutation,
    restoreBookMutation,
    deletePriceMutation,
    restorePriceMutation,
    updatePriceAmountMutation,
  }
}
