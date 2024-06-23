export interface Author {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}

export interface PriceResponse {
  id: number
  bookId: number
  platformId: number
  price: number
  date: string
  productUrl: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}

export interface BookResponse {
  id: number
  title: string
  authorId: number
  isbn: string
  publicationDate: string | null
  description: string | null
  imgUrl: string | null
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  categories: string[]
  author: Author
  prices: PriceResponse[]
}

export interface BooksResponse {
  total: number
  page: number
  limit: number
  hasNextPage: boolean
  data: BookResponse[]
}

export interface Price extends Omit<PriceResponse, 'price'> {
  price: string
}

export interface Book extends Omit<BookResponse, 'prices'> {
  bestPrice: string
  prices: Price[]
}

export interface BookQuery {
  isbn?: string
  title?: string
  authorId?: string
  authorName?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  limit?: number
  page?: number
}
