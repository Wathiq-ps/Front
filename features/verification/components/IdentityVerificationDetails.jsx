'use client'

import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/context/LanguageContext'
import { verificationRequests } from '@/features/verification/data/verificationMock'
import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'

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
      <VerificationBreadcrumbs type="identity" currentLabel={t.verificationCenter.identityDetail}/>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-ink">
            {request.name}
          </h1>

          <p className="mt-1.5 text-[12px] text-ink-faint">
            {request.id}
          </p>
        </div>

        <Badge variant="gold">
          {t.verificationCenter.statuses[request.status]}
        </Badge>
      </header>
    </div>
  )
}