import { Pagination } from '@nextui-org/react'
import BookCard from '@/components/BookCard'
import SearchNoResults from './SearchNoResults'
import SearchFilters from './filters/SearchFilters'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockData = Array.from({ length: 10 }).map((_i) => ({
  isbn: '9781451673319',
  price: 10000,
}))

export default function Search() {
  const totalPages = 1
  if (!mockData.length) {
    return <SearchNoResults />
  }
  return (
    <div className="flex flex-col p-4 px-6 items-center w-full">
      <SearchFilters />
      <div className="flex flex-row flex-wrap my-2 gap-6 justify-center">
        {mockData.map((book, i) => (
          <BookCard key={i} isbn={book.isbn} price={book.price} />
        ))}
      </div>
      <Pagination className="my-4" showControls total={totalPages} isDisabled={totalPages < 2} />
    </div>
  )
}
