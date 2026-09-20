'use client'

import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'

import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationExtractedData } from './VerificationExtractedData'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { Card } from '@/components/ui/Card'
export function LawyerVerificationDetails({ id }) {
  const { t } = useLang()

  const request = verificationRequests.lawyers.find(
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
        type="lawyers"
        currentLabel={t.verificationCenter.lawyerDetail}
      />

      <VerificationDetailHeader
        name={details.fullName ?? request.name}
        id={request.id}
        status={t.verificationCenter.statuses[request.status]}
      />

      <VerificationExtractedData
        title={t.verificationCenter.detail.extractedData}
        fields={[
          {
            key: 'fullName',
            label: t.verificationCenter.detail.fullName,
            value: details.fullName ?? '—',
          },
          {
            key: 'licenseNumber',
            label: t.verificationCenter.detail.licenseNumber,
            value: details.licenseNumber ?? '—',
            dir: 'ltr',
          },
          {
            key: 'specialty',
            label: t.verificationCenter.detail.specialty,
            value: details.specialty
              ? t.verificationCenter.specialties[details.specialty] ??
                details.specialty
              : '—',
          },
          {
            key: 'phone',
            label: t.verificationCenter.detail.phone,
            value: details.phone ?? '—',
            dir: 'ltr',
          },
          {
            key: 'email',
            label: t.verificationCenter.detail.email,
            value: details.email ?? '—',
            dir: 'ltr',
          },
        ]}
      />
      <Card>
        <div className="border-b border-border pb-4">
            <h2 className="text-[20px] font-bold text-brand-navy">
            {t.verificationCenter.detail.lawyerDocument}
            </h2>
        </div>

        <div className="mt-5">
            <h3 className="mb-3 text-sm font-semibold text-ink">
            {t.verificationCenter.detail.licenseDocument}
            </h3>

            <VerificationDocumentPreview
            src={details.documents?.license}
            alt={t.verificationCenter.detail.licenseDocument}
            />
        </div>
    </Card>
    </div>
  )
}