import { Button } from '@nextui-org/react'
import PriceTable from '@/components/BookDetail/PriceTable'
import FavoriteChip from '@/components/FavoriteChip'
import BookImage from '@/components/BookImage'
import { type BookInfo } from '@/hooks/queries/useBookInfo'
import { Plus } from 'lucide-react'

export default function BookDetail({ isbn, bookInfo }: { isbn: string; bookInfo: BookInfo }) {
  return (
    <div className="flex flex-row h-full w-full m-10 gap-6">
      <div className="flex flex-col gap-4">
        <BookImage image={bookInfo.image} title={bookInfo.title} />
        <div className="flex flex-row gap-1 items-center">
          <FavoriteChip customClasses="text-base" markedAsFavoriteCount={0} />
          <Button radius="full" color="primary" variant="light">
            <Plus /> Add to favorites
          </Button>
        </div>
        <p className="text-sm">
          <span className="font-bold">ISBN</span> {isbn}
        </p>
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-semibold">{bookInfo.title}</h1>
        <span className="font-medium italic text-sm">{bookInfo.publishedDate}</span>
        <span className="text-lg">{bookInfo?.authors.join(', ')}</span>
        <p className="mt-3 font-semibold">Description</p>
        <p className="mb-6">{bookInfo.description}</p>
        <PriceTable isbn={isbn} />
      </div>
    </div>
  )
}
