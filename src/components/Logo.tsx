import { LibraryIcon } from 'lucide-react'
import { ComponentProps } from 'react'

type LibraryIconProps = ComponentProps<typeof LibraryIcon>

export default function Logo({ ...props }: LibraryIconProps) {
  return <LibraryIcon strokeWidth={3} size={32} {...props} />
}
