import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchFiltersItemsByPage() {
  const { queryObject, updateParams } = useQueryParams()
  const [itemsPerPage, setItemsPerPage] = useState(queryObject.limit || '20')
  const handleChange = (itemsPerPage: string) => {
    updateParams({ paramsToAppend: { limit: itemsPerPage } })
    setItemsPerPage(itemsPerPage)
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <Select
        className="w-[200px]"
        label="Items per page"
        size="sm"
        value={itemsPerPage}
        onChange={(e) => handleChange(e.target.value)}
        defaultSelectedKeys={[itemsPerPage]}
      >
        <SelectItem key="20">20</SelectItem>
        <SelectItem key="30">30</SelectItem>
        <SelectItem key="50">50</SelectItem>
      </Select>
    </div>
  )
}
