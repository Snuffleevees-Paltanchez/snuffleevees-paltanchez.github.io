import { useMikbooksClient } from '@/hooks/useClients'
import type { BookQuery, Book } from './types'

type BooksResponse = {
  total: number
  page: number
  limit: number
  data: Book[]
}

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
      },
    })
  }

  const bookByISBNQuery = async (isbn: string) => {
    return await client.get<Book>(`/books/isbn/${isbn}`)
  }

  return {
    booksQuery,
    bookByISBNQuery,
  }
}
