import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown, ArrowRight, Dumbbell, LayoutGrid, Sparkles, HeartPulse, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSession } from '@/lib/store'
import { Button } from '@/components/ui'
import { openPlanFinder } from '@/lib/planFinderBus'

/* ----------------------- Mega menu data ----------------------- */
const PROGRAMS_MENU = [
  { to: '/programs', icon: Dumbbell, title: 'Programs', desc: 'Explore science-based training programs.' },
  { to: '/templates', icon: LayoutGrid, title: 'Templates', desc: 'Ready-made training templates & plans.' },
  { to: '/courses', icon: HeartPulse, title: 'Courses', desc: 'Structured courses with video lessons.' },
]

const ABOUT_MENU = [
  { to: '/about', icon: Users, title: 'About Coach Nati', desc: 'Meet your head coach & transformation specialist.' },
  { to: '/contact', icon: Sparkles, title: 'Contact', desc: 'Book a free call and start your journey.' },
]

function DropdownPanel({ items }: { items: { to: string; icon: typeof Dumbbell; title: string; desc: string }[] }) {
  return (
    <div className="w-72 rounded-2xl border border-border bg-surface-card p-3 shadow-card-hover">
      {items.map((it) => (
        <Link key={it.to} to={it.to} className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-surface-subtle">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
            <it.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 text-sm font-bold text-content">
              {it.title}
              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-content-muted">{it.desc}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}

function MenuGroup({
  label,
  open,
  onToggle,
  panel,
}: {
  label: string
  open: boolean
  onToggle: (v: boolean) => void
  panel: React.ReactNode
}) {
  return (
    <div className="relative" onMouseEnter={() => onToggle(true)} onMouseLeave={() => onToggle(false)}>
      <button
        onClick={() => onToggle(!open)}
        className={cn(
          'flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
          open ? 'text-accent' : 'text-content-muted hover:text-white',
        )}
      >
        {label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
{ to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<'programs' | 'about' | null>(null)
  const location = useLocation()
  const session = getSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMenu(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-all duration-300',
          scrolled ? 'glass border-b border-border py-3 shadow-header' : 'bg-nav/80 py-4 backdrop-blur-md',
        )}
      >
        <div className="container-shell relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Coach Nati home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-105">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Coach<span className="text-accent">Nati</span>
            </span>
          </Link>

          {/* Centered nav */}
          <nav className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex" aria-label="Main navigation">
            <div className="pointer-events-auto flex items-center gap-1">
              {LINKS.map((l) =>
                l.to === '/programs' ? (
                  <MenuGroup key={l.to} label={l.label} open={menu === 'programs'} onToggle={(v) => setMenu(v ? 'programs' : null)} panel={<DropdownPanel items={PROGRAMS_MENU} />} />
                ) : l.to === '/about' ? (
                  <MenuGroup key={l.to} label={l.label} open={menu === 'about'} onToggle={(v) => setMenu(v ? 'about' : null)} panel={<DropdownPanel items={ABOUT_MENU} />} />
                ) : l.to === '/pricing' ? (
                  <button
                    key={l.to}
                    type="button"
                    onClick={openPlanFinder}
                    className="rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors text-content-muted hover:text-white"
                  >
                    {l.label}
                  </button>
                ) : (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                        isActive ? 'text-white' : 'text-content-muted hover:text-white',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ),
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-3 md:flex">
              {session ? (
                <Link to={session.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="ghost" size="sm" className="text-content-muted hover:text-white">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-content-muted hover:text-white">
                    Sign in
                  </Button>
                </Link>
              )}
              <Button variant="accent" size="sm" onClick={openPlanFinder} className="group">
                Get Started
              </Button>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-white transition-colors hover:bg-surface-subtle xl:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const session = getSession()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-nav"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
          <div className="container-shell relative flex items-center justify-between py-4">
            <span className="flex items-center gap-2.5 text-lg font-bold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              Coach<span className="text-accent">Nati</span>
            </span>
            <button onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-xl border border-border text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="container-shell relative flex flex-1 flex-col gap-1 py-4" aria-label="Mobile navigation">
            {LINKS.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                {l.to === '/pricing' ? (
                  <button
                    onClick={() => {
                      openPlanFinder()
                      onClose()
                    }}
                    className="block w-full border-b border-border py-4 text-left text-xl font-semibold text-white/90 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link to={l.to} onClick={onClose} className="block border-b border-border py-4 text-xl font-semibold text-white/90 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <div className="mt-8 space-y-3 pb-safe-lg">
              <button
                onClick={() => {
                  openPlanFinder()
                  onClose()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 text-base font-semibold text-white shadow-glow active:scale-[0.98]"
              >
                Get Started
              </button>
              {session ? (
                <Link to={session.role === 'admin' ? '/admin' : '/dashboard'} onClick={onClose} className="block w-full rounded-xl border border-border py-4 text-center font-semibold text-white transition-colors hover:border-accent/40 hover:text-accent">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={onClose} className="block w-full rounded-xl border border-border py-4 text-center font-semibold text-white transition-colors hover:border-accent/40 hover:text-accent">
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}