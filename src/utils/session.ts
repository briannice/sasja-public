import { serialize, parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const COOKIE_NAME = 'sasja_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function setSessionCookie(res: NextApiResponse): void {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET env var is not set')

  res.setHeader(
    'Set-Cookie',
    serialize(COOKIE_NAME, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE,
      path: '/',
    })
  )
}

export function clearSessionCookie(res: NextApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    serialize(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
  )
}

export function isAuthenticated(req: NextApiRequest): boolean {
  const secret = process.env.SESSION_SECRET
  if (!secret) return false

  const cookies = parse(req.headers.cookie || '')
  return cookies[COOKIE_NAME] === secret
}
