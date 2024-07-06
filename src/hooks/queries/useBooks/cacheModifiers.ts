import { useQueryClient } from '@tanstack/react-query'
import { parsePrice } from './dataTransforms'
import { queryKeys } from './queryKeys'
import type { Book, PriceResponse } from './types'

export const useBooksByISBNCacheModifiers = (queryKey: ReturnType<typeof queryKeys.byISBN>) => {
  const queryClient = useQueryClient()
  const updateBookByISBNCache = (book: Book) => {
    queryClient.setQueryData(queryKey, book)
  }
  const updateIsDeletedBookByISBNCache = (isDeleted: boolean) => {
    queryClient.setQueryData(queryKey, (oldData: Book) => ({
      ...oldData,
      isDeleted,
    }))
  }

  const updatePriceFromBookByISBNCache = (price: PriceResponse) => {
    queryClient.setQueryData(queryKey, (oldData: Book) => ({
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
