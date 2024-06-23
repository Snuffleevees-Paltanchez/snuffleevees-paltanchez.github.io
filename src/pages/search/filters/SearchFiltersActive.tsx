import { useMemo } from 'react'
import { XIcon } from 'lucide-react'
import { Button, Chip } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchFiltersActive() {
  const { queryObject, clearParams } = useQueryParams()

  const isNumber = (value: string) => {
    return /^\d+$/.test(value)
  }
  
  const chips = useMemo(() => {
    return Object.entries(queryObject)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (isNumber(value)) {
          return `${key}: ${value}`
        }
        return value
      })
  }, [queryObject])

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
        <Chip key={i}>{chip}</Chip>
      ))}
    </div>
  )
}
