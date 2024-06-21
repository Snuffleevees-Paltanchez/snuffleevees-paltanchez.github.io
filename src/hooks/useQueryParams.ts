import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Hook to manage query parameters in the URL. For example, if the URL is
 * `http://example.com/?foo=bar`, you can use this hook to get the value of `foo`
 * @returns an object with:
 * - query: The URLSearchParams object
 * - queryObject: The URLSearchParams object as a plain object
 * - addParam: A function to add a parameter to the URL
 * - removeParam: A function to remove a parameter from the URL
 */
export const useQueryParams = () => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [search])
  const queryObject = useMemo(() => Object.fromEntries(query), [query])

  const addParam = (key: string, value: string) => {
    const newQuery = new URLSearchParams(query)
    newQuery.set(key, value)
    navigate(`${pathname}?${newQuery.toString()}`)
  }

  const removeParam = (key: string) => {
    const newQuery = new URLSearchParams(query)
    newQuery.delete(key)
    navigate(`${pathname}?${newQuery.toString()}`)
  }

  return {
    query,
    queryObject,
    addParam,
    removeParam,
  }
}
