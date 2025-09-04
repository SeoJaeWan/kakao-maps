import { useState } from 'react'
import Tesseract from 'tesseract.js'
import { extractAddresses } from '../lib/addrRegex'

export const useOcr = () => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const runOcr = async (file: File) => {
    setLoading(true)
    setProgress(0)
    const { data } = await Tesseract.recognize(file, 'kor', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(m.progress)
        }
      },
    })
    setLoading(false)
    return extractAddresses(data.text)
  }

  return { runOcr, progress, loading }
}
