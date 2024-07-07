import { Switch } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useUserSession } from '@/hooks/useUserSession'

export default function SearchFiltersAdmin() {
  const { isAdmin } = useUserSession()
  const { queryObject, updateParams } = useQueryParams()

  const updateQueryParams = (value: boolean) => {
    updateParams({
      paramsToAppend: { isDeleted: `${value}` },
    })
  }
  if (!isAdmin) {
    return null
  }
  return (
    <div>
      <Switch
        isSelected={queryObject.isDeleted === 'true'}
        color="danger"
        onChange={(value) => updateQueryParams(value.target.checked)}
      >
        See Deleted Books
      </Switch>
    </div>
  )
}
