import { SearchIcon } from 'lucide-react'
import { Input } from '@nextui-org/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQueryParams } from '@/hooks/useQueryParams'

// TODO: add it to a utils file and fix the types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function SearchInput() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addParam } = useQueryParams()
  const handleSearch = debounce((value: string) => {
    if (location.pathname !== '/search') {
      navigate(`/search?title=${value}`)
    } else {
      addParam('title', value)
    }
  }, 500)
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
      onChange={(e) => handleSearch(e.target.value)}
      type="search"
    />
  )
}
