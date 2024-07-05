import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import DangerModal from '@/components/DangerModal'
import EditPriceModal from './AdminPriceEditModal'
import { EllipsisVerticalIcon, HammerIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useBookByISBNMutations, type Price } from '@/hooks/queries/useBooks'

export default function AdminPriceActions({ isbn, price }: { isbn: string; price: Price }) {
  const { restorePriceMutation, deletePriceMutation } = useBookByISBNMutations(isbn)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const onRestore = () => {
    restorePriceMutation.mutateAsync(price.id)
  }
  const onDelete = () => {
    deletePriceMutation.mutateAsync(price.id)
    setIsDeleteModalOpen(false)
  }
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Price actions">
          <DropdownItem
            key="edit"
            startContent={<PencilIcon size={16} />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit price
          </DropdownItem>
          {price.isDeleted ? (
            <DropdownItem
              key="restore"
              className="text-primary"
              color="primary"
              startContent={<HammerIcon size={16} />}
              onClick={onRestore}
            >
              Restore price
            </DropdownItem>
          ) : (
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<TrashIcon size={16} />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Mark price as deleted
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <EditPriceModal
        isbn={isbn}
        price={price}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAction={onDelete}
        description="Are you sure you want to mark this price as deleted? Please prefer editing prices instead. Either way, you can undo this action later."
      />
    </>
  )
}
