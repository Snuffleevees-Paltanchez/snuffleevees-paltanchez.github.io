export interface Author {
  id: number
  name: string
  isDeleted: boolean
}

export interface AuthorsResponse {
  page: number
  limit: number
  total: number
  hasNextPage: boolean
  data: Author[]
}
