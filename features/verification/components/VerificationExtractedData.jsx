'use client'

import { CheckCircle2 } from 'lucide-react'

import { Card } from '@/components/ui/Card'

export function VerificationExtractedData({ title, fields }) {
  return (
    <Card>
      <div className="border-b border-border pb-4">
        <h2 className="text-[20px] font-bold text-brand-navy">
          {title}
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-4"
          >
            <div>
              <p className="text-[12px] text-ink-faint">
                {field.label}
              </p>

              <p
                dir={field.dir}
                className="mt-1 text-[17px] font-bold text-ink"
              >
                {field.value}
              </p>
            </div>

            <CheckCircle2
              size={18}
              className="shrink-0 text-success"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}