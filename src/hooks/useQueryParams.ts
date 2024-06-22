import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Hook to manage query parameters in the URL. For example, if the URL is
 * `http://example.com/?foo=bar`, you can use this hook to get the value of `foo`
 * @returns an object with:
 * - query: The URLSearchParams object
 * - queryObject: The URLSearchParams object as a plain object
 * - updateParams: A function to update the query parameters
 */
export const useQueryParams = () => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [search])
  const queryObject = useMemo(() => Object.fromEntries(query), [query])

  const updateParams = ({
    paramsToAppend = {},
    paramsToRemove = [],
  }: {
    paramsToAppend?: Record<string, string | undefined>
    paramsToRemove?: string[]
  }) => {
    const newQuery = new URLSearchParams(query)
    Object.entries(paramsToAppend).forEach(([key, value]) => {
      if (value) {
        newQuery.set(key, value)
      }
    })
    paramsToRemove.forEach((key) => {
      newQuery.delete(key)
    })
    navigate(`${pathname}?${newQuery.toString()}`)
  }

  return {
    query,
    queryObject,
    updateParams,
  }
}
