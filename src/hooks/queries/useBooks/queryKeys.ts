import type { BookQuery } from './types'

export const queryKeys = {
  all: ['books'] as const,
  search: (query: BookQuery) => [...queryKeys.all, query] as const,
  byISBN: (isbn: string) => [...queryKeys.all, { isbn }] as const,
}
