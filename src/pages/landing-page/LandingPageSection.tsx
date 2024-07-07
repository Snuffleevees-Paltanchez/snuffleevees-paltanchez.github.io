import { ScrollShadow } from '@nextui-org/react'
import BookCard from '@/components/BookCard'
import { type Book } from '@/hooks/queries/useBooks'

export default function LandingPageSection({
  sectionTitle,
  books,
  dataTestId,
}: {
  sectionTitle: string
  books: Book[]
  dataTestId: string
}) {
  return (
    <div className="m-4">
      <span className="text-xl font-semibold">{sectionTitle}</span>
      <ScrollShadow orientation="horizontal" className="max-w-[100vw] mt-4">
        <div className="flex flex-row gap-4 py-2" data-test-id={dataTestId}>
          {books.map((book, i) => (
            <BookCard
              key={i}
              book={book}
              customClasses={'min-w-[450px] max-w-[450px] max-h-[280px]'}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  )
}
