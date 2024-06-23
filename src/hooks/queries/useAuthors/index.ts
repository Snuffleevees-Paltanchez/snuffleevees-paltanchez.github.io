import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './querykeys'
import { useAuthorsRequests } from './apiCalls'
import { useAuthorsTransforms } from './dataTransforms'

export type { Author } from './types'

/**
 * Hook to get the authors given a query
 * @param name The name of the category
 * @returns The authors
 */
export const usePaginatedAuthorsQuery = (name: string) => {
  const queryKey = queryKeys.search(name)
  const { mapAuthors } = useAuthorsTransforms()
  const { authorsQuery } = useAuthorsRequests()
  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => authorsQuery({ name, page: pageParam }).then(mapAuthors),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
  })
  return { ...query }
}
