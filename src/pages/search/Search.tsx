import { useState } from 'react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import { Pagination } from '@nextui-org/react'
import BookCard from '@/components/BookCard'
import SearchNoResults from './SearchNoResults'
import SearchFilters from './filters/SearchFilters'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Search() {
  const { queryObject } = useQueryParams()
  const [currentPage, setCurrentPage] = useState(1)
  const booksQuery = useBooksQuery(queryObject)

  const totalPages = booksQuery.data?.pages[0].totalPages || 1

  const onChangeOfPage = (page: number) => {
    if (page < currentPage) {
      setCurrentPage(page)
      booksQuery.fetchPreviousPage()
    } else {
      setCurrentPage(page)
      booksQuery.fetchNextPage()
    }
  }

  return (
    <div className="flex flex-col p-4 px-6 items-center w-full">
      <SearchFilters />
      {booksQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!booksQuery.data?.pages.length ? (
            <SearchNoResults />
          ) : (
            <div className="flex flex-row flex-wrap my-2 gap-6 justify-center">
              {booksQuery.data?.pages[currentPage - 1]?.data.map((book, i) => (
                <BookCard key={i} book={book} />
              ))}
            </div>
          )}
        </div>
      )}

      <Pagination
        className="my-4"
        showControls
        total={totalPages}
        onChange={onChangeOfPage}
        isDisabled={totalPages < 2}
      />
    </div>
  )
}
