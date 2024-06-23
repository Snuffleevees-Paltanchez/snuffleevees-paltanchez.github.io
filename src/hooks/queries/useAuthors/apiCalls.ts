import { useMikbooksClient } from '@/hooks/useClients'
import type { AuthorsResponse } from './types'

export const useAuthorsRequests = () => {
  const client = useMikbooksClient()

  /**
   * Get the authors from the API
   * @returns The authors
   */
  const authorsQuery = async ({ page, name }: { page?: number; name?: string }) => {
    return await client.get<AuthorsResponse>('/authors', {
      params: {
        page: page?.toString(),
        name,
      },
    })
  }
  return {
    authorsQuery,
  }
}
