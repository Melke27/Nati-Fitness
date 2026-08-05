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
    <section className={cn('relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20', dark && 'bg-primary text-white')}>
      <div className={cn('pointer-events-none absolute inset-0', dark ? 'grid-pattern opacity-20' : 'bg-hero-glow')} />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-24 right-[-8%] h-80 w-80 rounded-full blur-[120px]',
          dark ? 'bg-accent/15' : 'bg-accent/10',
        )}
      />
      <div className="container-shell relative">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-1.5 text-xs font-bold text-content-faint"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition hover:text-accent-dark dark:hover:text-accent">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={dark ? 'text-accent' : 'text-content'}>{crumb}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em]',
              dark ? 'border border-accent/30 bg-accent/10 text-accent' : 'border border-accent/30 bg-accent/10 text-primary dark:text-accent',
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn('mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl', dark ? 'text-white' : 'text-content')}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className={cn('mt-5 max-w-2xl text-base leading-relaxed sm:text-lg', dark ? 'text-white/60' : 'text-content-muted')}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
