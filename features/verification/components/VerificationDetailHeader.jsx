import { Badge } from '@/components/ui/Badge'

export function VerificationDetailHeader({
  name,
  id,
  status,
  title,
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold leading-tight text-ink">
          {name}
        </h1>

        <p className="mt-1.5 text-[12px] text-ink-faint">
          {id}
        </p>

        {title && (
          <p className="mt-1.5 text-[16px] font-semibold text-ink-muted">
            {title}
          </p>
        )}
      </div>

      <Badge variant="gold">
        {status}
      </Badge>
    </header>
  )
}