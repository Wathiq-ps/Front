'use client'

import { CheckCircle2, X, Check, XCircle } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/context/LanguageContext'
import { formatDate } from '@/config/locales'
import { verificationRequests } from '@/features/verification/data/verificationMock'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { getLocalizedName } from '@/features/verification/utils/verification.formatters'
import Image from 'next/image'

export function IdentityVerificationDetails({ id }) {
  const { locale, t } = useLang()
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageErrors, setImageErrors] = useState({})  

  const request = verificationRequests.identity.find(
    (item) => item.id === id,
  )
  const details = request?.details?? {
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
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-ink">
            {typeof request.name === 'object'? request.name[locale] ?? request.name.ar: request.name}
          </h1>

          <p className="mt-1.5 text-[12px] text-ink-faint">
            {request.id}
          </p>
        </div>

        <Badge variant="gold">
          {t.verificationCenter.statuses[request.status]}
        </Badge>
      </header>
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

              <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-1">
                {details.documents?.identity && !imageErrors.identity ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage({
                        src: details.documents.identity,
                        alt: t.verificationCenter.detail.identityDocument,
                      })
                    }
                    className="block w-full cursor-zoom-in"
                  >
                    <Image
                      src={details.documents.identity}
                      alt={t.verificationCenter.detail.identityDocument}
                      width={600}
                      height={400}
                      className="h-auto max-h-[400px] w-full rounded-xl object-contain"
                      onError={() =>setImageErrors((prev) => ({...prev,identity: true,}))}
                    />
                  </button>
                ) : (
                  <span className="text-sm text-ink-faint">
                    {imageErrors.identity? t.verificationCenter.detail.imageLoadError: t.verificationCenter.detail.noImage}

                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">
                {t.verificationCenter.detail.selfie}
              </h3>

              <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-1">
                {details.documents?.selfie && !imageErrors.selfie ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage({
                        src: details.documents.selfie,
                        alt: t.verificationCenter.detail.selfie,
                      })
                    }
                    className="block w-full cursor-zoom-in"
                  >
                    <Image
                      src={details.documents.selfie}
                      alt={t.verificationCenter.detail.selfie}
                      width={400}
                      height={400}
                      className="h-auto max-h-[400px] w-full rounded-xl object-contain"
                      onError={() =>setImageErrors((prev) => ({...prev,selfie: true,}))}
                    />
                  </button>
                ) : (
                  <span className="text-sm text-ink-faint">
                    {imageErrors.selfie? t.verificationCenter.detail.imageLoadError: t.verificationCenter.detail.noImage}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
        <Card>
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-[18px] font-bold text-brand-navy">
        {t.verificationCenter.reviewDecision}
      </h2>

      <p className="mt-1 text-sm text-ink-faint">
        {t.verificationCenter.reviewDecisionDescription}
      </p>
    </div>

    <div className="flex shrink-0 gap-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
      >
        <Check size={17} aria-hidden="true" />
        {t.verificationCenter.approve}
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <XCircle size={17} aria-hidden="true" />
        {t.verificationCenter.reject}
      </button>
    </div>
  </div>
</Card>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.alt}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-[90vw] rounded-xl bg-white p-3 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label={t.common.close}
                className="absolute end-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-md transition-colors hover:bg-surface-1"
              >
                <X size={18} aria-hidden="true" />
              </button>

              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={900}
                className="max-h-[85vh] w-auto max-w-[85vw] object-contain"
              />
            </div>
          </div>
        )}        
    </div>
  )
}