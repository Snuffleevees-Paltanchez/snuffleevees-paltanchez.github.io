import { useMemo } from 'react'
import { XIcon } from 'lucide-react'
import { Button, Chip } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchFiltersActive() {
  const { queryObject, clearParams, updateParams } = useQueryParams()

  const isNumber = (value: string) => {
    return /^\d+$/.test(value)
  }

  const chips = useMemo(() => {
    return Object.entries(queryObject)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        const obj = { key, value, display: value }
        if (
          isNumber(value) ||
          value === 'true' ||
          value === 'false' ||
          value === 'asc' ||
          value === 'desc'
        ) {
          obj.display = `${key}: ${value}`
        }
        return obj
      })
  }, [queryObject])

  const removeParam = (key: string) => {
    updateParams({
      paramsToRemove: [key],
    })
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap items-center">
      <Button
        variant="flat"
        color="danger"
        onClick={() => {
          clearParams()
        }}
        disabled={chips.length === 0}
        endContent={<XIcon size={16} />}
      >
        Clear filters
      </Button>
      {chips.map((chip, i) => (
        <Chip key={i} onClose={() => removeParam(chip.key)}>
          {chip.display}
        </Chip>
      ))}
    </div>
  )
}
