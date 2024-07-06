import { useState } from 'react'
import { Button } from '@nextui-org/react'
import DangerModal from './DangerModal'
import { TrashIcon } from 'lucide-react'

export default function DangerButton({
  onAction,
  description,
}: {
  onAction: () => void
  description?: string
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onActionHandler = () => {
    onAction()
    setIsModalOpen(false)
  }
  return (
    <>
      <Button
        variant="bordered"
        color="danger"
        startContent={<TrashIcon size={16} />}
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Mark as deleted
      </Button>
      <DangerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={onActionHandler}
        description={description}
      />
    </>
  )
}
