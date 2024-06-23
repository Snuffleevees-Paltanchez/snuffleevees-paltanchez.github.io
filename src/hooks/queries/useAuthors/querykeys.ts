export const queryKeys = {
  all: ['authors'] as const,
  search: (text: string) => [...queryKeys.all, text] as const,
}
