import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/utils/session'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  return res.status(200).json({ authenticated: isAuthenticated(req) })
}
