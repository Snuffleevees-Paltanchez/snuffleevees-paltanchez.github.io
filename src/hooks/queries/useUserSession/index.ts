import { useQuery } from '@tanstack/react-query'
import { queryKey } from './queryKey'
import { useUserSessionRequests } from './apiCalls'

export const useUserSessionQuery = () => {
  const { userSessionQuery } = useUserSessionRequests()
  const query = useQuery({
    queryKey,
    queryFn: userSessionQuery,
  })
  return query
}
