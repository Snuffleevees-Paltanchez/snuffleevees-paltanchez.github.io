import { Input } from '@nextui-org/react'
import { useUserSession } from '@/hooks/useUserSession'
import ClipboardButton from '@/components/ClipboardButton'
import InputPassword from '@/components/PasswordInput'
import LoadingSpinner from '@/components/LoadingSpinner'
import AdminChart from '@/components/admin/AdminChart'

export default function Admin() {
  const { user, isAuthenticated, isLoading, token } = useUserSession()
  if (isLoading) return <LoadingSpinner />
  else if (!isAuthenticated) return <div>You are not authenticated. Please login.</div>
  return (
    <div className="flex flex-col p-6 my-4 gap-4">
      <span>
        Your are authenticated as <b className="mx-1">{user?.name}</b> with email
        <b className="mx-1">{user?.email}</b>
      </span>
      <div className="flex flex-row gap-2 items-center">
        Your sub:
        <Input value={user?.sub} readOnly className="w-auto" />
        <ClipboardButton text={user?.sub} />
      </div>
      <div className="flex flex-row gap-2 items-center">
        Your Authorization token:
        <InputPassword value={token} readOnly type="password" />
        <ClipboardButton text={token} />
      </div>
      <AdminChart />
    </div>
  )
}
