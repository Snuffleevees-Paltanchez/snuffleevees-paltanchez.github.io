import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './querykeys'
import { useCategoriesRequests } from './apiCalls'

export type { Category } from './types'

/**
 * Hook to get the categories given a query
 * @param name The name of the category
 * @returns The categories
 */
export const usePaginatedCategoriesQuery = (name: string) => {
  const queryKey = queryKeys.search(name)
  const { categoriesQuery } = useCategoriesRequests()
  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => categoriesQuery({ name, page: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
  })
  return { ...query }
}
