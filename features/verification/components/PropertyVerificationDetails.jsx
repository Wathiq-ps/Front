'use client'
import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'

import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationExtractedData } from './VerificationExtractedData'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { Card } from '@/components/ui/Card'
import { VerificationDecisionCard } from './VerificationDecisionCard'
export function PropertyVerificationDetails({ id }) {
  const { t, locale } = useLang()
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
        name={
            typeof request.name === 'object'
            ? request.name[locale] ?? request.name.ar
            : request.name
        }
        id={request.id}
        status={t.verificationCenter.statuses[request.status]}
      />

      <VerificationExtractedData
        title={t.verificationCenter.detail.extractedData}
        fields={[
          {
            key: 'ownerName',
            label: t.verificationCenter.detail.propertyOwner,
            value: typeof details.ownerName === 'object'
              ? details.ownerName[locale] ?? details.ownerName.ar
              : details.ownerName ?? '—',
          },
          {
            key: 'identityNumber',
            label: t.verificationCenter.detail.identityNumber,
            value: details.identityNumber ?? '—',
            dir: 'ltr',
          },
          {
            key: 'propertyType',
            label: t.verificationCenter.detail.propertyType,
            value: details.propertyType
              ? t.verificationCenter.propertyTypes[details.propertyType] ??
                details.propertyType
              : '—',
          },
          {
            key: 'area',
            label: t.verificationCenter.detail.area,
            value: details.area
              ? `${details.area} ${t.verificationCenter.detail.areaUnit}` 
              : '—',
           
          },
          {
            key: 'city',
            label: t.verificationCenter.detail.city,
            value: typeof details.city === 'object'
              ? details.city[locale] ?? details.city.ar
              : details.city ?? '—',
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
            src={details.documents?.deed}
            alt={t.verificationCenter.detail.propertyDeed}
            />
        </div>
    </Card>
    <VerificationDecisionCard />    
    </div>
  )
}