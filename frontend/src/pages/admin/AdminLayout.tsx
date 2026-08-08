import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCheck, MessageSquareText, HeartPulse, CalendarCheck2, CalendarDays, Wallet, BellRing,
  ChevronLeft, ChevronRight, LogOut, Sun, Moon, Search,
  Zap, Menu, X, ExternalLink, TrendingUp,
} from 'lucide-react'
import { getSession, setSession, useDB } from '@/lib/store'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'
import { AVATARS } from '@/lib/media'

const NAV_GROUPS: { title: string; items: { to: string; label: string; icon: typeof Users; badge?: 'clients' | 'appointments' | 'leads' | 'messages' | 'requests' }[] }[] = [
  {
    title: 'Coaching',
    items: [
      { to: '/admin', label: 'Overview', icon: LayoutDashboard, badge: 'leads' },
      { to: '/admin/members', label: 'Members', icon: Users, badge: 'clients' },
      { to: '/admin/messaging', label: 'Messaging', icon: MessageSquareText, badge: 'messages' },
      { to: '/admin/schedule', label: 'Schedule', icon: CalendarDays },
    ],
  },
  {
    title: 'Client Success',
    items: [
      { to: '/admin/progress', label: 'Progress', icon: HeartPulse },
    ],
  },
  {
    title: 'Business',
    items: [
      { to: '/admin/requests', label: 'Requests', icon: UserCheck, badge: 'requests' },
      { to: '/admin/payments', label: 'Payments', icon: Wallet, badge: 'appointments' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/admin/notifications', label: 'Notifications', icon: BellRing },
    ],
  },
]

function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <span className={cn('grid shrink-0 place-items-center rounded-xl bg-cta-gradient shadow-glow', s)}>
      <Zap className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} fill="currentColor" />
    </span>
  )
}

