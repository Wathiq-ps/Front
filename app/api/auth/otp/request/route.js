import { NextResponse } from 'next/server'
import { API_BASE_URL, apiPath } from '@/lib/api/server'

export async function POST(request) {
  if (!API_BASE_URL) return NextResponse.json({ code: 'AUTH_API_NOT_CONFIGURED' }, { status: 503 })
  const body = await request.json().catch(() => null)
  if (!body?.email) return NextResponse.json({ code: 'OTP_REQUEST_VALIDATION' }, { status: 400 })
  try {
    const response = await fetch(`${API_BASE_URL}${apiPath('WATHIQ_OTP_REQUEST_PATH', '/api/v1/auth/otp/request')}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: body.email }), cache: 'no-store' })
    const data = await response.json().catch(() => ({}))
    return NextResponse.json({ ...data, code: data.error_code || data.code || 'OTP_REQUEST_FAILED' }, { status: response.status })
  } catch { return NextResponse.json({ code: 'AUTH_SERVICE_UNAVAILABLE' }, { status: 502 }) }
}