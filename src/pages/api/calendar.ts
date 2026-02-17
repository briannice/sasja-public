import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/utils/session'
import { competitionService } from '@/services/competitions/competition'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const competition = req.body
  const authenticated = isAuthenticated(req)

  try {
    const games = await competitionService.getCompetitionCalendar(competition, authenticated)
    return res.status(200).json(games)
  } catch {
    return res.status(500).json({ message: 'Failed to fetch calendar' })
  }
}
