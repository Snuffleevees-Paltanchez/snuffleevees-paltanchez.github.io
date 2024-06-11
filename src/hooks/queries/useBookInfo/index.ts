import { useQuery } from '@tanstack/react-query'
import { useQueryKey } from './queryKey'
import { useBookInfoRequests } from './apiCalls'
import { useBookInfoTransforms } from './dataTransforms'

export type { BookInfo } from './types'

/**
 * Hook to get the book info given an ISBN
 * @param isbn The ISBN of the book. It is an identifier for books.
 * @returns The book info
 */
export const useBookInfoQuery = (isbn: string) => {
  const { mapBookInfo } = useBookInfoTransforms()
  const queryKey = useQueryKey(isbn)
  const { bookInfoQuery } = useBookInfoRequests(isbn)
  const query = useQuery({ queryKey, queryFn: () => bookInfoQuery().then(mapBookInfo) })
  return { ...query }
}
