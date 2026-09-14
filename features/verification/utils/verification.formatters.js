import { formatDateTime } from '@/config/locales'

export function getLocalizedName(request, locale) {
  if (typeof request.name === 'object') {
    return request.name[locale] ?? request.name.ar ?? ''
  }

  return request.name ?? ''
}

function getVerificationLabel(t, group, value) {
  return t.verificationCenter[group]?.[value] ?? value
}

function getStatusLabel(request, { t }) {
  return getVerificationLabel(t, 'statuses', request.status)
}

function getDocumentTypeLabel(request, { t }) {
  return getVerificationLabel(
    t,
    'documentTypes',
    request.documentType,
  )
}

function getPropertyTypeLabel(request, { t }) {
  return getVerificationLabel(
    t,
    'propertyTypes',
    request.propertyType,
  )
}

function getSpecialtyLabel(request, { t }) {
  return getVerificationLabel(
    t,
    'specialties',
    request.specialty,
  )
}

function formatSubmittedAt(request, { locale }) {
  return formatDateTime(request.submittedAt, locale)
}

export const CELL_RENDERERS = {
  identity: {
    user: (request, { locale }) =>
      getLocalizedName(request, locale),

    documentType: getDocumentTypeLabel,

    submittedAt: formatSubmittedAt,

    status: getStatusLabel,
  },

  property: {
    requestOwner: (request, { locale }) => (
      <div>
        <div className="font-semibold text-brand-navy">
          {request.id}
        </div>

        <div className="mt-0.5 text-[11px] text-ink-faint">
          {getLocalizedName(request, locale)}
        </div>
      </div>
    ),

    propertyType: getPropertyTypeLabel,

    area: (request) => request.area,

    city: (request) => request.city,

    submittedAt: formatSubmittedAt,

    status: getStatusLabel,
  },

  lawyers: {
    lawyer: (request, { locale }) =>
      getLocalizedName(request, locale),

    licenseNumber: (request) => request.licenseNumber,

    submittedAt: formatSubmittedAt,

    specialty: getSpecialtyLabel,

    status: getStatusLabel,
  },
}

export function renderVerificationCell(
  type,
  key,
  request,
  context,
) {
  const renderer = CELL_RENDERERS[type]?.[key]

  if (!renderer) {
    return null
  }

  return renderer(request, context)
}