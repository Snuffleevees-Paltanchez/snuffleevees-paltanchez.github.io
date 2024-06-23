export const queryKeys = {
  all: ['categories'] as const,
  search: (text: string) => [...queryKeys.all, text] as const,
}
