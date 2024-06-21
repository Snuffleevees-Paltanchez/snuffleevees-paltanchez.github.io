import { useParams } from 'react-router-dom'
import { useBookByISBNQuery, type Book } from '@/hooks/queries/useBooks'
import BookDetail from '@/components/BookDetail/BookDetail'
// import SidebarRecommendations from '@/components/BookDetail/SidebarRecommendations'

export default function BookDetailPage() {
  const { isbn } = useParams()
  if (!isbn) return <div> ISBN is not valid </div>
  return <BookDetailSection isbn={isbn} />
}

const BookDetailSection = ({ isbn }: { isbn: string }) => {
  const bookInfoQuery = useBookByISBNQuery(isbn)
  if (bookInfoQuery.isLoading) return <div> Loading... </div>
  const bookInfo = bookInfoQuery.data || ({} as Book)
  return (
    <div className="flex flex-row relative">
      <BookDetail isbn={isbn} bookInfo={bookInfo} />
      {/* Since recommendations is not a important feature for the moment I will leave it commented */}
      {/* <SidebarRecommendations genre={''} /> */}
    </div>
  )
}
