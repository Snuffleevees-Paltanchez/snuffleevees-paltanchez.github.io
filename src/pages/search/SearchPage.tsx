import { useState } from 'react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import { Pagination } from '@nextui-org/react'
import BookCard from '@/components/BookCard'
import SearchNoResults from './SearchNoResults'
import SearchFilters from './filters/SearchFilters'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function SearchPage() {
  const { queryObject, updateParams } = useQueryParams()
  const [currentPage, setCurrentPage] = useState(queryObject.page ? parseInt(queryObject.page) : 1)
  const booksQuery = useBooksQuery(queryObject)

  const totalPages = booksQuery.data?.totalPages || 1

  const onChangeOfPage = (page: number) => {
    updateParams({ paramsToAppend: { page: page.toString() } })
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col p-4 px-6 items-center w-full">
      <SearchFilters />
      {booksQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!booksQuery.data?.data.length ? (
            <SearchNoResults />
          ) : (
            <div className="flex flex-row flex-wrap my-2 gap-6 justify-center">
              {booksQuery.data?.data.map((book, i) => <BookCard key={i} book={book} />)}
            </div>
          )}
        </div>
      )}

      <Pagination
        className="my-4"
        showControls
        page={currentPage}
        total={totalPages}
        onChange={onChangeOfPage}
        isDisabled={totalPages < 2}
      />
    </div>
  )
}
