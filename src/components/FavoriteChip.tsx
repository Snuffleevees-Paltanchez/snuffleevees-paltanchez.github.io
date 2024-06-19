import { Chip } from '@nextui-org/chip'
import { HeartIcon } from 'lucide-react'

export default function FavoriteChip({
  markedAsFavoriteCount,
  customClasses = '',
}: {
  markedAsFavoriteCount: number
  customClasses?: string
}) {
  return (
    <Chip
      color="primary"
      className={`z-10 ${customClasses}`}
      startContent={<HeartIcon size={16} fill="currentColor" />}
    >
      {markedAsFavoriteCount}
    </Chip>
  )
}
