import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'

export default function SearchFiltersSortBy({ onChange }: { onChange?: (sortBy: string) => void }) {
  const [sortBy, setSortBy] = useState('relevance')
  const handleChange = (sortBy: string) => {
    setSortBy(sortBy)
    onChange?.(sortBy)
  }
  return (
    <Select
      className="w-[150px]"
      label="Sort by"
      size="sm"
      value={sortBy}
      onChange={(e) => handleChange(e.target.value)}
    >
      <SelectItem key="relevance">Relevance</SelectItem>
      <SelectItem key="price">Price</SelectItem>
    </Select>
  )
}
