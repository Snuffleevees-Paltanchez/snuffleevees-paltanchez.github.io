/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { useAuth0 } from '@auth0/auth0-react'
import ClipboardButton from '@/components/ClipboardButton'
import InputPassword from '@/components/PasswordInput'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Admin() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState<string | undefined>()
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((authToken) => {
        setToken(authToken)
      })
    }
  }, [isAuthenticated])
  if (isLoading) return <LoadingSpinner />
  else if (!isAuthenticated) return <div>You are not authenticated. Please login.</div>
  return (
    <div className="flex flex-col p-4 gap-4">
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
    </div>
  )
}
