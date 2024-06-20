import { Chip, ChipProps } from '@nextui-org/chip'
import { HeartIcon } from 'lucide-react'

interface FavoriteChipProps extends ChipProps {
  markedAsFavoriteCount: number
  customClasses?: string
}

export default function FavoriteChip({
  markedAsFavoriteCount,
  customClasses = '',
  ...props
}: FavoriteChipProps) {
  return (
    <Chip
      color="primary"
      className={`z-10 ${customClasses}`}
      startContent={<HeartIcon size={16} fill="currentColor" />}
      {...props}
    >
      {markedAsFavoriteCount}
    </Chip>
  )
}
