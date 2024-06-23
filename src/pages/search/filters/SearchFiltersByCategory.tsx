import { useState, useRef } from 'react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import FiltersMenu from '@/components/FiltersMenu'
import { usePaginatedCategoriesQuery } from '@/hooks/queries/useCategories'
import { useContentIsVisible } from '@/hooks/useContentIsVisible'

export default function SearchFiltersPriceRange() {
  const { queryObject, updateParams } = useQueryParams()
  const [category, setCategory] = useState<string | undefined>(queryObject.category)
  const categoriesQuery = usePaginatedCategoriesQuery(category || '')

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  useContentIsVisible({
    ref: loadMoreRef,
    onIntersect: () => {
      if (categoriesQuery.hasNextPage && !categoriesQuery.isFetchingNextPage) {
        categoriesQuery.fetchNextPage()
      }
    },
  })

  const updateParamsWithCategory = () => {
    updateParams({
      paramsToAppend: {
        category,
      },
    })
  }

  const flatCategories = categoriesQuery.data?.pages.flatMap((page) => page.data) || []
  return (
    <div className="flex flex-row items-center gap-2">
      <FiltersMenu onApplyFilters={updateParamsWithCategory} title="Select a category">
        <Autocomplete
          label="Select a book category"
          className="max-w-xs"
          onInputChange={setCategory}
          isLoading={categoriesQuery.isLoading}
          defaultInputValue={category}
        >
          {flatCategories.map((category, i) => (
            <AutocompleteItem key={category.id} value={category.name} textValue={category.name}>
              <div>
                {category.name}
                {flatCategories.length - 1 === i && <div ref={loadMoreRef} />}
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FiltersMenu>
    </div>
  )
}
