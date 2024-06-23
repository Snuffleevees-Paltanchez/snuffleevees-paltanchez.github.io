import { useMikbooksClient } from '@/hooks/useClients'
import type { CategoriesResponse } from './types'

export const useCategoriesRequests = () => {
  const client = useMikbooksClient()

  /**
   * Get the categories from the API
   * @returns The categories
   */
  const categoriesQuery = async ({ page, name }: { page?: number; name?: string }) => {
    return await client.get<CategoriesResponse>('/categories', {
      params: {
        page: page?.toString(),
        name,
      },
    })
  }
  return {
    categoriesQuery,
  }
}
