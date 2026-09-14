/**
 * Locale configuration for date/number formatting per country.
 */
export const DATE_FORMATS = {
  'ar-SA': { calendar: 'islamic', style: 'long' },
  'ar-AE': { calendar: 'gregory', style: 'long' },
  'ar-EG': { calendar: 'gregory', style: 'long' },
  default:  { calendar: 'gregory', style: 'long' },
}

function normalizeLocale(locale = 'ar') {
  return locale === 'ar' ? 'ar' : 'en'
}

export function formatDate(date) {
  const value = date instanceof Date ? date : new Date(date)

  const day = String(value.getDate()).padStart(2, '0')
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const year = value.getFullYear()

  return `${day}/${month}/${year}`
}

export function formatDateTime(date, locale = 'ar') {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    calendar: 'gregory',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date instanceof Date ? date : new Date(date))
}