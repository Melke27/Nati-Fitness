import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  dark = false,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  crumb: string
  dark?: boolean
}) {
  return (
    <section className={cn('relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20', dark && 'bg-primary text-white')}>
      <div className={cn('pointer-events-none absolute inset-0', dark ? 'grid-pattern opacity-15' : 'bg-hero-glow')} />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-24 right-[-8%] h-80 w-80 rounded-full blur-[120px]',
          dark ? 'bg-accent/10' : 'bg-accent/8',
        )}
      />
      <div className="container-shell relative">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-1.5 text-caption text-content-faint"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition-colors hover:text-accent">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span className={dark ? 'text-accent' : 'text-content'}>{crumb}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.15em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn('mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl', dark ? 'text-white' : 'text-content')}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className={cn('mt-5 max-w-2xl text-body text-content-muted', dark && 'text-white/60')}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
