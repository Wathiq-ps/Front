'use client'

import { useEffect, useState } from 'react'
import { logout } from '@/features/auth/services/authService'
import Link            from 'next/link'
import { useSidebar }  from '@/context/SidebarContext'
import { useLang }     from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import { WathiqLogo }  from '@/components/ui/WathiqLogo'
import { cn }          from '@/lib/utils'
import { VERIFICATION_TYPES } from '@/features/verification/config/verification.config'

/* ── Nav groups matching the reference image ── */
const NAV_GROUPS = [
  {
    groupKey: null,
    items: [{ key: 'home', href: '/dashboard', icon: 'dashboard' }],
  },
  {
    groupKey: 'verification',
    items: [{ key: 'verifyCenter', href: '/dashboard/verification', icon: 'shield' }],  
  },  
  {
    groupKey: 'management',
    items: [
      { key: 'users',      href: '/dashboard/users',      icon: 'users'     },
      { key: 'properties', href: '/dashboard/properties', icon: 'building'  },
      { key: 'contracts',  href: '/dashboard/contracts',  icon: 'contracts' },
      { key: 'lawyers',    href: '/dashboard/lawyers',    icon: 'gavel'     },
      { key: 'financial',  href: '/dashboard/financial',  icon: 'financial' },
    ],
  },
  {
    groupKey: 'knowledge',
    items: [{ key: 'activities', href: '/dashboard/activities', icon: 'clock' }],
  },
  {
    groupKey: 'system',
    items: [{ key: 'settings', href: '/dashboard/settings', icon: 'settings' }],
  },
]

/* ── SVG Icons ── */
function Icon({ type, active }) {
  const c = active ? 'var(--color-white)' : 'var(--color-sidebar-text)'
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,}
  if (type === 'dashboard') return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
  if (type === 'shield')    return <svg {...p}><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z"/><polyline points="9 12 11 14 15 10"/></svg>
  if (type === 'users')     return <svg {...p}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></svg>
  if (type === 'building')  return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="1.5"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  if (type === 'contracts') return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  if (type === 'gavel')     return <svg {...p}><path d="M14.5 9.5l-5-5-7 7 5 5z"/><path d="M9.5 4.5l5 5"/><line x1="14" y1="16" x2="21" y2="22"/></svg>
  if (type === 'financial') return <svg {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  if (type === 'clock')     return <svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 15.5"/></svg>
  if (type === 'settings')  return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  if (type === 'logout')    return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--color-sidebar-text)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0 }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  return null
}

/* ── Nav item ── */
function NavItem({ item, pathname, t, isRtl, closeMobile  }) {
  const active =
    pathname === item.href ||
    (item.href !== '/dashboard' && pathname.startsWith(item.href))

return (
  <div
    className={cn(
      'sidebar-nav-item',
      isRtl
        ? 'sidebar-nav-item-rtl'
        : 'sidebar-nav-item-ltr',
    )}
  >
    <span
      className={cn(
        'sidebar-nav-node',
        active && 'sidebar-nav-node-active',
        isRtl
          ? 'sidebar-nav-node-rtl'
          : 'sidebar-nav-node-ltr',
      )}
      aria-hidden="true"
    />

      <Link
        href={item.href}
        aria-label={t[item.key]}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'sidebar-nav-link',
          active && 'sidebar-nav-link-active',
        )}
        onClick={closeMobile}
      >
        <span className="sidebar-nav-icon">
          <Icon type={item.icon} active={active} />
        </span>

        <span className="sidebar-nav-label">
          {t[item.key]}
        </span>

        {item.badge != null && (
          <span className="sidebar-nav-badge">
            {item.badge}
          </span>
        )}
      </Link>
    </div>
  )
}

/* ── Main Sidebar ── */
export function Sidebar() {
  const { mobileOpen, closeMobile } = useSidebar()
  const { t }    = useLang()
  const pathname = usePathname()
  const isRtl    = t.dir === 'rtl'
  const [identityCount, setIdentityCount] = useState(0)

  useEffect(() => {
    const fetchIdentityCount = async () => {
      try {
        const response = await fetch('/api/verification/identity?page=1')

        if (!response.ok) return

        const result = await response.json()

        setIdentityCount(result.meta?.total ?? 0)
      } catch {
        setIdentityCount(0)
      }
    }

    fetchIdentityCount()
  }, [])
  const verificationCount =
  identityCount +
  VERIFICATION_TYPES.property.count +
  VERIFICATION_TYPES.lawyers.count

  return (
    <>
      {/* Overlay */}
      <div
        className={cn('sidebar-backdrop', mobileOpen && 'visible')}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <aside
        className={cn('sidebar', mobileOpen && 'mobile-open')}
        aria-label={t.common.sidebarNavigation}
      >
        {/* ── Logo ── */}
        <div className="sidebar-logo">
          <span className="logo-full">
            <WathiqLogo variant="full" size="md" />
          </span>
          <span className="logo-icon">
            <WathiqLogo variant="icon" size="lg" />
          </span>
        </div>

        {/* ── Nav ── */}
        <nav
          className="sidebar-nav"
          aria-label={t.common.navigation}
        >
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi} className="sidebar-nav-group">
              {/* Group label */}
              {group.groupKey && (
                <div
                  className={cn(
                    'sidebar-nav-group-label',
                    isRtl
                      ? 'sidebar-nav-group-label-rtl'
                      : 'sidebar-nav-group-label-ltr',
                  )}
                >
                  <span
                    className="sidebar-nav-group-marker"
                    aria-hidden="true"
                  />
                  <span>{t[group.groupKey]}</span>
                </div>
              )}
              {/* Items */}
              {group.items.map(item => (
                <NavItem
                  key={item.key}
                  item={
                    item.key === 'verifyCenter'
                      ? { ...item, badge: verificationCount }
                      : item
                  }
                  pathname={pathname}
                  t={t}
                  isRtl={isRtl}
                  closeMobile={closeMobile}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* ── Divider ── */}
        <div className="sidebar-divider" />

        {/* ── Logout ── */}
        <div className="sidebar-footer">
          <button
            type="button"
            aria-label={t.common.signOut}
            onClick={async () => {
              await logout()
              window.location.assign('/login')
            }}
            className="sidebar-logout"
          >
            <Icon type="logout" active={false} />
            <span>{t.common.signOut}</span>
          </button>
        </div>
      </aside>
    </>
  )
}