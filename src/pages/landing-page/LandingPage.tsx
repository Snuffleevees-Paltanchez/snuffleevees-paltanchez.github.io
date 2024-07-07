import LandingPageSection from './LandingPageSection'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LandingPage() {
  const booksQuery = useBooksQuery({})
  const sortedBooksQuery = useBooksQuery({ sortByRatingCount: 'desc' })
  const books = booksQuery.data?.data || []
  const sortedBooks = sortedBooksQuery.data?.data || []
  if (booksQuery.isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-col m-2 my-4 gap-6" data-test-id="landing-page">
      <LandingPageSection
        sectionTitle="Recently added"
        books={books}
        dataTestId="recently-added-section"
      />
      <LandingPageSection
        sectionTitle="Most popular"
        books={sortedBooks}
        dataTestId="most-popular-section"
      />
    </div>
  )
}
