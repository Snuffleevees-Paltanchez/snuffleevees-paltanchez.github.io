import SearchFiltersPriceRange from './SearchFiltersPriceRange'
// import SearchFiltersSortBy from './SearchFiltersSortBy'
import SearchFiltersItemsByPage from './SearchFiltersItemsPerPage'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchFilters() {
  const { queryObject } = useQueryParams()
  return (
    <div className="flex flex-col my-4 w-full">
      <span className="text-xl font-semibold mb-4">Search results for "{queryObject.title}"</span>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-4">
          {/* <SearchFiltersSortBy /> */}
          <SearchFiltersPriceRange />
        </div>
        <SearchFiltersItemsByPage />
      </div>
    </div>
  )
}
