import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react'
import React from 'react'
import Stars from '../Rating/Stars'
import { Price } from '@/hooks/queries/useBooks'

export default function PriceTable({ prices }: { prices: Price[] }) {
  const columns = [
    { key: 'productUrl', label: 'Website' },
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
  ]

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl', 'p-2', 'bg-gray-50'],
      th: ['bg-transparent', 'font-bold', 'text-base', 'text-black', 'border-b', 'border-divider'],
    }),
    [],
  )
  return (
    <Table classNames={classNames} aria-label="Prices comparison table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={prices}>
        {(item) => (
          <TableRow key={item.platformId}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey) || ''
              if (columnKey === 'price') {
                return <TableCell className="font-semibold">${value}</TableCell>
              } else if (columnKey === 'rating') {
                return (
                  <TableCell className="flex flex-row gap-2">
                    <Stars rating={value} />
                    {value} / 5
                  </TableCell>
                )
              }
              return (
                <TableCell>
                  <a href={value} target="_blank" rel="noreferrer" className="text-secondary">
                    {parseWebsite(value)}
                  </a>
                </TableCell>
              )
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

const parseWebsite = (url: string) => {
  const parsedUrl = new URL(url)
  return parsedUrl.hostname
}
