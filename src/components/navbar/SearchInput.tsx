import { SearchIcon } from 'lucide-react'
import { Input } from '@nextui-org/react'

export default function SearchInput() {
  return (
    <Input
      classNames={{
        base: 'max-w-full h-10 w-full',
        mainWrapper: 'h-full',
        inputWrapper: 'h-full font-normal text-default-500 text-secondary',
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
    />
  )
}
