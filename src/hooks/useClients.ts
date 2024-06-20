import client from '@/api/client'

/**
 * Client to make requests to the book info API
 * @returns An object with methods to make requests
 */
export const useBookInfoClient = () => {
  const bookGeneralInfoApi = `${import.meta.env.VITE_BOOK_INFO_API_URL}/books/v1`
  return client(bookGeneralInfoApi)
}

/**
 * Client to make requests to the MikBooks API
 * @returns An object with methods to make requests
 */
export const useMikbooksClient = () => {
  const mikBooksApi = `${import.meta.env.VITE_MIKBOOKS_API_URL}`
  return client(mikBooksApi)
}
