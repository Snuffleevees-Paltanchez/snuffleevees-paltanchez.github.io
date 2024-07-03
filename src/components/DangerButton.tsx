import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from '@nextui-org/react'

export default function DangerButton({ onAction }: { onAction: () => void }) {
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
      />
    </>
  )
}

const DangerModal = ({
  isOpen,
  onAction,
  onClose,
}: {
  isOpen: boolean
  onAction: () => void
  onClose: () => void
}) => (
  <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Are you sure you want to mark this book as deleted? You can undo this action later.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={onAction}>
              Delete
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)
