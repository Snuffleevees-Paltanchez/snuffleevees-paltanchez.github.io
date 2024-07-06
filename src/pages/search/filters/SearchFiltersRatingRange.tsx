import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'
import FiltersMenu from '@/components/FiltersMenu'

type RatingRanges = {
  minRatingAvg: string
  maxRatingAvg: string
}

export default function SearchFiltersRatingRange() {
  const { queryObject, updateParams } = useQueryParams()
  const [ratingRanges, setRatingRanges] = useState({
    minRatingAvg: queryObject.minRatingAvg || '1',
    maxRatingAvg: queryObject.maxRatingAvg || '1',
  })

  const handleRangeChange = (priceRanges: Partial<RatingRanges>) => {
    setRatingRanges((prev: RatingRanges) => {
      const newPriceRanges = { ...prev, ...priceRanges }
      return newPriceRanges
    })
  }

  const updateParamsWithNewRange = () => {
    updateParams({
      paramsToAppend: ratingRanges,
    })
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <FiltersMenu onApplyFilters={updateParamsWithNewRange} title="Rating range">
        <div className="flex flex-col gap-2">
          <span className="text-default-500 text-sm">Select a rating range (from 1 to 5)</span>
          <div className="flex flex-row gap-4">
            <Input
              labelPlacement="inside"
              label="Min"
              className="w-20"
              size="sm"
              type="number"
              min={1}
              max={5}
              value={ratingRanges.minRatingAvg}
              onChange={(e) => {
                handleRangeChange({ minRatingAvg: e.target.value })
              }}
            />
            <Input
              labelPlacement="inside"
              label="Max"
              className="w-20"
              size="sm"
              type="number"
              min={1}
              max={5}
              value={ratingRanges.maxRatingAvg}
              onChange={(e) => {
                handleRangeChange({ maxRatingAvg: e.target.value })
              }}
            />
          </div>
        </div>
      </FiltersMenu>
    </div>
  )
}
