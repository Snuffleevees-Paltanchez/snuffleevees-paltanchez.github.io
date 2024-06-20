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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PriceTable({ isbn }: { isbn: string | undefined }) {
  // The isbn should be used to fetch the prices from the API
  const columns = [
    { key: 'website', label: 'Website' },
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
  ]

  const rows = [
    { key: '1', website: 'Buscalibre', price: 12000, rating: 4.0 },
    { key: '2', website: 'Antártica', price: 9000, rating: 4.7 },
    { key: '3', website: 'Contrapunto', price: 9500, rating: 3 },
    { key: '4', website: 'Feria chilena del libro', price: 10500, rating: 4.3 },
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
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey)
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
              return <TableCell>{value}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
