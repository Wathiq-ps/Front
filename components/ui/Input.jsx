import { cn }       from '@/lib/utils'
export function Input({ label, error, iconStart, iconEnd, onIconEndClick, className, ...props }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label className="text-[13.5px] font-semibold text-ink font-family-base">
          {label}
        </label>
      )}
      <div className="relative">
        {iconStart && (
          <span className="pointer-events-none absolute inset-y-0 start-3.5 flex items-center text-ink-faint">
            {iconStart}
          </span>
        )}
        <input
          className={cn('box-border w-full rounded-xl border-[1.5px] px-4 py-[13px]',
            'bg-surface-input font-sans text-sm text-ink outline-none',
            'placeholder:text-ink-placeholder',
            'transition-[border-color,background-color,box-shadow] duration-150',
            'focus:border-brand-navy focus:bg-white focus:ring-[3px] focus:ring-brand-navy/10',
            error
            ? 'border-danger bg-surface-error focus:border-danger focus:ring-danger/12'
            : 'border-border-strong',
            iconStart ? 'ps-12' : '',
            iconEnd ? 'pe-12' : '',
            className
          )}
          {...props}
        />
        {iconEnd && (
          <button
            type="button"
            onClick={onIconEndClick}
            className="absolute inset-y-0 end-3.5 flex items-center border-0 bg-transparent text-ink-faint transition-colors duration-150 hover:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30"
          >
            {iconEnd}
          </button>
        )}
      </div>
      {error && (
        <p role="alert" style={{ fontSize: 12, color: 'var(--color-danger)', fontFamily: 'var(--font-family-base)', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  )
}
