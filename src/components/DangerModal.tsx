import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from '@nextui-org/react'

export default function DangerModal({
  isOpen,
  onAction,
  onClose,
  description,
  buttonText = 'Delete',
}: {
  isOpen: boolean
  onAction: () => void
  onClose: () => void
  description?: string
  buttonText?: string
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
              <Button color="primary" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" onClick={onAction}>
                {buttonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
