import { SearchXIcon } from 'lucide-react'

export default function SearchNoResults() {
  return (
    <div className="flex flex-col items-center justify-center h-full my-12">
      <SearchXIcon size={48} className="my-4" />
      <span className="text-2xl font-semibold mb-2">No results found</span>
      <span className="text-lg">Try searching for something else</span>
    </div>
  )
}
