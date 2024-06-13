import { Card, CardFooter } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Image } from '@nextui-org/react'
import { HeartIcon } from 'lucide-react'
import noImage from '/no-image.png'

export default function AuthorCard({
  authorName,
  imgSrc,
  markedAsFavoriteCount = 0,
}: {
  authorName: string
  imgSrc?: string
  markedAsFavoriteCount?: number
}) {
  return (
    <Card isFooterBlurred className="max-w-[250px] h-[300px] col-span-12 sm:col-span-5">
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={imgSrc || noImage}
        fallbackSrc={noImage}
      />
      <CardFooter className="absolute bg-primary/40 bottom-0 z-10 justify-between">
        <span className="text-xl text-primary-foreground font-medium">{authorName}</span>
        <Chip
          color="primary"
          className="mx-2 z-10"
          startContent={<HeartIcon size={16} fill="currentColor" />}
        >
          {markedAsFavoriteCount}
        </Chip>
      </CardFooter>
    </Card>
  )
}
