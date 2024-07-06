import { useMikbooksClient } from '@/hooks/useClients'

export const useUserSessionRequests = () => {
  const client = useMikbooksClient()

  const userSessionQuery = async () => {
    const userSession = { isAdmin: false }
    // This is not the cleanest way to do this, the backend should return the user roles
    // instead of catching an error to determine if the user is an admin.
    // But since this is not a real application and we have limited time, this is fine.
    try {
      await client.get('/admin')
      userSession.isAdmin = true
    } catch (error) {
      userSession.isAdmin = false
    }
    return userSession
  }

  return {
    userSessionQuery,
  }
}
