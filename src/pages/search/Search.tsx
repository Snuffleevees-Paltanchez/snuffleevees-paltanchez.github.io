import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useBooksQuery, type BookQuery } from '@/hooks/queries/useBooks'
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
    if (queryParams[key]) {
      acc[key] = queryParams[key]
    }
    return acc
  }, {} as BookQuery)
}

export default function Search() {
  const query = useQuery()
  const [previousPage, setPreviousPage] = useState(1)
  const queryParams = GetQueryObject(query)
  const booksQuery = useBooksQuery(queryParams)

  useEffect(() => {
    console.log(booksQuery.data)
  }, [booksQuery.data])

  const totalPages = booksQuery.data?.pages.length || 1

  const onChangeOfPage = (page: number) => {
    if (page < previousPage) {
      setPreviousPage(page)
      booksQuery.fetchPreviousPage()
    } else {
      setPreviousPage(page)
      booksQuery.fetchNextPage()
    }
  }

  if (!booksQuery.data?.pages.length) {
    return <SearchNoResults />
  }
  return (
    <div className="flex flex-col p-4 px-6 items-center w-full">
      <SearchFilters />
      <div className="flex flex-row flex-wrap my-2 gap-6 justify-center">
        {booksQuery.data?.pages.map((page, i) =>
          page.data.map((book, j) => (
            <BookCard key={i + j} isbn={book.isbn} price={book.prices[0].price} />
          )),
        )}
        {/* {booksQuery.map((book, i) => (
          <BookCard key={i} isbn={book.isbn} price={book.price} />
        ))} */}
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
