export interface Category {
  id: number
  name: string
  isDeleted: boolean
}

export interface CategoriesResponse {
  page: number
  limit: number
  total: number
  hasNextPage: boolean
  data: Category[]
}
