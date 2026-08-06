import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Sun, Moon, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/ThemeContext'
import { getSession } from '@/lib/store'
import { Button } from '@/components/ui'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const session = getSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleHash = (to: string) => {
    if (to.startsWith('/#')) {
      navigate('/')
      setTimeout(() => {
        document.querySelector(to.slice(2))?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-all duration-300',
          scrolled ? 'glass border-b border-border py-3 shadow-soft' : 'bg-transparent py-4',
        )}
      >
        <div className="container-shell flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Coach Nati home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary transition-transform duration-300 group-hover:scale-105">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span className="text-lg font-bold tracking-tight text-content">
              Coach<span className="text-accent">Nati</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {LINKS.map((l) =>
              l.to.includes('#') ? (
                <button
                  key={l.to}
                  onClick={() => handleHash(l.to)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-content-muted transition-colors hover:bg-surface-subtle hover:text-content"
                >
                  {l.label}
                </button>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                      isActive ? 'bg-surface-subtle text-content' : 'text-content-muted hover:bg-surface-subtle hover:text-content',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="hidden h-10 w-10 place-items-center rounded-xl border border-border text-content-muted transition-colors hover:bg-surface-subtle hover:text-content sm:grid"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
            </button>

            <div className="hidden items-center gap-3 md:flex">
              {session ? (
                <Link to={session.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
              )}
              <Button
                variant="accent"
                size="sm"
                onClick={() => navigate('/#pricing')}
                className="group rounded-full"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-content transition-colors hover:bg-surface-subtle lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onHash={handleHash} />
    </>
  )
}

function MobileMenu({ open, onClose, onHash }: { open: boolean; onClose: () => void; onHash: (to: string) => void }) {
  const { theme, toggle } = useTheme()
  const session = getSession()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col bg-primary"
        >
          <div className="grid-pattern absolute inset-0 opacity-20" />
          <div className="relative container-shell flex items-center justify-between py-4">
            <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              Coach<span className="text-accent">Nati</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border text-white transition-colors hover:bg-surface-subtle"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="relative container-shell mt-4 flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile navigation">
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {l.to.includes('#') ? (
                  <button
                    onClick={() => {
                      onClose()
                      onHash(l.to)
                    }}
                    className="block w-full border-b border-border py-4 text-left text-2xl font-bold tracking-tight text-white/90 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="block border-b border-border py-4 text-2xl font-bold tracking-tight text-white/90 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 space-y-3 pb-10"
            >
              <Link to="/#pricing" onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-cta-gradient py-4 text-base font-semibold text-primary">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-3">
                {session ? (
                  <Link to={session.role === 'admin' ? '/admin' : '/dashboard'} onClick={onClose} className="flex-1 rounded-xl border border-border py-4 text-center text-base font-semibold text-white">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" onClick={onClose} className="flex-1 rounded-xl border border-border py-4 text-center text-base font-semibold text-white">
                    Sign in
                  </Link>
                )}
                <button
                  onClick={toggle}
                  className="grid w-14 place-items-center rounded-xl border border-border text-white"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" strokeWidth={1.75} /> : <Moon className="h-5 w-5" strokeWidth={1.75} />}
                </button>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
