import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import type { Book } from './types'

export const useBooksCacheModifiers = () => {
  const queryClient = useQueryClient()
  const updateBookByISBNCache = (isbn: string, book: Book) => {
    queryClient.setQueryData(queryKeys.byISBN(isbn), book)
  }
  const updateIsDeletedBookByISBNCache = (isbn: string, isDeleted: boolean) => {
    queryClient.setQueryData(queryKeys.byISBN(isbn), (oldData: Book) => ({
      ...oldData,
      isDeleted,
    }))
  }

  return {
    updateBookByISBNCache,
    updateIsDeletedBookByISBNCache,
  }
}
