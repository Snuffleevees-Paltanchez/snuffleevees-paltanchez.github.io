import { useBookInfoClient } from '@/hooks/useClients'
import type { BooksResponse } from './types'

export const useBookInfoRequests = (isbn: string) => {
  const client = useBookInfoClient()

  /**
   * Get the book info from the API
   * @returns The book info
   */
  const bookInfoQuery = async () => {
    return await client.get<BooksResponse>(`/volumes?q=isbn:${isbn}`)
  }

  return {
    bookInfoQuery,
  }
}
