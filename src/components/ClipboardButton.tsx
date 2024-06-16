import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@nextui-org/react'

export default function ButtonClipboard({ text }: { text: string | undefined }) {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])
  return (
    <Button
      className="p-3 bg-primary"
      onClick={() => {
        setIsCopied(true)
        navigator.clipboard.writeText(text!)
      }}
      isIconOnly
      disabled={!text}
    >
      {isCopied ? <Check size={16} color="white" /> : <Copy size={16} color="white" />}
    </Button>
  )
}
