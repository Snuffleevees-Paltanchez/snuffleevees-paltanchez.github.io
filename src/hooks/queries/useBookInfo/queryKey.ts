export const useQueryKey = (isbn: string) => ['bookInfo', { isbn }] as const
