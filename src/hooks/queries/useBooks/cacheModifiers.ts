import { useQueryClient } from '@tanstack/react-query'
import { parsePrice } from './dataTransforms'
import { queryKeys } from './queryKeys'
import type { Book, PriceResponse } from './types'

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

  const updatePriceFromBookByISBNCache = (isbn: string, price: PriceResponse) => {
    queryClient.setQueryData(queryKeys.byISBN(isbn), (oldData: Book) => ({
      ...oldData,
      prices: oldData.prices.map((oldPrice) => {
        if (oldPrice.id === price.id) {
          return {
            ...price,
            price: parsePrice(price.price),
          }
        }
        return oldPrice
      }),
    }))
  }

  return {
    updateBookByISBNCache,
    updateIsDeletedBookByISBNCache,
    updatePriceFromBookByISBNCache,
  }
}
