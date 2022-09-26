import { storage } from '@/services/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

const STORAGE_IMAGE_SIZES = ['640x640', '1280x1280']

export const downloadImage = async (path: string, size: 'sm' | 'lg') => {
  try {
    const format = size === 'sm' ? STORAGE_IMAGE_SIZES[0] : STORAGE_IMAGE_SIZES[1]
    const storageRef = ref(storage, `${path}_${format}`)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    return null
  }
}
