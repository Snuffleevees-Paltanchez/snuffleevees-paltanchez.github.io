import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'

export default function SearchFiltersItemsByPage({
  onChange,
}: {
  onChange?: (itemsPerPage: number) => void
}) {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const handleChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage)
    onChange?.(itemsPerPage)
  }
  return (
    <div className="flex flex-row gap-2 items-center">
      <Select
        className="w-[200px]"
        label="Items per page"
        size="sm"
        value={itemsPerPage}
        onChange={(e) => handleChange(parseInt(e.target.value))}
      >
        <SelectItem key="10">10</SelectItem>
        <SelectItem key="20">20</SelectItem>
        <SelectItem key="50">50</SelectItem>
      </Select>
    </div>
  )
}
