'use client'

import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'

import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { PropertyExtractedData } from './PropertyExtractedData'

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
    </div>
  )
}