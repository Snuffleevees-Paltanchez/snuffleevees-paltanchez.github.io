import client from '@/api/client'

/**
 * Client to make requests to the book info API
 * @returns An object with methods to make requests
 */
export const useBookInfoClient = () => {
  const bookGeneralInfoApi = `${import.meta.env.VITE_BOOK_INFO_API_URL}/books/v1`
  return client(bookGeneralInfoApi)
}
