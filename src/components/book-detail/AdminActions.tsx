import { Button } from '@nextui-org/react'
import DangerButton from '../DangerButton'
import { type Book, useBookByISBNMutations } from '@/hooks/queries/useBooks'
import { useUserSession } from '@/hooks/useUserSession'

export default function AdminActions({ bookInfo }: { bookInfo: Book }) {
  const { isAdmin, isAuthenticated } = useUserSession()
  const { deleteBookMutation, restoreBookMutation } = useBookByISBNMutations(bookInfo.isbn)
  const deleteBook = () => {
    deleteBookMutation.mutateAsync(bookInfo.id)
  }
  const restoreBook = () => {
    restoreBookMutation.mutateAsync(bookInfo.id)
  }
  if (!isAdmin || !isAuthenticated) {
    return null
  }
  return (
    <>
      {bookInfo.isDeleted ? (
        <Button color="success" onClick={restoreBook}>
          Restore book
        </Button>
      ) : (
        <DangerButton onAction={deleteBook} />
      )}
    </>
  )
}
