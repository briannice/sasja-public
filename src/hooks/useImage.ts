import { downloadImage } from '@/services/firebase/storage'
import { useEffect, useState } from 'react'

export default function useImage(dir: string, id: string, size: 'sm' | 'lg', def = null) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    downloadImage(`/${dir}/${id}`, size)
      .then((url) => setUrl(url))
      .catch(() => setUrl(def))
  }, [dir, id, size, def])

  return url
}
