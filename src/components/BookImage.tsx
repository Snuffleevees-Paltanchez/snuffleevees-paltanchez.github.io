import { Image, ImageProps } from '@nextui-org/react'
import noImage from '/no-image.png'
interface BookImageProps extends ImageProps {
  image?: string
  title?: string
  customClasses?: string
}

export default function BookImage({
  image = '',
  title = '',
  customClasses = '',
  ...props
}: BookImageProps) {
  return (
    <Image
      src={image || noImage}
      alt={title}
      fallbackSrc={noImage}
      radius="none"
      className={`bg-cover ${customClasses}`}
      removeWrapper
      {...props}
    />
  )
}
