'use client'
import { Bell, Globe, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSession } from '@/features/auth/services/authService'

import { useLang }    from '@/context/LanguageContext'
import { useSidebar } from '@/context/SidebarContext'

export function TopBar() {
  const { t, locale, toggleLanguage } = useLang()
  const { toggleMobile } = useSidebar()
  const [admin, setAdmin] = useState(null)
  
  useEffect(() => {

    const loadSession = async () => {
      const session = await getSession()
      setAdmin(session?.user ?? null)
    }

    loadSession()
  }, [])
  const adminName = admin?.name || admin?.email || 'Admin'
  const adminInitial = adminName.charAt(0).toUpperCase()
  const adminRole = admin?.role
    ? t.common.roles?.[admin.role] || admin.role
    : ''
  return (
    <header className="topbar" role="banner">

      {/* Hamburger — mobile only */}
      <button
        className="topbar-hamburger h-[38px] w-[38px] items-center justify-center rounded-[10px] border-0 bg-transparent text-ink-muted transition-colors hover:bg-surface"
        onClick={toggleMobile}
        aria-label={t.common.openMenu}
        style={{ width: 38, height: 38, borderRadius: 10, color: 'var(--color-ink-muted)', border: 'none', background: 'transparent', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {/* User */}
      <div className="flex shrink-0 items-center gap-3">
        <div
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white shadow-[0_2px_8px_rgba(0,35,102,.2)]"
          aria-hidden="true"
        >
          {adminInitial}
        </div>

        <div className="hidden sm:block leading-[1.3]">
          <div className="text-[13px] font-semibold text-ink">
            {adminName}
          </div>

          <div className="mt-0.5 text-[11px] text-ink-faint">
            {adminRole}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="hidden h-7 w-px shrink-0 bg-border sm:block" aria-hidden="true" />

      <div className="flex-1" aria-hidden="true" />

      {/* Language */}
      <button
        onClick={toggleLanguage}xx
        aria-label={
          locale === 'ar'
            ? t.common.switchToEnglish
            : t.common.switchToArabic
        }
        className="flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[13px] font-semibold text-ink-muted transition-colors hover:bg-surface"
      >
        <Globe size={14} aria-hidden="true" />
        {locale === 'ar' ? 'EN' : 'ع'}
      </button>

      {/* Notifications */}
      <button
        aria-label={t.common.notifications}
        className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border-0 bg-transparent text-ink-muted transition-colors hover:bg-surface"
      >
        <Bell size={19} aria-hidden="true" />

        <span
          className="absolute end-[7px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-brand-gold"
          aria-hidden="true"
        />
      </button>

    </header>
  )
}