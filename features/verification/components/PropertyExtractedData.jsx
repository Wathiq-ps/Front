'use client'

import { CheckCircle2 } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'

export function PropertyExtractedData({ details }) {
  const { t, locale } = useLang()
  const getLocalizedValue = (value) => {
    if (!value) return '—'

    if (typeof value === 'object') {
        return value[locale] ?? value.ar ?? value.en ?? '—'
    }
    return value
    }
  const fields = [
    {
      label: t.verificationCenter.detail.propertyOwner,
      value: getLocalizedValue(details?.ownerName),
    },
    {
      label: t.verificationCenter.detail.identityNumber,
      value: details?.identityNumber ?? '—',
      dir: 'ltr',
    },
    {
      label: t.verificationCenter.detail.propertyType,
      value:
        details?.propertyType
          ? t.verificationCenter.propertyTypes[details.propertyType] ??
            details.propertyType
          : '—',
    },
    {
        label: t.verificationCenter.detail.area,
        value: details?.area
        ? `${details.area} ${t.verificationCenter.detail.areaUnit}`
        : '—',
        dir: 'ltr',
    },
    {
      label: t.verificationCenter.detail.city,
      value: getLocalizedValue(details?.city),
    },
  ]

  return (
    <Card>
      <div className="border-b border-border pb-4">
        <h2 className="text-[20px] font-bold text-brand-navy">
          {t.verificationCenter.detail.extractedData}
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.label}
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