/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUserSessionQuery } from '@/hooks/queries/useUserSession'

type UserSession = {
  token?: string
  isAdmin?: boolean
}

export const useUserSession = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, ...authContext } = useAuth0()
  const userSession = useUserSessionQuery()
  const [token, setToken] = useState<string | undefined>()
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((authToken) => {
        setToken(authToken)
      })
    }
  }, [isAuthenticated])
  const loading = isLoading || userSession.isLoading
  const isAdmin = userSession.data?.isAdmin

  useEffect(() => {
    setUserSessionStorage({ token, isAdmin })
  }, [token, isAdmin])
  return { user, isAuthenticated, isLoading: loading, token, isAdmin, ...authContext }
}

export const initialStateUserSession: UserSession = {
  token: '',
  isAdmin: false,
}

export const setUserSessionStorage = (userSession: UserSession) => {
  sessionStorage.setItem('userSession', JSON.stringify(userSession))
}

export const getUserSessionStorage = (): UserSession => {
  const userSessionStr = sessionStorage.getItem('userSession')
  if (userSessionStr === null) {
    return initialStateUserSession
  }
  return JSON.parse(userSessionStr)
}

export const removeUserSessionStorage = () => {
  sessionStorage.removeItem('userSession')
}
