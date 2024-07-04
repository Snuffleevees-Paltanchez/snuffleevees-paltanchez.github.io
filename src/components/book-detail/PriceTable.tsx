import { useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from '@nextui-org/react'
import type { Price } from '@/hooks/queries/useBooks'
import { useUserSession } from '@/hooks/useUserSession'
import AdminPriceActions from './admin/AdminPriceActions'

export default function PriceTable({ isbn, prices }: { isbn: string; prices: Price[] }) {
  const { isAdmin } = useUserSession()
  const adminColumns = isAdmin ? [{ key: 'actions', label: 'Admin' }] : []

  const columns = [
    { key: 'productUrl', label: 'Website' },
    { key: 'price', label: 'Price' },
    { key: 'isDeleted', label: 'Status' },
    ...adminColumns,
  ]

  const classNames = useMemo(
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
              if (columnKey === 'actions') {
                return (
                  <TableCell>
                    <AdminPriceActions isbn={isbn} price={item} />
                  </TableCell>
                )
              } else if (columnKey === 'price') {
                return <TableCell className="font-semibold">${value} CLP</TableCell>
              } else if (columnKey === 'isDeleted') {
                return (
                  <TableCell>
                    <StatusChip isDeleted={value} />
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

const StatusChip = ({ isDeleted }: { isDeleted: boolean }) => {
  return isDeleted ? <Chip color="warning">Outdated</Chip> : <Chip color="primary">Active</Chip>
}
