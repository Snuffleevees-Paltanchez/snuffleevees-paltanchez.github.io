import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from '@nextui-org/react'

export default function DangerModal({
  isOpen,
  onAction,
  onClose,
  description,
}: {
  isOpen: boolean
  onAction: () => void
  onClose: () => void
  description?: string
}) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
            <ModalBody>
              <p className="text-sm">
                {description || (
                  <>
                    Are you sure you want to mark this book as deleted? Please prefer editing prices
                    or marking outdated prices as deleted instead. Either way, you can undo this
                    action later.
                  </>
                )}
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
}
