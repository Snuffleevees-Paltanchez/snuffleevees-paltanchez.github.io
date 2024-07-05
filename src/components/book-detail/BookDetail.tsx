import { Chip } from '@nextui-org/react'
import { type Book } from '@/hooks/queries/useBooks'
import PriceTable from '@/components/book-detail/PriceTable'
import BookImage from '@/components/BookImage'
import Stars from '@/components/rating/Stars'
import AdminActions from './admin/AdminActions'

export default function BookDetail({ bookInfo }: { bookInfo: Book }) {
  return (
    <div className="flex flex-row h-full m-10 gap-6" data-test-id="book-detail">
      <div className="flex flex-col gap-4">
        <BookImage
          image={bookInfo.imgUrl}
          title={bookInfo.title}
          customClasses="h-[300px] min-w-[160px]"
          data-test-id="book-image-details"
        />
        <div className="flex flex-row justify-between">
          <Stars rating={bookInfo.ratingAvg} dataTestId="rating" />
          <span>
            {bookInfo.ratingAvg} ({bookInfo.ratingsCount || 0})
          </span>
        </div>
        <p className="text-sm">
          <span className="font-bold">ISBN</span> {bookInfo.isbn}
        </p>
        <div className="flex flex-row gap-2">
          {bookInfo.categories.map((category, i) => (
            <Chip key={i}>{category.name}</Chip>
          ))}
        </div>
        <AdminActions bookInfo={bookInfo} />
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-semibold" data-test-id="title">
          {bookInfo.title}
        </h1>
        <span className="my-1 font-medium italic text-sm" data-test-id="publication-date">
          {bookInfo.publicationDate}
        </span>
        <span className="text-lg" data-test-id="author-name">
          {bookInfo.author?.name}
        </span>
        <p className="mb-6" data-test-id="description">
          {bookInfo.description}
        </p>
        <PriceTable isbn={bookInfo.isbn} prices={bookInfo.prices} />
      </div>
    </div>
  )
}
