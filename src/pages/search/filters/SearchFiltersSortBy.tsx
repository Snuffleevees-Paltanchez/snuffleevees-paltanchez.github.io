/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { ArrowDownIcon } from 'lucide-react'
import { Button, Select, SelectItem, Tooltip } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'

type SortByObject = {
  [key in 'sortByRating' | 'sortByRatingCount']?: 'asc' | 'desc'
}

export default function SearchFiltersSortBy() {
  const { updateParams } = useQueryParams()
  const [sortBy, setSortBy] = useState<string | undefined>()
  const [isDesc, setIsDesc] = useState<boolean>(true)
  const order = useMemo(() => (isDesc ? 'desc' : 'asc'), [isDesc])
  const sortObject = useMemo<SortByObject>(() => {
    if (sortBy === 'sortByRating') {
      return { sortByRating: order }
    }
    if (sortBy === 'sortByRatingCount') {
      return { sortByRatingCount: order }
    }
    return {}
  }, [sortBy, order])

  useEffect(() => {
    updateParams({
      paramsToAppend: sortObject,
      paramsToRemove: ['page', sortBy === 'sortByRating' ? 'sortByRatingCount' : 'sortByRating'],
    })
  }, [sortObject])

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Sort order" placement="bottom">
        <Button
          variant="light"
          className={isDesc ? '' : 'rotate-180'}
          onClick={() => setIsDesc(!isDesc)}
          isIconOnly
        >
          <ArrowDownIcon />
        </Button>
      </Tooltip>
      <Select
        className="w-[180px]"
        label="Sort by"
        size="sm"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <SelectItem key="sortByRating">Rating</SelectItem>
        <SelectItem key="sortByRatingCount">Number of reviews</SelectItem>
      </Select>
    </div>
  )
}
