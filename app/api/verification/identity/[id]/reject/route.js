import { NextResponse } from 'next/server'

import { backendFetch } from '@/lib/api/server'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()

    const headers = {}

    if (
      process.env.NODE_ENV === 'development' &&
      process.env.WATHIQ_DEV_ADMIN_ACCESS_TOKEN
    ) {
      headers.Authorization = `Bearer ${process.env.WATHIQ_DEV_ADMIN_ACCESS_TOKEN}`
    }

    const response = await backendFetch(
      `/api/v1/admin/kyc/documents/${id}/reject`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          reason: body.reason,
        }),
      },
    )

    const data = await response.json().catch(() => ({}))

    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json(
      { message: 'Verification API is not configured.' },
      { status: 503 },
    )
  }
}