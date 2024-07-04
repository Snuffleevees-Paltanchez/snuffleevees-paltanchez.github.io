import { Button } from '@nextui-org/react'
import DangerButton from '@/components/DangerButton'
import { type Book, useBookByISBNMutations } from '@/hooks/queries/useBooks'
import { useUserSession } from '@/hooks/useUserSession'
import { HammerIcon } from 'lucide-react'

export default function AdminActions({ bookInfo }: { bookInfo: Book }) {
  const { isAdmin } = useUserSession()
  const { deleteBookMutation, restoreBookMutation } = useBookByISBNMutations(bookInfo.isbn)
  const deleteBook = () => {
    deleteBookMutation.mutateAsync(bookInfo.id)
  }
  const restoreBook = () => {
    restoreBookMutation.mutateAsync(bookInfo.id)
  }
  if (!isAdmin) {
    return null
  }
  return (
    <>
      {bookInfo.isDeleted ? (
        <Button
          color="primary"
          variant="bordered"
          startContent={<HammerIcon size={16} />}
          onClick={restoreBook}
        >
          Restore book
        </Button>
      ) : (
        <DangerButton onAction={deleteBook} />
      )}
    </>
  )
}
