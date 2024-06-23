import { cn } from '@nextui-org/react'
import { LoaderCircleIcon } from 'lucide-react'

export default function LoadingSpinner({
  size = 64,
  className = 'm-6',
  color = 'primary',
}: {
  size?: number
  className?: string
  color?: string
}) {
  return (
    <div className={cn('flex justify-center items-center animate-spin', className)}>
      <LoaderCircleIcon size={size} className={`text-${color}`} />
    </div>
  )
}
