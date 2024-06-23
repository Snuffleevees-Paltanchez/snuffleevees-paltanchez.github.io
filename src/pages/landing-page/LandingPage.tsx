import LandingPageSection from './LandingPageSection'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LandingPage() {
  const booksQuery = useBooksQuery({})
  const books = booksQuery.data?.data || []
  if (booksQuery.isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-col m-2 my-4 gap-6">
      <LandingPageSection sectionTitle="Recently added" books={books} />
      <LandingPageSection sectionTitle="Most popular" books={books} />
    </div>
  )
}
