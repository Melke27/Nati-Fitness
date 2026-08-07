import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Option } from '@/lib/planFinderData'

interface Props {
  options: Option[]
  value: string
  onChange: (id: string) => void
  name: string
}

export function OptionGroup({ options, value, onChange, name }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="grid gap-3 sm:grid-cols-2"
    >
      {options.map((o) => {
        const active = value === o.id
        const Icon = o.icon
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${o.label}. ${o.description}`}
            onClick={() => onChange(o.id)}
            className={cn(
              'group flex min-h-[68px] items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              active
                ? 'border-accent bg-accent/10 shadow-glow'
                : 'border-border bg-surface-subtle/40 hover:border-accent/40 hover:bg-surface-subtle',
            )}
          >
            <span
              className={cn(
                'grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors',
                active ? 'bg-accent text-white' : 'bg-surface-card text-content-muted group-hover:text-accent',
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className={cn('block text-sm font-black', active ? 'text-accent' : 'text-content')}>{o.label}</span>
              {o.description && <span className="mt-0.5 block text-xs text-content-muted">{o.description}</span>}
            </span>
            <span
              className={cn(
                'grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all',
                active ? 'border-accent bg-accent text-white' : 'border-border bg-transparent',
              )}
              aria-hidden
            >
              {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
          </button>
        )
      })}
    </div>
  )
}