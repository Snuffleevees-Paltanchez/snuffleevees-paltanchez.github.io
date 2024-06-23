import { LoaderCircleIcon } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center m-6 animate-spin">
      <LoaderCircleIcon size={64} className='text-primary' />
    </div>
  )
}
