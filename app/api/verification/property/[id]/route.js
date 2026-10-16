
import { NextResponse } from 'next/server'
import { backendFetch } from '@/lib/api/server'

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const headers = {}

    if (
      process.env.NODE_ENV === 'development' &&
      process.env.WATHIQ_DEV_ADMIN_ACCESS_TOKEN
    ) {
      headers.Authorization = `Bearer ${process.env.WATHIQ_DEV_ADMIN_ACCESS_TOKEN}`
    }

    const [propertyResponse, documentsResponse] = await Promise.all([
      backendFetch(`/api/v1/admin/properties/${id}`, { headers }),
      backendFetch(`/api/v1/admin/properties/${id}/documents`, {
        headers,
      }),
    ])

    const propertyResult = await propertyResponse.json().catch(() => ({}))
    const documentsResult = await documentsResponse.json().catch(() => ({}))

    if (!propertyResponse.ok) {
      return NextResponse.json(propertyResult, {
        status: propertyResponse.status,
      })
    }

    if (!documentsResponse.ok) {
      return NextResponse.json(documentsResult, {
        status: documentsResponse.status,
      })
    }

    const property = propertyResult.data ?? propertyResult

    return NextResponse.json({
      data: {
        ...property,
        ownership_documents: documentsResult.data ?? [],
      },
      meta: documentsResult.meta,
    })
  } catch {
    return NextResponse.json(
      { message: 'Verification API is not configured.' },
      { status: 503 },
    )
  }
}
