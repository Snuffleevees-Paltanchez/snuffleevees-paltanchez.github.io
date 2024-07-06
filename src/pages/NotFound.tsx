import { BirdIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div data-test-id="not-found" className="flex flex-col justify-center items-center h-screen">
      <span className="text-4xl mb-4 flex flex-row items-center font-medium">
        Lost? <BirdIcon size={36} />
      </span>
      <p className="text-center">The page you are looking for does not exist.</p>
    </div>
  )
}
