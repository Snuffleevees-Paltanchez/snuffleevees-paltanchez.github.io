import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input, Button } from '@nextui-org/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchInput() {
  const navigate = useNavigate()
  const location = useLocation()
  const { updateParams, queryObject } = useQueryParams()
  const [searchText, setSearchText] = useState(queryObject.title || '')
  const handleSearch = (value: string) => {
    console.log('searching for:', value)
    if (location.pathname !== '/search') {
      navigate(`/search?title=${value}`)
    } else {
      updateParams({ paramsToAppend: { title: value }, paramsToRemove: ['page'] })
    }
  }
  return (
    <div className="flex items-center">
      <Input
        classNames={{
          base: 'max-w-full h-10 w-full',
          mainWrapper: 'h-full',
          inputWrapper: 'h-full font-normal text-default-500 text-secondary rounded-r-none',
        }}
        placeholder="Type to search..."
        size="sm"
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(searchText)
        }}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
      />
      <Button
        className="h-10 rounded-l-none"
        size="sm"
        onClick={() => handleSearch(searchText)}
        isIconOnly
      >
        <SearchIcon size={18} />
      </Button>
    </div>
  )
}
