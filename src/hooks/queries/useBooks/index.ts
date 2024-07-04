import { useQuery, useMutation } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { useBooksRequests } from './apiCalls'
import { BookQuery } from './types'
import { useBooksTransforms } from './dataTransforms'
import { useBooksByISBNCacheModifiers } from './cacheModifiers'

export type { Book, BookQuery, Price } from './types'

/**
 * Hook to get the books given a query
 * @param queryParams The query parameters
 * @returns The books
 */
export const useBooksQuery = (queryParams: BookQuery) => {
  const queryKey = queryKeys.search(queryParams)
  const { mapBooks } = useBooksTransforms()
  const { booksQuery } = useBooksRequests()
  const query = useQuery({
    queryKey,
    queryFn: () => booksQuery({ page: 1, ...queryParams }).then(mapBooks),
  })
  return query
}

/**
 * Hook to get the book info and prices given an ISBN
 * @param isbn The ISBN of the book. It is an identifier for books.
 * @returns The book info and prices
 */
export const useBookByISBNQuery = (isbn: string) => {
  const queryKey = queryKeys.byISBN(isbn)
  const { mapBook } = useBooksTransforms()
  const { bookByISBNQuery } = useBooksRequests()
  const query = useQuery({
    queryKey,
    queryFn: () => bookByISBNQuery(isbn).then(mapBook),
  })
  return query
}

export const useBookByIdQuery = (id: number) => {
  const queryKey = queryKeys.byId(id)
  const { mapBook } = useBooksTransforms()
  const { bookByIdQuery } = useBooksRequests()
  const query = useQuery({
    queryKey,
    queryFn: () => bookByIdQuery(id).then(mapBook),
  })
  return query
}

export const useBookRecommendationsByISBNQuery = (isbn: string) => {
  const queryKey = queryKeys.recommendations(isbn)
  const { mapBook } = useBooksTransforms()
  const { bookRecommendationsByISBNQuery } = useBooksRequests()
  const query = useQuery({
    queryKey,
    queryFn: () => bookRecommendationsByISBNQuery(isbn).then((books) => books.map(mapBook)),
  })
  return query
}

export const useBookByISBNMutations = (isbn: string) => {
  const queryKey = queryKeys.byISBN(isbn)
  const { updateIsDeletedBookByISBNCache, updatePriceFromBookByISBNCache } =
    useBooksByISBNCacheModifiers(queryKey)
  const {
    deleteBookMutation: deleteBookMutationRequest,
    restoreBookMutation: restoreBookMutationRequest,
    deletePriceMutation: deletePriceMutationRequest,
    restorePriceMutation: restorePriceMutationRequest,
  } = useBooksRequests()

  const deleteBookMutation = useMutation({
    mutationFn: (id: number) => deleteBookMutationRequest(id),
    onSuccess: (book) => {
      updateIsDeletedBookByISBNCache(book.isDeleted)
    },
  })

  const restoreBookMutation = useMutation({
    mutationFn: (id: number) => restoreBookMutationRequest(id),
    onSuccess: (book) => {
      updateIsDeletedBookByISBNCache(book.isDeleted)
    },
  })

  const deletePriceMutation = useMutation({
    mutationFn: (priceId: number) => deletePriceMutationRequest(priceId),
    onSuccess: (price) => {
      updatePriceFromBookByISBNCache(price)
    },
  })

  const restorePriceMutation = useMutation({
    mutationFn: (priceId: number) => restorePriceMutationRequest(priceId),
    onSuccess: (price) => {
      updatePriceFromBookByISBNCache(price)
    },
  })

  return { deleteBookMutation, restoreBookMutation, deletePriceMutation, restorePriceMutation }
}
