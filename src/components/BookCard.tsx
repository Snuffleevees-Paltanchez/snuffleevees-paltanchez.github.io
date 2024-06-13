import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Image } from '@nextui-org/react'
import { HeartIcon } from 'lucide-react'
import noImage from '/no-image.png'
import { useBookInfoQuery, type BookInfo } from '@/hooks/queries/useBookInfo'

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
  const bookInfoQuery = useBookInfoQuery(isbn)
  const bookInfo = bookInfoQuery.data || ({} as BookInfo)
  if (bookInfoQuery.isLoading) return <div>Loading...</div>
  return (
    <Card
      className="flex flex-row justify-center"
      style={{
        minWidth: '400px',
      }}
    >
      <div style={{ minWidth: '150px' }} className="relative">
        <Image
          src={bookInfo.image || noImage}
          alt={bookInfo.title}
          fallbackSrc={noImage}
          radius="none"
          className="bg-cover h-full"
          removeWrapper
        />
        <Chip
          color="primary"
          className="absolute bottom-3 mx-2 z-10"
          startContent={<HeartIcon size={16} fill="currentColor" />}
        >
          {markedAsFavoriteCount}
        </Chip>
      </div>
      <div>
        <CardHeader className="flex-col items-start">
          <h4 className="font-medium text-large">{bookInfo.title}</h4>
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
