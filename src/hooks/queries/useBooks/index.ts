import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { useBooksRequests } from './apiCalls'
import { BookQuery } from './types'

export type { Book, BookQuery } from './types'

/**
 * Hook to get the books given a query
 * @param queryParams The query parameters
 * @returns The books
 */
export const useBooksQuery = (queryParams: Omit<BookQuery, 'page' | 'limit'>) => {
  const queryKey = queryKeys.search(queryParams)
  const { booksQuery } = useBooksRequests()
  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => booksQuery({ ...queryParams, page: pageParam }),
    getNextPageParam: (lastPage, pages) => (lastPage.data.length ? pages.length + 1 : undefined),
  })
  return { ...query }
}

/**
 * Hook to get the book info and prices given an ISBN
 * @param isbn The ISBN of the book. It is an identifier for books.
 * @returns The book info and prices
 */
export const useBookByISBNQuery = (isbn: string) => {
  const queryKey = queryKeys.byISBN(isbn)
  const { bookByISBNQuery } = useBooksRequests()
  const query = useQuery({
    queryKey,
    queryFn: () => bookByISBNQuery(isbn),
  })
  return { ...query }
}
