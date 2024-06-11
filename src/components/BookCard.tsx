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
        width: '450px',
      }}
    >
      <div style={{ width: '200px' }} className="h-100">
        <Image
          src={bookInfo.image || noImage}
          alt={bookInfo.title}
          fallbackSrc={noImage}
          className="bg-contain"
        />
        <Chip
          color="primary"
          className="absolute bottom-2 flex flex-row justify-center items-center mx-2 z-10"
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
        <CardBody className="pt-2 pb-4">
          <span>{bookInfo.description}</span>
          <span className="text-end text-secondary font-semibold text-2xl">${price}</span>
        </CardBody>
      </div>
    </Card>
  )
}
