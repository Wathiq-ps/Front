'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationExtractedData } from './VerificationExtractedData'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { Card } from '@/components/ui/Card'
export function PropertyVerificationDetails({ id }) {
  const { t } = useLang()
  const [request, setRequest] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
        id={request.reference ?? request.id}
        status={
          t.verificationCenter.statuses[request?.status] ??
          request?.status ??
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

    </div>
  )
}