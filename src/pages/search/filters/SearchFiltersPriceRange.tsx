import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'

type PriceRanges = {
  minPrice: string
  maxPrice: string
}

export default function SearchFiltersPriceRange() {
  const { queryObject, addParam } = useQueryParams()
  const [priceRanges, setPriceRanges] = useState({
    minPrice: queryObject.minPrice || '0',
    maxPrice: queryObject.maxPrice || '0',
  })

  const handlePriceRangeChange = (priceRanges: Partial<PriceRanges>) => {
    if (priceRanges.minPrice) {
      addParam('minPrice', priceRanges.minPrice)
    }
    if (priceRanges.maxPrice) {
      addParam('maxPrice', priceRanges.maxPrice)
    }
    setPriceRanges((prev: PriceRanges) => {
      const newPriceRanges = { ...prev, ...priceRanges }
      return newPriceRanges
    })
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <span>Price range</span>
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
  )
}
