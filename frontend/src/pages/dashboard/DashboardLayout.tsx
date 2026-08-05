import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Dumbbell, Salad, TrendingUp, MessageSquare, Calendar, Library, LogOut, Zap, Menu, X, Sun, Moon,
} from 'lucide-react'
import { useState } from 'react'
import { getSession, setSession, useDB } from '@/lib/store'
import { useTheme } from '@/context/ThemeContext'
import { Avatar, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/dashboard/nutrition', label: 'Nutrition', icon: Salad },
  { to: '/dashboard/progress', label: 'Progress', icon: TrendingUp },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { to: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  { to: '/dashboard/resources', label: 'Resources', icon: Library },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const session = getSession()
  const db = useDB()
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!session) {
      navigate('/login')
      return
    }
    if (session.role !== 'client') {
      navigate('/admin')
    }
  }, [session, navigate])

  if (!session || session.role !== 'client') return null

  const client = db.clients.find((c) => c.userId === session.userId)
  const unread = db.messages.filter((m) => m.clientId === client?.id && m.sender === 'coach' && !m.read).length
  const unreadNotifs = db.notifications.filter((n) => n.clientId === client?.id && !n.read).length

  const logout = () => {
    setSession(null)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-surface-subtle/40">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-surface transition-transform duration-300 lg:translate-x-0 lg:static',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-accent">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="text-base font-black text-content">Coach<span className="text-accent-dark dark:text-accent">Nati</span></span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-content lg:hidden" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2" aria-label="Dashboard navigation">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all',
                    isActive ? 'bg-primary text-accent shadow-card dark:bg-surface-solid dark:text-accent' : 'text-content-muted hover:bg-surface-subtle hover:text-content dark:hover:bg-surface-subtle',
                  )
                }
              >
                <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                {item.label}
                {item.label === 'Messages' && unread > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-error px-1 text-[10px] font-black text-white">{unread}</span>
                )}
                {item.label === 'Overview' && unreadNotifs > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-warning px-1 text-[10px] font-black text-white">{unreadNotifs}</span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-surface-subtle/70 p-3 dark:bg-surface-subtle">
              <Avatar name={session.name} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-xs font-black text-content">{session.name}</p>
                <Badge variant="success" className="mt-0.5 px-2 py-0 text-[9px]">{client?.status}</Badge>
              </div>
            </div>
            <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-black text-content-muted transition hover:border-error/40 hover:text-error">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border glass px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-content lg:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </button>
            <Link to="/" className="text-xs font-bold text-content-muted hover:text-content">View public site ↗</Link>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:text-content" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/dashboard/messages" className="relative grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:text-content" aria-label="Messages">
              <MessageSquare className="h-4 w-4" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-error" />}
            </Link>
            <span className="hidden h-8 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <Avatar name={session.name} size="sm" />
              <div className="hidden sm:block">
                <p className="text-xs font-black text-content">{session.name}</p>
                <p className="text-[10px] font-bold text-content-faint">Client</p>
              </div>
            </div>
          </div>
        </header>

        <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
