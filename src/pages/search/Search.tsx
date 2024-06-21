import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import { Pagination } from '@nextui-org/react'
import BookCard from '@/components/BookCard'
import SearchNoResults from './SearchNoResults'
import SearchFilters from './filters/SearchFilters'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const GetQueryObject = (query: URLSearchParams) => {
  const queryParams = {
    title: query.get('title'),
    authorId: query.get('authorId'),
    authorName: query.get('authorName'),
    isbn: query.get('isbn'),
    category: query.get('category'),
    minPrice: query.get('minPrice'),
    maxPrice: query.get('maxPrice'),
  }
  // reduce the object to remove the undefined values
  return Object.keys(queryParams).reduce((acc, key) => {
    // @ts-expect-error - TODO: make it more general in a utils.ts
    if (queryParams[key]) {
      // @ts-expect-error - TODO: make it more general in a utils.ts
      acc[key] = queryParams[key]
    }
    return acc
  }, {})
}

export default function Search() {
  const query = useQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const queryParams = GetQueryObject(query)
  const booksQuery = useBooksQuery(queryParams)

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

  if (booksQuery.isLoading) {
    return <div> Loading... </div>
  }

  if (!booksQuery.data?.pages.length) {
    return <SearchNoResults />
  }

  return (
    <div className="flex flex-col p-4 px-6 items-center w-full">
      <SearchFilters />
      <div className="flex flex-row flex-wrap my-2 gap-6 justify-center">
        {booksQuery.data?.pages[currentPage - 1]?.data.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
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
