import BookCard from '@/components/BookCard'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SidebarRecommendations({ genre }: { genre: string }) {
  // genre should be used to fetch recommendations

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockRecommendations = Array.from({ length: 3 }).map((_i) => ({
    isbn: '9781451673319',
    price: 10000,
  }))
  return (
    <div className="z-10 h-full min-w-fit bg-gray-200 float-left flex flex-col gap-4 py-5 px-5">
      {mockRecommendations.map((book, i) => (
        <BookCard key={i} isbn={book.isbn} price={book.price} />
      ))}
    </div>
  )
}
