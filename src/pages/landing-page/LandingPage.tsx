import LandingPageSection from './LandingPageSection'
import { useBooksQuery } from '@/hooks/queries/useBooks'

export default function LandingPage() {
  const booksQuery = useBooksQuery({})
  const books = booksQuery.data?.pages[0].data || []
  if (booksQuery.isLoading) return <div> Loading... </div>
  return (
    <div className="flex flex-col m-2 my-4 gap-6">
      <LandingPageSection sectionTitle="Recently added" books={books} />
      <LandingPageSection sectionTitle="Most viewed" books={books} />
    </div>
  )
}
