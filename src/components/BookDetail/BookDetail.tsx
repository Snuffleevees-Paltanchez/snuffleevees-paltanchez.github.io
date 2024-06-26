import { Chip } from '@nextui-org/react'
import PriceTable from '@/components/BookDetail/PriceTable'
import BookImage from '@/components/BookImage'
import { type Book } from '@/hooks/queries/useBooks'
import Stars from '../Rating/Stars'

export default function BookDetail({ isbn, bookInfo }: { isbn: string; bookInfo: Book }) {
  return (
    <div className="flex flex-row h-full w-full m-10 gap-6" data-test-id="book-detail">
      <div className="flex flex-col gap-4">
        <BookImage image={bookInfo.imgUrl} title={bookInfo.title} customClasses="h-[300px]" />
        <div className="flex flex-row gap-2">
          <Stars rating={0} />
          <span>0 / 5</span>
        </div>
        <p className="text-sm">
          <span className="font-bold">ISBN</span> {isbn}
        </p>
        <div className="flex flex-row gap-2">
          {bookInfo.categories.map((category, i) => (
            <Chip key={i}>{category.name}</Chip>
          ))}
        </div>
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
        <PriceTable prices={bookInfo.prices} />
      </div>
    </div>
  )
}
