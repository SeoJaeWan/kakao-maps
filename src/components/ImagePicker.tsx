import { useRef } from 'react'
import { useOcr } from '../hooks/useOcr'

interface Props {
  onAddresses: (addresses: string[]) => void
}

export const ImagePicker = ({ onAddresses }: Props) => {
  const { runOcr, progress, loading } = useOcr()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const addresses = await runOcr(file)
      onAddresses(addresses)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
      {loading && <p>OCR: {(progress * 100).toFixed(0)}%</p>}
    </div>
  )
}
