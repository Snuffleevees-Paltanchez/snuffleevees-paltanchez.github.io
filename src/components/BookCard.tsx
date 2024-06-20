import { useNavigate, Link } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import { useBookInfoQuery, type BookInfo } from '@/hooks/queries/useBookInfo'
import FavoriteChip from './FavoriteChip'
import BookImage from './BookImage'

export default function BookCard({
  isbn,
  price,
  markedAsFavoriteCount = 0,
}: {
  isbn: string
  /** Price in CLP */
  price: number
  markedAsFavoriteCount?: number
}) {
  const navigate = useNavigate()
  const bookInfoQuery = useBookInfoQuery(isbn)
  const bookInfo = bookInfoQuery.data || ({} as BookInfo)
  if (bookInfoQuery.isLoading) return <SkeletonCard />
  return (
    <Card className="min-w-[400px] max-w-[400px] flex flex-row justify-center">
      <div
        className="relative min-w-[150px] cursor-pointer"
        onClick={() => navigate(`/books/${isbn}`)}
      >
        <BookImage image={bookInfo.image} title={bookInfo.title} customClasses="h-full" />
        <FavoriteChip
          customClasses="absolute bottom-3 mx-2"
          markedAsFavoriteCount={markedAsFavoriteCount}
        />
      </div>
      <div>
        <CardHeader className="flex-col items-start">
          <Link to={`books/${isbn}`}>
            <h4 className="font-medium text-large">{bookInfo.title}</h4>
          </Link>
          <span className="font-medium italic">{bookInfo.publishedDate}</span>
          <span className="italic">{bookInfo.authors.join(', ')}</span>
        </CardHeader>
        <CardBody className="pt-2">
          <span className="text-sm">{bookInfo.description}</span>
          <span className="text-end text-secondary font-semibold text-xl">${price}</span>
        </CardBody>
      </div>
    </Card>
  )
}

export const SkeletonCard = () => (
  <Card className="min-w-[400px] h-[250px] flex flex-row">
    <Skeleton>
      <div className="min-w-[150px] h-full"></div>
    </Skeleton>
    <div className="w-full h-full p-4 flex flex-col">
      <Skeleton className="rounded-lg w-full h-6 mb-3" />
      <Skeleton className="rounded-lg w-1/4 h-4 mb-2" />
      <Skeleton className="rounded-lg w-1/3 h-3 mb-6" />
      <Skeleton className="rounded-lg w-full h-4 mb-2" />
      <Skeleton className="rounded-lg w-3/4 h-4 mb-2" />
      <Skeleton className="rounded-lg w-2/3 h-4 mb-6" />
      <Skeleton className="rounded-lg w-1/2 h-8 self-end" />
    </div>
  </Card>
)
