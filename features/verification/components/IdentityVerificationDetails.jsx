'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'
import { formatDate } from '@/config/locales'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'

import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { VerificationDecisionCard } from './VerificationDecisionCard'

import { VerificationExtractedData } from './VerificationExtractedData'

export function IdentityVerificationDetails({ id }) {
  const { locale, t } = useLang()
  const [request, setRequest] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/verification/identity/${id}`)

        if (!response.ok) {
          throw new Error('Failed to fetch identity verification details')
        }

        const result = await response.json()
        setRequest(result.data ?? result)
      } catch (err) {
        console.error('Failed to fetch identity verification details:', err)
        setError(t.verificationCenter.fetchError)
        setRequest(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequest()
  }, [id])

  const handleApprove = async () => {
    const response = await fetch(
      `/api/verification/identity/${id}/approve`,
      {
        method: 'POST',
      },
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to approve identity verification',
      )
    }

    const updatedRequest = result.data ?? result

    setRequest(updatedRequest)

    return updatedRequest
  }

  const handleReject = async (reason) => {
    const response = await fetch(
      `/api/verification/identity/${id}/reject`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
        }),
      },
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to reject identity verification',
      )
    }

    const updatedRequest = result.data ?? result

    setRequest(updatedRequest)

    return updatedRequest
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <p className="text-[14px] text-ink-muted">
          {t.loading}
        </p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <p className="text-[14px] text-red-600">{error}</p>
      </Card>
    )
  }
  if (!request) {
    return (
    <Card className="w-full max-w-[360px]">
      <p className="text-[14px] text-ink-muted">
        {t.verificationCenter.noResults}
      </p>
    </Card>
    )
  }

  return (
    
    <div className="flex flex-col gap-5">
      <VerificationBreadcrumbs type="identity" currentLabel={t.verificationCenter.identityDetail}/>
      <VerificationDetailHeader
        name={t.verificationCenter.identityDetail}
        id={request.id}
        status={t.verificationCenter.statuses[request.status]}
      />
      <VerificationExtractedData
        title={t.verificationCenter.detail.extractedData}
        fields={[
          {
            key: 'identityNumber',
            label: t.verificationCenter.detail.identityNumber,
            value: request.document_number ?? '—',
            dir: 'ltr',
          },
          {
            key: 'email',
            label: t.verificationCenter.detail.email,
            value: request.user?.email ?? '—',
            dir: 'ltr',
          },
          {
            key: 'phone',
            label: t.verificationCenter.detail.phone,
            value: request.user?.phone ?? '—',
            dir: 'ltr',
          },
          {
            key: 'type',
            label: t.verificationCenter.detail.identityType,
            value: request.type
              ? t.verificationCenter.documentTypes[request.type] ?? request.type
              : '—',
          },
          {
            key: 'submittedAt',
            label: t.verificationCenter.detail.submittedAt,
            value: request.submitted_at
              ? formatDate(request.submitted_at, locale)
              : '—',
            dir: 'ltr',
          },
        ]}
      />
        
        <Card>
          <div className="border-b border-border pb-4">
            <h2 className="text-[20px] font-bold text-brand-navy">
              {t.verificationCenter.detail.documents}
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">
                {t.verificationCenter.detail.identityDocument}
              </h3>

              <VerificationDocumentPreview
                src={request.image_urls?.front}
                alt={t.verificationCenter.detail.identityDocument}
                width={600}
                height={400}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">
                {t.verificationCenter.detail.selfie}
              </h3>

              <VerificationDocumentPreview
                src={request.image_urls?.selfie}
                alt={t.verificationCenter.detail.selfie}
                width={400}
                height={400}
              />
            </div>
          </div>
        </Card>
        <VerificationDecisionCard status={request.status} onApprove={handleApprove} onReject={handleReject}/>    
    </div>
  )
}