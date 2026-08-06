import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSession } from '@/lib/store'
import { Button } from '@/components/ui'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/trainers', label: 'Trainers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
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

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-all duration-300',
          scrolled ? 'glass border-b border-border py-3' : 'bg-nav/80 py-4 backdrop-blur-md',
        )}
      >
        <div className="container-shell flex items-center justify-between">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Coach Nati home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-105">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Coach<span className="text-accent">Nati</span>
            </span>
          </Link>

          <nav
            className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex"
            aria-label="Main navigation"
          >
            <div className="pointer-events-auto flex items-center gap-1">
              {LINKS.map((l) => (
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
              ))}
            </div>
          </nav>

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
              <Button variant="accent" size="sm" onClick={() => navigate('/register')} className="group">
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
          className="fixed inset-0 z-[90] flex flex-col bg-nav"
        >
          <div className="container-shell flex items-center justify-between py-4">
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

          <nav className="container-shell flex flex-1 flex-col gap-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            {LINKS.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                <Link to={l.to} onClick={onClose} className="block border-b border-border py-4 text-xl font-semibold text-white/90 hover:text-accent">
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <div className="mt-8 space-y-3 pb-10">
              <Link to="/register" onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-base font-semibold text-white">
                Get Started
              </Link>
              {session ? (
                <Link to={session.role === 'admin' ? '/admin' : '/dashboard'} onClick={onClose} className="block rounded-xl border border-border py-4 text-center font-semibold text-white">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={onClose} className="block rounded-xl border border-border py-4 text-center font-semibold text-white">
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
