import { NextResponse } from 'next/server'
import { API_BASE_URL, apiPath, authCookieOptions } from '@/lib/api/server'
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth/constants'

export async function POST(request) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { code: 'AUTH_API_NOT_CONFIGURED' },
      { status: 503 },
    )
  }
  const body = await request.json().catch(() => null)
  if (!body?.email || !body?.code) {
    return NextResponse.json(
      { code: 'OTP_VERIFY_VALIDATION' },
      { status: 400 },
    )
  }
  try {
    const response = await fetch(`${API_BASE_URL}${apiPath('WATHIQ_OTP_VERIFY_PATH', '/api/v1/auth/otp/verify')}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: body.email, code: body.code }), cache: 'no-store' })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return NextResponse.json(
        {
           ...data,
           code: data.error_code || data.code || 'OTP_VERIFY_FAILED',
        },
        { status: response.status },
        )
      }
    const access = data.access_token || data.accessToken
    const refresh = data.refresh_token || data.refreshToken
    if (!access || !refresh) {
      return NextResponse.json(
        { code: 'AUTH_TOKENS_MISSING' },
        { status: 502 },
      )
    }
    const result = NextResponse.json({ user: data.user || null, authenticated: true })
    result.cookies.set(ACCESS_COOKIE, access, authCookieOptions(Number(data.expires_in) || 900))
    result.cookies.set(REFRESH_COOKIE, refresh, authCookieOptions(60 * 60 * 24 * 30))
    return result
  } catch {
    return NextResponse.json(
      { code: 'AUTH_SERVICE_UNAVAILABLE' },
      { status: 502 },
    )
  }
}