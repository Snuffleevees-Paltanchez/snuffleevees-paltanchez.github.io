import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from '@nextui-org/react'

export default function EditPriceModal({
  isOpen,
  onAction,
  onClose,
}: {
  isOpen: boolean
  onAction: () => void
  onClose: () => void
}) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit the price</ModalHeader>
            <ModalBody>
              <p className="text-sm">You can edit the price of this book.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onAction}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
