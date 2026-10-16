'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationExtractedData } from './VerificationExtractedData'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { VerificationDecisionCard } from './VerificationDecisionCard'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
export function PropertyVerificationDetails({ id }) {
  const { t } = useLang()
  const [request, setRequest] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/verification/property/${id}`)

        if (!response.ok) {
          throw new Error('Failed to fetch property verification details')
        }

        const result = await response.json()

        setRequest(result.data ?? result)
      } catch (err) {
        console.error(
          'Failed to fetch property verification details:',
          err,
        )
        setError(t.verificationCenter.fetchPropertyError)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [id])
  const handleApprove = async () => {
    const document = request?.ownership_documents?.[0]

    if (!document?.id) {
      throw new Error('Property ownership document is not available.')
    }

    const response = await fetch(
      `/api/verification/property/document/${document.id}/approve`,
      {
        method: 'POST',
      },
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to approve property verification.',
      )
    }

    const updatedDocument = result.data ?? result

    setRequest((current) =>
      current
        ? {
            ...current,
            ownership_documents: current.ownership_documents?.map(
              (item) =>
                item.id === updatedDocument.id
                  ? updatedDocument
                  : item,
            ),
          }
        : current,
    )
  }

  const handleReject = async (reason) => {
    const document = request?.ownership_documents?.[0]

    if (!document?.id) {
      throw new Error('Property ownership document is not available.')
    }

    const response = await fetch(
      `/api/verification/property/document/${document.id}/reject`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      },
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to reject property verification.',
      )
    }

    const updatedDocument = result.data ?? result

    setRequest((current) =>
      current
        ? {
            ...current,
            ownership_documents: current.ownership_documents?.map(
              (item) =>
                item.id === updatedDocument.id
                  ? updatedDocument
                  : item,
            ),
          }
        : current,
    )
  }
  if (isLoading) {
    return (
      <p className="text-sm text-ink-muted">
        {t.common.loading}
      </p>
    )
  }

  if (error || !request) {
    return (
      <p className="text-sm text-ink-muted">
        {error ?? t.verificationCenter.noResults}
      </p>
    )
  }

  const document = request.ownership_documents?.[0]

  return (
    <div className="flex flex-col gap-5">
      <VerificationBreadcrumbs
        type="property"
        currentLabel={t.verificationCenter.propertyDetail}
      />

      <VerificationDetailHeader
        name={request.title ?? request.reference ?? '—'}
        id={request.id ?? "—"}
        status={
          t.verificationCenter.statuses[document?.status] ??
          document?.status ??
          '—'
        }
      />

      <VerificationExtractedData
        title={t.verificationCenter.detail.extractedData}
        fields={[
          {
            key: 'ownerName',
            label: t.verificationCenter.detail.propertyOwner,
            value: request.owner?.name ?? request.owner?.email ?? '—',
          },
          {
            key: 'reference',
            label: t.verificationCenter.detail.propertyReference,
            value: request.reference ?? '—',
            dir: 'ltr',
          },
          {
            key: 'district',
            label: t.verificationCenter.detail.district,
            value: request.district ?? '—',
          },                        
          {
            key: 'ownerPhone',
            label: t.verificationCenter.detail.phone,
            value: request.owner?.phone ?? '—',
            dir: 'ltr',
          },
          {
            key: 'propertyType',
            label: t.verificationCenter.detail.propertyType,
            value:
              t.verificationCenter.propertyTypes[request.type] ??
              request.type ??
              '—',
          },
          {
            key: 'area',
            label: t.verificationCenter.detail.area,
            value:
              request.area_sqm != null
                ? `${request.area_sqm} ${t.verificationCenter.detail.areaUnit}`
                : '—',
          },
          {
            key: 'city',
            label: t.verificationCenter.detail.city,
            value: request.city ?? '—',
          },
        ]}
      />

      <Card>
        <div className="border-b border-border pb-4">
          <h2 className="text-[20px] font-bold text-brand-navy">
            {t.verificationCenter.detail.propertyDocument}
          </h2>
        </div>

        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">
            {t.verificationCenter.detail.propertyDeed}
          </h3>

          <VerificationDocumentPreview
            src={document?.file_url}
            alt={t.verificationCenter.detail.propertyDeed}
          />
        </div>
      </Card>
      <VerificationDecisionCard
        status={document?.status}
        onApprove={handleApprove}
        onReject={handleReject}
        onResultClose={() => router.replace('/dashboard/verification/property')}
      />
    </div>
  )
}