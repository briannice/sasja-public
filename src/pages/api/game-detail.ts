import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/utils/session'
import { gameDetailService } from '@/services/competitions/gamedetail'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const game = req.body
  const authenticated = isAuthenticated(req)

  try {
    const detail = await gameDetailService.getGameDetail(game, authenticated)
    return res.status(200).json(detail)
  } catch {
    return res.status(500).json({ message: 'Failed to fetch game detail' })
  }
}
