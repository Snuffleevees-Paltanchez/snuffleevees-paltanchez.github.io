import { useMemo, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { useBookByISBNMutations, type Price } from '@/hooks/queries/useBooks'

export default function EditPriceModal({
  isbn,
  price,
  isOpen,
  onClose,
}: {
  isbn: string
  price: Price
  isOpen: boolean
  onClose: () => void
}) {
  const { updatePriceAmountMutation } = useBookByISBNMutations(isbn)
  const [priceValue, setPriceValue] = useState<number>(parsePriceString(price.price))

  const updateBook = () => {
    updatePriceAmountMutation.mutateAsync({ id: price.id, price: priceValue })
    onClose()
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPriceValue(parseFloat(value))
  }

  const disabled = useMemo(
    () => priceValue === parsePriceString(price.price) || priceValue < 0 || isNaN(priceValue),
    [priceValue, price.price],
  )

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit the price</ModalHeader>
            <ModalBody>
              <p className="text-sm">
                Please make sure to enter the correct price (in $CLP) for the book according to
              </p>
              <a
                href={price.productUrl}
                target="_blank"
                rel="noreferrer"
                className="text-secondary text-sm"
              >
                {price.productUrl}
              </a>
              <Input
                label="New price"
                type="number"
                placeholder={price.price}
                min={0}
                value={priceValue?.toString()}
                onChange={handlePriceChange}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">CLP</span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={updateBook} disabled={disabled}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

const parsePriceString = (price: string) => {
  return parseFloat(price.replace(/[^0-9]/g, ''))
}
