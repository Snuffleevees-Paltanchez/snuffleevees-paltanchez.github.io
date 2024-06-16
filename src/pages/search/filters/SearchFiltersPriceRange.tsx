import { useState } from 'react'
import { Input } from '@nextui-org/react'

type PriceRanges = {
  minPrice: number
  maxPrice: number
}

export default function SearchFiltersPriceRange({
  onChange,
}: {
  onChange?: (priceRanges: PriceRanges) => void
}) {
  const [priceRanges, setPriceRanges] = useState({ minPrice: 0, maxPrice: 0 })

  const handlePriceRangeChange = (priceRanges: Partial<PriceRanges>) => {
    setPriceRanges((prev: PriceRanges) => {
      const newPriceRanges = { ...prev, ...priceRanges }
      onChange?.(newPriceRanges)
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
          value={priceRanges.minPrice.toString()}
          onChange={(e) => {
            handlePriceRangeChange({ minPrice: parseInt(e.target.value) })
          }}
        />
        <Input
          labelPlacement="inside"
          label="Max"
          className="w-20"
          size="sm"
          type="number"
          value={priceRanges.maxPrice.toString()}
          onChange={(e) => {
            handlePriceRangeChange({ maxPrice: parseInt(e.target.value) })
          }}
        />
      </div>
    </div>
  )
}
