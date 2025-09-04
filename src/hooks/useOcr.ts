import { useState } from 'react'
import { createWorker, PSM, type LoggerMessage } from 'tesseract.js'
import { extractAddresses } from '../lib/addrRegex'

export const useOcr = () => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const runOcr = async (file: File) => {
    setLoading(true)
    setProgress(0)

    const worker = await createWorker('kor', undefined, {
      logger: (m: LoggerMessage) => {
        if (m.status === 'recognizing text') {
          setProgress(m.progress)
        }
      },
    })

    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      tessedit_char_whitelist: '가-힣0-9-',
    })

    const { data } = await worker.recognize(file)
    await worker.terminate()

    setLoading(false)

    console.log(data.text)
    const text = data.text.replace(/\s+/g, ' ').trim()
    console.log(text)

    return extractAddresses(text)
  }

  return { runOcr, progress, loading }
}
