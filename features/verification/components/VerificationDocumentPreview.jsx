'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

import { useLang } from '@/context/LanguageContext'

export function VerificationDocumentPreview({
  src,
  alt,
  width = 600,
  height = 400,
}) {
  const { t } = useLang()
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-1">
        {src && !imageError ? (
          <button
            type="button"
            onClick={() => setSelectedImage({ src, alt })}
            className="block w-full cursor-zoom-in"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto max-h-[400px] w-full rounded-xl object-contain"
              onError={() => setImageError(true)}
            />
          </button>
        ) : (
          <span className="text-sm text-ink-faint">
            {imageError
              ? t.verificationCenter.detail.imageLoadError
              : t.verificationCenter.detail.noImage}
          </span>
        )}
      </div>

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
              className="absolute end-3 top-3 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-ink shadow-md transition-colors hover:bg-surface-1"
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
    </>
  )
}