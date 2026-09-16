'use client'

import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'

import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { PropertyExtractedData } from './PropertyExtractedData'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { Card } from '@/components/ui/Card'

export function PropertyVerificationDetails({ id }) {
  const { locale, t } = useLang()

  const request = verificationRequests.property.find(
    (item) => item.id === id,
  )

  if (!request) {
    return (
      <p className="text-sm text-ink-muted">
        {t.verificationCenter.noResults}
      </p>
    )
  }

  const details = request.details ?? request

  return (
    <div className="flex flex-col gap-5">
      <VerificationBreadcrumbs
        type="property"
        currentLabel={t.verificationCenter.propertyDetail}
      />

      <VerificationDetailHeader
        name={request.name}
        id={request.id}
        status={t.verificationCenter.statuses[request.status]}
      />

      <PropertyExtractedData details={details} />
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
            src={details.documents?.deed}
            alt={t.verificationCenter.detail.propertyDeed}
            />
        </div>
    </Card>
    </div>
  )
}