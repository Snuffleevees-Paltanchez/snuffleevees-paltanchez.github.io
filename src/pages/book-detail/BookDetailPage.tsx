import { useParams } from 'react-router-dom'
import { useBookInfoQuery, type BookInfo } from '@/hooks/queries/useBookInfo'
import BookDetail from '@/components/BookDetail/BookDetail'
import SidebarRecommendations from '@/components/BookDetail/SidebarRecommendations'

export default function BookDetailPage() {
  const { isbn } = useParams()
  const bookInfoQuery = useBookInfoQuery(isbn || '')
  const bookInfo = bookInfoQuery.data || ({} as BookInfo)
  return (
    <div className="flex flex-row relative">
      <BookDetail isbn={isbn || ''} bookInfo={bookInfo} />
      <SidebarRecommendations genre={''} />
    </div>
  )
}
