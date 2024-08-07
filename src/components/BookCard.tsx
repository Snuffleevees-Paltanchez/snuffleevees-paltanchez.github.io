import { useNavigate, Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import type { Book } from '@/hooks/queries/useBooks'
import BookImage from './BookImage'

export default function BookCard({
  book,
  isLoading = false,
  customClasses = '',
}: {
  book: Book
  isLoading?: boolean
  customClasses?: string
}) {
  const navigate = useNavigate()
  if (isLoading) return <SkeletonCard />
  return (
    <Card className={`flex flex-row justify-between ${customClasses}`} data-test-id="book-card">
      <div
        className="relative min-w-[150px] max-w-[150px] cursor-pointer"
        onClick={() => navigate(`/books/${book.isbn}`)}
      >
        <BookImage image={book.imgUrl} title={book.title} customClasses="h-full" />
      </div>
      <div className="grid w-full">
        <CardHeader className="flex-col items-start">
          <Link to={`/books/${book.isbn}`}>
            <h4 className="font-medium text-large line-clamp-2" data-test-id="title-card">
              {book.title}
            </h4>
          </Link>
          <span className="font-medium italic" data-test-id="publication-date-card">
            {book.publicationDate}
          </span>
          <span className="italic line-clamp-1" data-test-id="author-name-card">
            {book.author.name}
          </span>
        </CardHeader>
        <CardBody className="pt-2">
          <span className="text-sm line-clamp-3" data-test-id="description-card">
            {book.description}
          </span>
        </CardBody>
        <CardFooter className="justify-end self-end">
          <span
            className="text-end text-secondary font-semibold text-xl"
            data-test-id="best-price-card"
          >
            ${book.bestPrice} CLP
          </span>
        </CardFooter>
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
