import { env } from '@/config/env.config'
import { cookies } from 'next/headers'

export const getToken = async (): Promise<null | string> => {
  try {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || ''

    const parsedToken = token

    return parsedToken
  } catch {
    return null
  }
}

export const setToken = async (token: string): Promise<boolean> => {
  try {
    const maxAge = env.APP.COOKIES.MAX_AGE_IN_DAYS
    const cookie = await cookies()
    cookie.set('token', token, {
      expires: new Date(Date.now() + maxAge * 1000 * 60 * 60 * 24),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    })

    return true
  } catch {
    return false
  }
}
