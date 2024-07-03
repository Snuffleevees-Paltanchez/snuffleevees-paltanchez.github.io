import { Chip } from '@nextui-org/react'
import PriceTable from '@/components/book-detail/PriceTable'
import BookImage from '@/components/BookImage'
import { type Book } from '@/hooks/queries/useBooks'
import Stars from '../rating/Stars'
import AdminActions from './AdminActions'

export default function BookDetail({ isbn, bookInfo }: { isbn: string; bookInfo: Book }) {
  return (
    <div className="flex flex-row h-full m-10 gap-6">
      <div className="flex flex-col gap-4">
        <BookImage
          image={bookInfo.imgUrl}
          title={bookInfo.title}
          customClasses="h-[300px] min-w-[160px]"
        />
        <div className="flex flex-row justify-between">
          <Stars rating={bookInfo.ratingAvg} />
          <span>
            {bookInfo.ratingAvg} ({bookInfo.ratingsCount || 0})
          </span>
        </div>
        <p className="text-sm">
          <span className="font-bold">ISBN</span> {isbn}
        </p>
        <div className="flex flex-row gap-2">
          {bookInfo.categories.map((category, i) => (
            <Chip key={i}>{category.name}</Chip>
          ))}
        </div>
        <AdminActions bookInfo={bookInfo} />
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-semibold">{bookInfo.title}</h1>
        <span className="my-1 font-medium italic text-sm">{bookInfo.publicationDate}</span>
        <span className="text-lg">{bookInfo.author?.name}</span>
        <p className="mb-6">{bookInfo.description}</p>
        <PriceTable prices={bookInfo.prices} />
      </div>
    </div>
  )
}
