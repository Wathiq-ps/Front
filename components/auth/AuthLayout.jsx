'use client'
import { Globe, ChevronDown } from 'lucide-react'
import { useLang }    from '@/context/LanguageContext'
import { WathiqLogo } from '@/components/ui/WathiqLogo'

function BrandPanel() {
  const { t, locale, toggleLanguage } = useLang()
  const isRtl = t.dir === 'rtl'

  return (
    <div className="auth-navy-panel">
      {/* Language toggle */}
      <div className={`relative z-10 flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
        <button
          onClick={toggleLanguage}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-[13px] font-semibold text-white/85 transition-colors duration-150 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          <Globe size={14} aria-hidden="true" />
          <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
          <ChevronDown size={12} aria-hidden="true" />
        </button>
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 text-center">
        {/* Logo box */}
        <div className="flex items-center justify-center rounded-[28px] border border-white/18 bg-white/10 px-9 py-7">
          <WathiqLogo responsive size="lg" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col gap-3.5">
          <h1 className="m-0 font-sans text-[30px] font-extrabold leading-[1.2] text-white">
            {t.dashboardTitle}
          </h1>
           <p className="mx-auto m-0 max-w-[260px] font-sans text-[15px] leading-[1.7] text-white/60">
            {t.dashboardSub}
          </p>
        </div>
      </div>

      {/* Bottom dot */}
      <div className="relative z-10 flex justify-center">
        <div className="size-2.5 rounded-full bg-brand-gold" aria-hidden="true" />
      </div>
    </div>
  )
}

export function AuthLayout({ children }) {
  const { t } = useLang()
  return (
    <div className="auth-root">
      <div className={`auth-card ${t.dir === 'ltr' ? 'ltr' : ''}`}>
        <BrandPanel />
        <div className="auth-form-panel">
          <div className="auth-form-inner">{children}</div>
        </div>
      </div>
    </div>
  )
}
