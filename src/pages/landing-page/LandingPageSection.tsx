import { ScrollShadow } from '@nextui-org/react'
import BookCard from '@/components/BookCard'

export default function LandingPageSection({
  sectionTitle,
  books,
}: {
  sectionTitle: string
  books: { isbn: string; price: number }[]
}) {
  return (
    <div>
      <span className="text-xl font-semibold mb-2">{sectionTitle}</span>
      <ScrollShadow orientation="horizontal" className="max-w-[100vw]">
        <div className="flex flex-row gap-4 py-2">
          {books.map((book, i) => (
            <BookCard key={i} isbn={book.isbn} price={book.price} />
          ))}
        </div>
      </ScrollShadow>
    </div>
  )
}
