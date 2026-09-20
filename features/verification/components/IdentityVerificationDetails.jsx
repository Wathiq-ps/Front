'use client'

import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'
import { formatDate } from '@/config/locales'
import { verificationRequests } from '@/features/verification/data/verificationMock'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { getLocalizedName } from '@/features/verification/utils/verification.formatters'

import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { VerificationDecisionCard } from './VerificationDecisionCard'

import { VerificationExtractedData } from './VerificationExtractedData'
export function IdentityVerificationDetails({ id }) {
  const { locale, t } = useLang()
  
  const request = verificationRequests.identity.find(
    (item) => item.id === id,
  )
  const details = request?.details ?? {
    identityNumber: request?.reference ?? '',
    birthDate: null,
    nationality: null,
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
        name={getLocalizedName(request, locale)}
        id={request.id}
        status={t.verificationCenter.statuses[request.status]}
      />
      <VerificationExtractedData
        title={t.verificationCenter.detail.extractedData}
        fields={[
          {
            key: 'fullName',
            label: t.verificationCenter.detail.fullName,
            value: getLocalizedName(request, locale),
          },
          {
            key: 'identityNumber',
            label: t.verificationCenter.detail.identityNumber,
            value: details.identityNumber ?? '—',
            dir: 'ltr',
          },
          {
            key: 'birthDate',
            label: t.verificationCenter.detail.birthDate,
            value: details.birthDate
              ? formatDate(details.birthDate, locale)
              : '—',
            dir: 'ltr',
          },
          {
            key: 'nationality',
            label: t.verificationCenter.detail.nationality,
            value: details.nationality
              ? t.verificationCenter.detail.nationalities[details.nationality]
              : '—',
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
                src={details.documents?.identity}
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
                src={details.documents?.selfie}
                alt={t.verificationCenter.detail.selfie}
                width={400}
                height={400}
              />
            </div>
          </div>
        </Card>
        <VerificationDecisionCard />        
    </div>
  )
}