export default function AdminLayout() {
  const navigate = useNavigate()
  const session = getSession()
  const db = useDB()
  const { theme, toggle } = useTheme()
  const toast = useToast()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  useEffect(() => {
    if (!session) {
      navigate('/login')
      return
    }
    if (session.role !== 'admin') navigate('/dashboard')
  }, [session, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setNotifOpen(false)
  }, [location.pathname])

  const activeClients = db.clients.filter((c) => c.status === 'active').length
  const pendingAppointments = db.appointments.filter((a) => a.status === 'new').length
  const unreadCoach = db.messages.filter((m) => m.sender === 'client' && !m.read).length
  const leads = db.leads.length
  const pendingRequests = db.memberRequests.filter((r) => r.status === 'pending').length

  const badges = { clients: activeClients, appointments: pendingAppointments, leads, messages: unreadCoach, requests: pendingRequests }

  const notificationItems = useMemo(() => {
    const items: { id: string; icon: ReactNode; title: string; body: string; time: string; tone: string }[] = []
    db.appointments.filter((a) => a.status === 'new').slice(0, 3).forEach((a) =>
      items.push({ id: `n-app-${a.id}`, icon: <CalendarCheck2 className="h-4 w-4" />, title: `New consultation — ${a.name}`, body: `${a.type} · ${a.date} at ${a.time}`, time: new Date(a.createdAt).toLocaleDateString(), tone: 'bg-accent/15 text-primary dark:text-accent' }),
    )
    db.leads.slice(-3).forEach((l) =>
      items.push({ id: `n-lead-${l.id}`, icon: <TrendingUp className="h-4 w-4" />, title: `New lead — ${l.name}`, body: `Goal: ${l.goal}`, time: new Date(l.createdAt).toLocaleDateString(), tone: 'bg-pink-500/15 text-pink-500' }),
    )
    db.memberRequests.filter((r) => r.status === 'pending').slice(0, 3).forEach((r) =>
      items.push({ id: `n-req-${r.id}`, icon: <UserCheck className="h-4 w-4" />, title: `Membership request — ${r.name}`, body: `${r.program} · ${r.plan} · ${r.method}`, time: new Date(r.createdAt).toLocaleDateString(), tone: 'bg-accent/15 text-primary dark:text-accent' }),
    )
    db.messages.filter((m) => m.sender === 'client').slice(-3).forEach((m) =>
      items.push({ id: `n-msg-${m.id}`, icon: <MessageSquareText className="h-4 w-4" />, title: `Message from ${m.senderName}`, body: m.text.slice(0, 60), time: new Date(m.createdAt).toLocaleDateString(), tone: 'bg-sky-500/15 text-sky-500' }),
    )
    items.sort((a, b) => (a.time < b.time ? 1 : -1))
    return items
  }, [db])

  const logout = () => {
    setSession(null)
    toast?.success('Signed out')
    navigate('/')
  }

  if (!session || session.role !== 'admin') return null

  const currentItem = NAV_GROUPS.flatMap((g) => g.items).find((i) => (i.to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(i.to)))

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-surface-subtle/40 dark:bg-[#0a0c10]">
      {/* ---------- Sidebar ---------- */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-surface-solid shadow-[2px_0_20px_rgba(0,0,0,0.04)] transition-all duration-300 dark:bg-[#0d1014]',
          collapsed ? 'w-20' : 'w-72',
          mobileOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Brand */}
        <div className={cn('flex items-center gap-3 px-5 py-5', collapsed && 'justify-center px-2')}>
          <BrandMark />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-base font-black text-content">Coach<span className="text-accent-dark dark:text-accent">Nati</span></p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-content-faint">Coach Studio</p>
            </div>
          )}
          <button onClick={() => setMobileOpen(false)} className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-border text-content lg:hidden" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Coach chip */}
        {!collapsed && (
          <div className="mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-accent/25 bg-cta-gradient/5 p-3">
            <img src={AVATARS.coach} alt={session.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/40" />
            <div className="min-w-0">
              <p className="truncate text-xs font-black text-content">{session.name}</p>
              <p className="text-[10px] font-bold text-accent-dark dark:text-accent">● Online · accepting clients</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-3 flex justify-center">
            <img src={AVATARS.coach} alt={session.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/40" />
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2 [scrollbar-width:thin]" aria-label="Coach navigation">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              {!collapsed && <p className="mb-1 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-content-faint">{group.title}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = item.to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.to)
                  const badge = item.badge ? badges[item.badge] : 0
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/admin'}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all',
                        collapsed && 'justify-center px-2',
                        isActive ? 'text-primary' : 'text-content-muted hover:bg-surface-subtle hover:text-content',
                      )}
                    >
                      {isActive && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl bg-cta-gradient shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <item.icon className={cn('relative h-[18px] w-[18px] shrink-0', isActive ? 'text-primary' : 'text-content-faint group-hover:text-content-muted')} />
                      {!collapsed && <span className="relative truncate">{item.label}</span>}
                      {!collapsed && badge > 0 && (
                        <span className={cn('relative ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-black', isActive ? 'bg-primary/20 text-primary' : 'bg-accent/15 text-accent-dark dark:text-accent')}>{badge}</span>
                      )}
                      {collapsed && badge > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <div className={cn('flex flex-col gap-2', collapsed && 'items-center')}>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="hidden w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-black text-content-muted transition hover:border-accent/40 hover:text-content lg:flex"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {!collapsed && 'Collapse'}
            </button>
            <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-black text-content-muted transition hover:border-error/50 hover:text-error">
              <LogOut className="h-4 w-4" /> {!collapsed && 'Sign out'}
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden />}

      {/* ---------- Main ---------- */}
      <div className={cn('flex min-w-0 flex-1 flex-col transition-all duration-300', collapsed ? 'lg:pl-20' : 'lg:pl-72')}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-content lg:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </button>

          {/* Command search */}
          <button onClick={() => setCmdOpen(true)} className="group flex h-10 flex-1 items-center gap-3 rounded-full border border-border bg-surface-subtle px-4 text-sm text-content-faint transition hover:border-accent/40 max-w-xl">
            <Search className="h-4 w-4" />
            <span className="truncate">Search members, workouts, pages…</span>
            <kbd className="ml-auto hidden rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-black text-content-faint sm:inline">⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-black text-content-muted transition hover:border-accent/40 hover:text-content sm:flex">
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </Link>
            <button onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:text-content" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen((v) => !v)} className="relative grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:text-content" aria-label="Notifications">
                <BellRing className="h-4 w-4" />
                {notificationItems.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error ring-2 ring-surface-solid" />}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-surface-solid shadow-lift dark:bg-surface">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <p className="text-sm font-black text-content">Notifications</p>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-black text-accent-dark dark:text-accent">{notificationItems.length} new</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notificationItems.length === 0 ? (
                        <p className="px-4 py-8 text-center text-xs font-bold text-content-faint">You’re all caught up</p>
                      ) : (
                        notificationItems.map((n) => (
                          <button key={n.id} onClick={() => setNotifOpen(false)} className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-surface-subtle/60">
                            <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', n.tone)}>{n.icon}</span>
                            <span className="min-w-0">
                              <span className="block truncate text-xs font-black text-content">{n.title}</span>
                              <span className="block truncate text-[11px] text-content-muted">{n.body}</span>
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                    <Link to="/admin/notifications" onClick={() => setNotifOpen(false)} className="block border-t border-border px-4 py-3 text-center text-xs font-black text-accent-dark hover:underline dark:text-accent">
                      View all notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <Link to="/admin" className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-border transition hover:ring-accent">
              <img src={AVATARS.coach} alt={session.name} className="h-full w-full object-cover" />
            </Link>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-4 pt-5 text-xs font-bold text-content-faint sm:px-6">
          <span>Coach Studio</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-accent-dark dark:text-accent">{currentItem?.label ?? 'Overview'}</span>
        </div>

        <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </motion.main>
      </div>

      {/* ---------- Command palette ---------- */}
      <AnimatePresence>
        {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

/* ---------------- Command palette ---------------- */
function CommandPalette({ onClose }: { onClose: () => void }) {
  const db = useDB()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  const pages = NAV_GROUPS.flatMap((g) => g.items).map((i) => ({ ...i, kind: 'Page' as const }))
  const members = db.clients.map((c) => ({ to: `/admin/members/${c.id}`, label: c.name, icon: Users, kind: 'Member' as const }))

  const results = [...pages, ...members].filter(
    (r) => r.label.toLowerCase().includes(q.toLowerCase()) || (r as { to?: string }).to?.toLowerCase().includes(q.toLowerCase()),
  ).slice(0, 12)

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      if (e.key === 'Enter' && results[active]) { navigate(results[active].to); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [q, active, results, onClose, navigate])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ y: -12, scale: 0.99, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -12, scale: 0.99, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto mt-[12vh] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-border bg-surface-solid shadow-lift dark:bg-surface"
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 text-content-faint" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a command or search…" className="flex-1 bg-transparent text-sm text-content placeholder:text-content-faint focus:outline-none" />
          <kbd className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-black text-content-faint">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-xs font-bold text-content-faint">No results for “{q}”</p>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.kind}-${r.to}-${r.label}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => { navigate(r.to); onClose() }}
                className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition', i === active ? 'bg-cta-gradient text-primary' : 'text-content')}
              >
                <r.icon className={cn('h-4 w-4', i === active ? 'text-primary' : 'text-content-faint')} />
                <span className="flex-1 truncate">{r.label}</span>
                <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider', i === active ? 'bg-primary/20 text-primary' : 'bg-surface-subtle text-content-faint')}>{r.kind}</span>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
