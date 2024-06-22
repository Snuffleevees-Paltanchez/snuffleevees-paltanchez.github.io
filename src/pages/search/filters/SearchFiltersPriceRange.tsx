import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'
import FiltersMenu from '@/components/filters-menu/FiltersMenu'

type PriceRanges = {
  minPrice: string
  maxPrice: string
}

export default function SearchFiltersPriceRange() {
  const { queryObject, updateParams } = useQueryParams()
  const [priceRanges, setPriceRanges] = useState({
    minPrice: queryObject.minPrice || '0',
    maxPrice: queryObject.maxPrice || '0',
  })

  const handlePriceRangeChange = (priceRanges: Partial<PriceRanges>) => {
    setPriceRanges((prev: PriceRanges) => {
      const newPriceRanges = { ...prev, ...priceRanges }
      return newPriceRanges
    })
  }

  const updateParamsWithPriceRange = () => {
    updateParams({
      paramsToAppend: {
        minPrice: priceRanges.minPrice,
        maxPrice: priceRanges.maxPrice,
      },
    })
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <FiltersMenu onApplyFilters={updateParamsWithPriceRange} title="Price range">
        <div className="flex flex-col gap-2">
          <span className="text-default-500 text-sm">Select a price range (CLP)</span>
          <div className="flex flex-row gap-4">
            <Input
              labelPlacement="inside"
              label="Min"
              className="w-20"
              size="sm"
              type="number"
              value={priceRanges.minPrice}
              onChange={(e) => {
                handlePriceRangeChange({ minPrice: e.target.value })
              }}
            />
            <Input
              labelPlacement="inside"
              label="Max"
              className="w-20"
              size="sm"
              type="number"
              value={priceRanges.maxPrice}
              onChange={(e) => {
                handlePriceRangeChange({ maxPrice: e.target.value })
              }}
            />
          </div>
        </div>
      </FiltersMenu>
    </div>
  )
}
