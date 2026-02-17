import type { NextApiRequest, NextApiResponse } from 'next'
import { setSessionCookie } from '@/utils/session'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { password } = req.body

  if (password === process.env.LOGIN_PASSWORD) {
    setSessionCookie(res)
    return res.status(200).json({ authenticated: true })
  }

  return res.status(401).json({ message: 'Ongeldig wachtwoord' })
}
