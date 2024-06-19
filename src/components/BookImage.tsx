import { Image } from '@nextui-org/react'
import noImage from '/no-image.png'

export default function BookImage({
  image = '',
  title = '',
  customClasses = '',
}: {
  image?: string
  title?: string
  customClasses?: string
}) {
  return (
    <Image
      src={image || noImage}
      alt={title}
      fallbackSrc={noImage}
      radius="none"
      className={`bg-cover ${customClasses}`}
      removeWrapper
    />
  )
}
