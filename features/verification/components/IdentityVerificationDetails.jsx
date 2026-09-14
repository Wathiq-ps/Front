'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'

export function IdentityVerificationDetails({ id }) {
  const { t } = useLang()

  const request = verificationRequests.identity.find(
    (item) => item.id === id,
  )

  if (!request) {
    return (
      <Card>
        <p className="text-sm text-ink-faint">
          {t.verificationCenter.noResults}
        </p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <nav
        aria-label={t.verificationCenter.breadcrumb}
        className="flex items-center gap-2 text-[12px] text-ink-faint"
      >
        <Link
          href="/dashboard"
          className="transition-colors hover:text-brand-navy"
        >
          {t.home}
        </Link>

        <span aria-hidden="true">/</span>

        <Link
          href="/dashboard/verification"
          className="transition-colors hover:text-brand-navy"
        >
          {t.verificationCenter.title}
        </Link>

        <span aria-hidden="true">/</span>

        <span className="text-ink-muted">
          {t.verificationCenter.detail.breadcrumb}
        </span>
      </nav>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[28px] font-bold text-ink">
              {request.name}
            </h1>

            <p className="mt-1 text-[12px] text-ink-faint">
              {request.id}
            </p>
          </div>

          <span className="inline-flex items-center rounded-lg bg-brand-gold/20 px-3 py-1.5 text-[12px] font-semibold text-brand-gold-ink">
            {t.verificationCenter.statuses[request.status]}
          </span>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <ArrowRight size={16} aria-hidden="true" />
          <span>{t.verificationCenter.detail.pendingImplementation}</span>
        </div>
      </Card>
    </div>
  )
}