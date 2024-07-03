import { Switch } from '@nextui-org/react'
import { useQueryParams } from '@/hooks/useQueryParams'

export default function SearchFiltersAdmin() {
  const { queryObject, updateParams } = useQueryParams()

  const updateQueryParams = (value: boolean) => {
    updateParams({
      paramsToAppend: { isDeleted: `${value}` },
    })
  }
  return (
    <div>
      <Switch
        defaultSelected={queryObject.isDeleted === 'true'}
        color="danger"
        onChange={(value) => updateQueryParams(value.target.checked)}
      >
        See Deleted Books
      </Switch>
    </div>
  )
}
