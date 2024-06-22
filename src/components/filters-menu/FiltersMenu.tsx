import { Popover, PopoverTrigger, PopoverContent, Button, Divider } from '@nextui-org/react'

import { FilterIcon } from 'lucide-react'

export default function FiltersMenu({
  title,
  children,
  onApplyFilters,
}: {
  title: string
  children: JSX.Element
  onApplyFilters: () => void
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="solid">{title}</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        {children}
        <Divider className="my-4" />
        <Button
          className="w-full bg-primary text-primary-foreground"
          startContent={<FilterIcon className="text-primary-foreground" />}
          onClick={onApplyFilters}
        >
          Apply filters
        </Button>
      </PopoverContent>
    </Popover>
  )
}
