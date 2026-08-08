import {
  forwardRef,
  useState,
  useEffect,
  cloneElement,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  type ReactElement,
  type SelectHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

/* ---------------- Button ---------------- */

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'dark' | 'soft' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-surface-solid text-content-inverse hover:opacity-90 active:scale-[0.98] shadow-soft',
  accent:
    'bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-glow btn-ripple',
  outline:
    'border border-border bg-transparent text-content hover:border-accent/50 hover:bg-accent/5 active:scale-[0.98]',
  ghost: 'text-content-muted hover:bg-surface-subtle hover:text-content active:scale-[0.98]',
  dark: 'bg-primary text-white border border-border hover:border-accent/30 active:scale-[0.98] shadow-card',
  soft: 'bg-accent/10 text-accent hover:bg-accent/15 active:scale-[0.98]',
  danger: 'bg-error/10 text-error hover:bg-error/15 active:scale-[0.98]',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-[52px] px-8 text-base gap-2.5 rounded-xl',
  xl: 'h-16 px-10 text-lg gap-3 rounded-2xl',
  icon: 'h-10 w-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, asChild, ...props }, ref) => {
    if (asChild) {
      const child = children as ReactElement<{ className?: string }>
      return cloneElement(child, {
        className: cn(
          'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none',
          buttonVariants[variant],
          buttonSizes[size],
          child.props.className,
          className,
        ),
      })
    }
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none',
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

/* ---------------- Badge ---------------- */

export function Badge({
  children,
  className,
  variant = 'default',
}: {
  children: ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline'
}) {
  const styles = {
    default: 'bg-surface-subtle text-content-muted border border-border',
    accent: 'bg-accent/10 text-accent border border-accent/25',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    outline: 'border border-border text-content-muted',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wide',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------------- Card ---------------- */

export function Card({ className, children, hover = false }: { className?: string; children: ReactNode; hover?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card-gradient p-6 shadow-card',
        hover && 'card-surface-hover',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ---------------- Inputs ---------------- */

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ className, label, id, error, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          'input-base',
          error && 'border-error focus:border-error focus:ring-error/20',
          className,
        )}
        {...props}
      />
    )
    if (!label && !error) return input
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        {input}
        {error && <p className="text-caption text-error" role="alert">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ className, label, id, error, ...props }, ref) => {
    const area = (
      <textarea
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          'input-base min-h-[120px] resize-y py-3',
          error && 'border-error focus:border-error focus:ring-error/20',
          className,
        )}
        {...props}
      />
    )
    if (!label && !error) return area
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        {area}
        {error && <p className="text-caption text-error" role="alert">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }>(
  ({ className, label, id, children, error, ...props }, ref) => {
    const select = (
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          'input-base cursor-pointer appearance-none',
          error && 'border-error focus:border-error focus:ring-error/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
    if (!label && !error) return select
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        {select}
        {error && <p className="text-caption text-error" role="alert">{error}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'

export function Label({ children, htmlFor, className }: { children: ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn('text-sm font-semibold text-content', className)}>
      {children}
    </label>
  )
}

/* ---------------- Progress ---------------- */

export function Progress({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-subtle', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className={cn('h-full rounded-full bg-cta-gradient', barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

/* ---------------- Switch ---------------- */

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        checked ? 'bg-accent' : 'bg-surface-subtle border border-border',
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn('inline-block h-5 w-5 rounded-full bg-white shadow', checked ? 'ml-auto mr-1' : 'ml-1')}
      />
    </button>
  )
}

/* ---------------- Avatar ---------------- */

export function Avatar({ name, src, className, size = 'md' }: { name: string; src?: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const sizes = { sm: 'h-8 w-8 text-[10px]', md: 'h-10 w-10 text-xs', lg: 'h-14 w-14 text-sm' }
  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden rounded-full bg-accent font-bold text-primary', sizes[size], className)}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" loading="lazy" /> : <span>{initials}</span>}
    </div>
  )
}

/* ---------------- Skeleton ---------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-xl bg-surface-subtle', className)} />
}

/* ---------------- Modal / Dialog ---------------- */

export function Modal({
  open,
  onClose,
  children,
  title,
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={cn(
              'max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-surface-card p-6 shadow-lift sm:rounded-3xl',
              className,
            )}
          >
            <div className="mb-6 flex items-center justify-between">
              {title && <h3 id="modal-title" className="text-lg font-bold text-content">{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="ml-auto grid h-9 w-9 place-items-center rounded-xl border border-border text-content-muted transition hover:bg-surface-subtle hover:text-content"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- Accordion ---------------- */

export function Accordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}

function AccordionItem({ item, index }: { item: { id: string; question: string; answer: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-border bg-surface-card"
    >
      <AccordionTrigger item={item} />
    </motion.div>
  )
}

function AccordionTrigger({ item }: { item: { id: string; question: string; answer: string } }) {
  return (
    <details className="group/acc" aria-label={item.question}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-semibold text-content sm:text-base">{item.question}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-border text-content-muted transition-all duration-300 group-open/acc:rotate-45 group-open/acc:border-accent/30 group-open/acc:bg-accent/10 group-open/acc:text-accent">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-sm leading-relaxed text-content-muted">{item.answer}</p>
      </div>
    </details>
  )
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  dark?: boolean
}) {
  return (
    <div className={cn('mb-12 flex flex-col gap-4 sm:mb-16', align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.15em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={cn(
          'max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
          dark ? 'text-white' : 'text-content',
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className={cn('max-w-2xl text-body text-content-muted', dark && 'text-white/60')}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

/* ---------------- Stat / Counter ---------------- */

export function Counter({ value, suffix = '', duration = 1.8 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {display.toLocaleString()}
      {suffix}
    </motion.span>
  )
}

/* ---------------- Empty State ---------------- */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-subtle/50 px-8 py-16 text-center">
      {icon && <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface-card text-content-muted">{icon}</div>}
      <h3 className="text-xl font-semibold text-content">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-content-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
