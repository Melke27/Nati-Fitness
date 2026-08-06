import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, TrendingUp, TrendingDown, Inbox } from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'

/* ---------- Glass / Card ---------- */
export function Glass({ className, children, hover = false }: { className?: string; children: ReactNode; hover?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface-card shadow-card',
        hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ---------- Stat card ---------- */
export function StatCard({
  label,
  value,
  sub,
  trend,
  icon,
  iconBg = 'bg-accent/10 text-accent',
  spark,
  onClick,
}: {
  label: string
  value: ReactNode
  sub?: string
  trend?: number
  icon?: ReactNode
  iconBg?: string
  spark?: number[]
  onClick?: () => void
}) {
  return (
    <Glass hover className="p-5" {...(onClick ? { onClick } : {})}>
      <div className="flex items-start justify-between">
        <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', iconBg)}>{icon}</span>
        {trend !== undefined && (
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black',
              trend >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error',
            )}
          >
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-black tracking-tight text-content">{value}</p>
      <p className="text-xs font-bold text-content-muted">{label}</p>
      {sub && <p className="mt-1 text-[10px] font-semibold text-content-faint">{sub}</p>}
      {spark && <Sparkline data={spark} className="mt-3 h-8" />}
    </Glass>
  )
}

/* ---------- Sparkline ---------- */
export function Sparkline({ data, className, color = '#E11D48' }: { data: number[]; className?: string; color?: string }) {
  if (data.length < 2) return null
  const W = 100
  const H = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = W / (data.length - 1)
  const pts = data.map((v, i) => `${(i * step).toFixed(1)},${(H - 3 - ((v - min) / range) * (H - 6)).toFixed(1)}`).join(' ')
  const id = `spk-${color.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={cn('w-full', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts} ${W},${H}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Page header ---------- */
export function PageHeader({ title, sub, actions, icon }: { title: string; sub?: string; actions?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary dark:text-accent">{icon}</span>}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-content">{title}</h1>
          {sub && <p className="text-sm text-content-muted">{sub}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}

/* ---------- Avatar with image ---------- */
export function ImgAvatar({ name, src, className, size = 'md' }: { name: string; src?: string; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = { sm: 'h-8 w-8 text-[10px]', md: 'h-10 w-10 text-xs', lg: 'h-14 w-14 text-sm', xl: 'h-20 w-20 text-lg' }
  return (
    <div className={cn('relative shrink-0 overflow-hidden rounded-full bg-cta-gradient font-black text-primary', sizes[size], className)}>
      {src ? <img src={src} alt={name} loading="lazy" className="h-full w-full object-cover" /> : <span className="grid h-full w-full place-items-center">{getInitials(name)}</span>}
    </div>
  )
}

/* ---------- Segmented control ---------- */
export function Segmented<T extends string>({ options, value, onChange }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            'relative rounded-full px-4 py-2 text-xs font-black transition-colors',
            value === o.id ? 'text-primary' : 'text-content-muted hover:text-content',
          )}
        >
          {value === o.id && <motion.span layoutId="seg-pill" className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ---------- Search input ---------- */
export function SearchInput({ value, onChange, placeholder, className }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search…'}
        className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 dark:bg-surface-subtle"
      />
    </div>
  )
}

/* ---------- Empty state ---------- */
export function EmptyState({ title, sub, action, icon }: { title: string; sub?: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-14 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface-subtle text-content-faint dark:bg-surface-subtle">
        {icon ?? <Inbox className="h-6 w-6" />}
      </span>
      <p className="font-black text-content">{title}</p>
      {sub && <p className="mt-1 max-w-sm text-xs text-content-muted">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

/* ---------- Progress ring ---------- */
export function Ring({ value, size = 44, stroke = 5, color = '#E11D48', label, className }: { value: number; size?: number; stroke?: number; color?: string; label?: ReactNode; className?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('relative inline-grid place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * v) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute text-center text-[10px] font-black">{label ?? `${Math.round(v)}%`}</div>
    </div>
  )
}

/* ---------- Drawer ---------- */
export function Drawer({ open, onClose, children, width = 'max-w-lg' }: { open: boolean; onClose: () => void; children: ReactNode; width?: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className={cn('absolute inset-y-0 right-0 w-full overflow-y-auto border-l border-border bg-surface-solid dark:bg-surface', width)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Progress bar ---------- */
export function MiniBar({ value, color = 'bg-cta-gradient', className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-solid/10', className)}>
      <motion.div className={cn('h-full rounded-full', color)} initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, value)}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
    </div>
  )
}
