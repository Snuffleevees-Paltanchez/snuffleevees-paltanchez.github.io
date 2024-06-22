import { Card, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import noImage from '/no-image.png'

export default function AuthorCard({
  authorName,
  imgSrc,
}: {
  authorName: string
  imgSrc?: string
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
      </CardFooter>
    </Card>
  )
}
