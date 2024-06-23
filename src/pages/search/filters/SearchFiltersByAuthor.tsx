import { useState } from 'react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import FiltersMenu from '@/components/FiltersMenu'
import { usePaginatedAuthorsQuery } from '@/hooks/queries/useAuthors'
import { useContentIsVisible } from '@/hooks/useContentIsVisible'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function SearchFiltersByAuthor() {
  const { queryObject, updateParams } = useQueryParams()
  const [author, setAuthor] = useState<string | undefined>(queryObject.authorName)
  const [loadMoreRef, setLoadMoreRef] = useState<HTMLDivElement | null>(null)
  const authorsQuery = usePaginatedAuthorsQuery(author || '')

  useContentIsVisible({
    ref: { current: loadMoreRef },
    onIntersect: () => {
      if (authorsQuery.hasNextPage && !authorsQuery.isFetchingNextPage) {
        authorsQuery.fetchNextPage()
      }
    },
  })

  const updateParamsWithAuthor = () => {
    updateParams({
      paramsToAppend: {
        authorName: author,
      },
    })
  }
  const flatAuthors = authorsQuery.data?.pages.flatMap((page) => page.data) || []

  return (
    <div className="flex flex-row items-center gap-2">
      <FiltersMenu onApplyFilters={updateParamsWithAuthor} title="Select an author">
        <Autocomplete
          label="Select an author"
          className="max-w-xs"
          onInputChange={setAuthor}
          isLoading={authorsQuery.isLoading}
          defaultInputValue={author}
        >
          {flatAuthors.map((author, i) => (
            <AutocompleteItem key={author.id} value={author.name} textValue={author.name}>
              <div>
                {author.name}
                {flatAuthors.length - 1 === i && authorsQuery.hasNextPage && (
                  <div ref={setLoadMoreRef}>
                    <LoadingSpinner size={16} className="my-2" color="slate-500" />
                  </div>
                )}
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FiltersMenu>
    </div>
  )
}
