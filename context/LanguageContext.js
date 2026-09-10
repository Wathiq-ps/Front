'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import ar from '@/config/translations/ar'
import en from '@/config/translations/en'

export const translations = {
  ar,
  en,
}

// ── Context ───────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null)
export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('ar')

  const t = translations[locale]
  const toggleLanguage = () => setLocale((l) => (l === 'ar' ? 'en' : 'ar'))

  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir)
    document.documentElement.setAttribute('lang', t.lang)
  }, [t.dir, t.lang])

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}