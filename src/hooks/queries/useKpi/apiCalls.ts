import { useMikbooksClient } from '@/hooks/useClients'

type KpiResponse = {
  totalBooks: number
  totalBooksMarkedAsDeleted: number
  totalPrices: number
  totalPricesMarkedAsDeleted: number
  totalAuthors: number
  totalCategories: number
}

export const useKpiRequests = () => {
  const client = useMikbooksClient()

  const kpiQuery = async () => {
    const response = await client.get<KpiResponse>('/books/kpi')
    return response
  }

  return {
    kpiQuery,
  }
}
