'use client'
import { CheckCircle2 } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'
import { formatDate } from '@/config/locales'
import { verificationRequests } from '@/features/verification/data/verificationMock'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { getLocalizedName } from '@/features/verification/utils/verification.formatters'

import { VerificationDetailHeader } from './VerificationDetailHeader'
import { VerificationDocumentPreview } from './VerificationDocumentPreview'
import { VerificationDecisionCard } from './VerificationDecisionCard'

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
      <Card>
        <div className="border-b border-border pb-4">
            <h2 className="text-[20px] font-bold text-brand-navy">
            {t.verificationCenter.detail.extractedData}
            </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-4">
            <div>
                <p className="text-[12px] text-ink-faint">
                {t.verificationCenter.detail.fullName}
                </p>

                <p className="mt-1 text-[17px] font-bold text-ink">
                {getLocalizedName(request, locale)}
                </p>
            </div>

            <CheckCircle2
                size={18}
                className="shrink-0 text-success"
                aria-hidden="true"
            />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-4">
            <div>
                <p className="text-[12px] text-ink-faint">
                {t.verificationCenter.detail.identityNumber}
                </p>

                <p
                dir="ltr"
                className="mt-1 text-[17px] font-bold tracking-wide text-ink"
                >
                {details.identityNumber}
                </p>
            </div>

            <CheckCircle2
                size={18}
                className="shrink-0 text-success"
                aria-hidden="true"
            />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-4">
            <div>
                <p className="text-[12px] text-ink-faint">
                {t.verificationCenter.detail.birthDate}
                </p>

                <p
                dir="ltr"
                className="mt-1 text-[17px] font-bold text-ink"
                >
                {details.birthDate
                    ? formatDate(details.birthDate, locale)
                    : '—'}
                </p>
            </div>

            <CheckCircle2
                size={18}
                className="shrink-0 text-success"
                aria-hidden="true"
            />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-4">
            <div>
                <p className="text-[12px] text-ink-faint">
                {t.verificationCenter.detail.nationality}
                </p>

                <p className="mt-1 text-[17px] font-bold text-ink">
                {details.nationality
                    ? t.verificationCenter.detail.nationalities[details.nationality]
                    : '—'}
                </p>
            </div>

            <CheckCircle2
                size={18}
                className="shrink-0 text-success"
                aria-hidden="true"
            />
            </div>
        </div>
        </Card>
        
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