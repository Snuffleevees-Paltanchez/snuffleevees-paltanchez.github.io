import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useBookByISBNQuery, type Book } from '@/hooks/queries/useBooks'
import { Card, CardBody } from '@nextui-org/react'
import BookDetail from '@/components/book-detail/BookDetail'
import LoadingSpinner from '@/components/LoadingSpinner'
import SidebarRecommendations from '@/components/book-detail/SidebarRecommendations'
import { AlertCircleIcon } from 'lucide-react'

export default function BookDetailPage() {
  const { isbn } = useParams()
  if (!isbn) return <div> ISBN is not valid </div>
  return <BookDetailSection isbn={isbn} />
}

const BookDetailSection = ({ isbn }: { isbn: string }) => {
  const bookInfoQuery = useBookByISBNQuery(isbn)
  const bookInfo = useMemo(() => bookInfoQuery.data || ({} as Book), [bookInfoQuery.data])
  if (bookInfoQuery.isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-row relative">
      <div className="flex flex-col w-full">
        {bookInfo.isDeleted && <DeletedBookWarning />}
        <BookDetail isbn={isbn} bookInfo={bookInfo} />
      </div>
      <SidebarRecommendations isbn={isbn} />
    </div>
  )
}

const DeletedBookWarning = () => (
  <Card className="m-4">
    <CardBody className="overflow-hidden bg-red-100 text-red-500 flex flex-row gap-2">
      <AlertCircleIcon size={24} />
      <p className="mb-2">
        This book has been marked as deleted by administrators. You should not trust the information
        provided here.
      </p>
    </CardBody>
  </Card>
)
