import { useNavigate, Link } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import type { Book } from '@/hooks/queries/useBooks'
import BookImage from './BookImage'

export default function BookCard({ book, isLoading = false }: { book: Book; isLoading?: boolean }) {
  const navigate = useNavigate()
  if (isLoading) return <SkeletonCard />
  return (
    <Card className="min-w-[400px] max-w-[400px] flex flex-row justify-between">
      <div
        className="relative min-w-[150px] max-w-[150px] cursor-pointer"
        onClick={() => navigate(`/books/${book.isbn}`)}
      >
        <BookImage image={book.imgUrl} title={book.title} customClasses="h-full" />
      </div>
      <div className="w-full">
        <CardHeader className="flex-col items-start">
          <Link to={`/books/${book.isbn}`}>
            <h4 className="font-medium text-large">{book.title}</h4>
          </Link>
          <span className="font-medium italic">{book.publicationDate}</span>
          <span className="italic">{book.author.name}</span>
        </CardHeader>
        <CardBody className="pt-2">
          <span className="text-sm line-clamp-4">{book.description}</span>
          <span className="text-end text-secondary font-semibold text-xl">${book.bestPrice}</span>
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
