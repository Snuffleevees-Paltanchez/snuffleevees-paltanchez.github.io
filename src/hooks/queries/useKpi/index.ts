import { useQuery } from '@tanstack/react-query'
import { queryKey } from './queryKey'
import { useKpiRequests } from './apiCalls'

export const useKpiQuery = () => {
  const { kpiQuery } = useKpiRequests()
  const query = useQuery({
    queryKey,
    queryFn: kpiQuery,
  })
  return query
}
