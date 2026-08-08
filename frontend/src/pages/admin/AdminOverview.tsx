import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Wallet, TrendingUp, Flame, ArrowUpRight, MessageSquare, CalendarClock, Dumbbell, ChevronRight, Sparkles } from 'lucide-react'
import { useDB } from '@/lib/store'
import { formatCurrency, greeting } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { LineChart } from '@/components/charts'
import { StatCard, Glass, ImgAvatar, Ring, MiniBar } from '@/components/trainer'
import { MEDIA, AVATARS } from '@/lib/media'
import { cn } from '@/lib/utils'

export default function AdminOverview() {
  const db = useDB()

  const active = db.clients.filter((c) => c.status === 'active')
  const onboarding = db.clients.filter((c) => c.status === 'onboarding')
  const revenue = db.payments.filter((p) => p.status === 'paid').reduce((a, p) => a + p.amount, 0)
  const thisMonth = db.payments.filter((p) => p.status === 'paid' && new Date(p.createdAt).getMonth() === new Date().getMonth()).reduce((a, p) => a + p.amount, 0)

  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const m = new Date()
    m.setMonth(m.getMonth() - (5 - i))
    const total = db.payments.filter((p) => p.status === 'paid' && new Date(p.createdAt).getMonth() === m.getMonth() && new Date(p.createdAt).getFullYear() === m.getFullYear()).reduce((a, p) => a + p.amount, 0)
    return { label: m.toLocaleString('en-US', { month: 'short' }), value: total }
  })

  const clientWithGoal = (c: typeof db.clients[number]) => db.goals.filter((g) => g.clientId === c.id)[0]

  const workoutThisWeek = db.workouts.filter((w) => w.status === 'completed' && Date.now() - new Date(w.date).getTime() < 7 * 86400000).length

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome band */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-6 text-white sm:p-8">
        <img src={MEDIA.gymDark} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent"><Sparkles className="h-3.5 w-3.5" /> {greeting()}, Coach Nati</p>
            <h1 className="mt-2 max-w-md text-2xl font-black leading-tight sm:text-3xl">
              Your coaching studio is <span className="text-accent">thriving.</span>
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/60">
              {active.length} active members · {onboarding.length} onboarding · {workoutThisWeek} workouts logged this week.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/admin/members" className="rounded-full bg-cta-gradient px-6 py-2.5 text-sm font-black text-primary shadow-glow transition hover:-translate-y-0.5">Manage members</Link>
              <Link to="/admin/messaging" className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-black text-white/80 transition hover:bg-white/10">Message clients</Link>
            </div>
          </div>
          <div className="hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md sm:flex">
            <img src={AVATARS.coach} alt="Coach Nati" className="h-14 w-14 rounded-2xl object-cover" />
            <div>
              <p className="text-sm font-black">Profile strength</p>
              <p className="text-xs text-white/60">Verified coach · 4.9 rating</p>
              <div className="mt-1.5 flex items-center gap-2">
                <MiniBar value={92} className="w-28 bg-white/10" color="bg-accent" />
                <span className="text-[10px] font-black text-accent">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active members" value={active.length} sub={`${onboarding.length} in onboarding`} trend={12} icon={<Users className="h-5 w-5" />} spark={[2, 3, 3, 4, 4, 5, 5, 6]} />
        <StatCard label="Total revenue" value={formatCurrency(revenue)} sub={`${formatCurrency(thisMonth)} this month`} trend={8} icon={<Wallet className="h-5 w-5" />} iconBg="bg-success/15 text-success" spark={[40, 55, 50, 70, 65, 88, 95, 120]} />
        <StatCard label="MRR" value={formatCurrency(Math.round(thisMonth))} sub="+12% vs last month" trend={12} icon={<TrendingUp className="h-5 w-5" />} iconBg="bg-warning/15 text-warning" spark={[30, 35, 42, 40, 55, 60, 58, 72]} />
        <StatCard label="Workouts this week" value={workoutThisWeek} sub="78% plan adherence" trend={-4} icon={<Flame className="h-5 w-5" />} iconBg="bg-pink-500/15 text-pink-500" spark={[10, 12, 11, 14, 16, 15, 17, 16]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Glass className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-content">Revenue</h2>
              <p className="text-xs text-content-muted">Last 6 months</p>
            </div>
            <Badge variant="accent">{formatCurrency(monthlyRevenue.reduce((a, b) => a + b.value, 0))}</Badge>
          </div>
          <LineChart data={monthlyRevenue} height={220} />
        </Glass>

        {/* Success ring */}
        <Glass className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-black text-content">Client success</h2>
            <Badge variant="success">91% retention</Badge>
          </div>
          <div className="flex justify-center py-3">
            <Ring value={78} size={150} stroke={14} label={<><span className="block text-2xl">78%</span><span className="text-[8px] uppercase tracking-widest">adherence</span></>} />
          </div>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs font-bold text-content-muted">
            <div className="flex justify-between"><span>Avg. weeks to change</span><span className="text-content">4.2</span></div>
            <div className="flex justify-between"><span>90-day retention</span><span className="text-success">91%</span></div>
            <div className="flex justify-between"><span>Referral signups</span><span className="text-content">23</span></div>
            <div className="flex justify-between"><span>Active goals on-track</span><span className="text-accent-dark dark:text-accent">{db.goals.filter((g) => g.status === 'on-track').length}</span></div>
          </div>
        </Glass>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Members snapshot */}
        <Glass className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between px-5 pt-5">
            <div>
              <h2 className="text-sm font-black text-content">Members</h2>
              <p className="text-xs text-content-muted">Live goal progress</p>
            </div>
            <Link to="/admin/members" className="flex items-center gap-1 text-xs font-black text-accent-dark hover:underline dark:text-accent">View all <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="divide-y divide-border">
            {db.clients.slice(0, 5).map((c, i) => {
              const goal = clientWithGoal(c)
              return (
                <motion.div key={c.id} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/admin/members/${c.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-surface-subtle/50">
                    <ImgAvatar name={c.name} src={c.avatar} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-black text-content">{c.name}</p>
                        <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-black uppercase', c.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning')}>{c.status}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <MiniBar value={goal?.progress ?? 0} className="w-40" />
                        <span className="text-[10px] font-bold text-content-faint">{goal ? `${goal.title} · ${goal.progress}%` : 'No active goal'}</span>
                      </div>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-[10px] font-bold text-content-faint">Streak</p>
                      <p className="text-sm font-black text-warning">{c.streak}🔥</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-content-faint" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Glass>

        {/* Right column: schedule + activity */}
        <div className="space-y-6">
          <Glass className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-black text-content"><CalendarClock className="h-4 w-4 text-accent-dark dark:text-accent" /> Today</h2>
              <Badge variant="warning">{db.appointments.filter((a) => a.status === 'new').length} pending</Badge>
            </div>
            <div className="space-y-2.5">
              {db.appointments.slice(-3).reverse().map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl bg-surface-subtle/60 px-3 py-2.5 dark:bg-surface-subtle">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-xs font-black text-accent-dark dark:text-accent">{a.time.slice(0, 2)}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black text-content">{a.name}</p>
                    <p className="truncate text-[10px] text-content-muted">{a.type}</p>
                  </div>
                </div>
              ))}
              {db.appointments.length === 0 && <p className="py-4 text-center text-xs font-bold text-content-faint">Nothing scheduled</p>}
            </div>
          </Glass>

          <Glass className="p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-content"><MessageSquare className="h-4 w-4 text-sky-500" /> Latest messages</h2>
            <div className="space-y-2.5">
              {db.messages.filter((m) => m.sender === 'client').slice(-3).reverse().map((m) => (
                <div key={m.id} className="rounded-xl bg-surface-subtle/60 px-3 py-2.5 dark:bg-surface-subtle">
                  <p className="text-xs font-black text-content">{m.senderName}</p>
                  <p className="line-clamp-1 text-[11px] text-content-muted">{m.text}</p>
                </div>
              ))}
              {db.messages.length === 0 && <p className="py-4 text-center text-xs font-bold text-content-faint">No messages yet</p>}
            </div>
          </Glass>

          <Glass className="p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-content"><Dumbbell className="h-4 w-4 text-pink-500" /> Quick actions</h2>
            <div className="space-y-2">
              {[
                { to: '/admin/members', label: 'Add a client' },
                { to: '/admin/schedule', label: 'Schedule a check-in' },
                { to: '/admin/payments', label: 'Record a payment' },
                { to: '/admin/progress', label: 'Review progress' },
              ].map((a) => (
                <Link key={a.to} to={a.to} className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-xs font-black text-content transition hover:border-accent/50 hover:bg-accent/5">
                  {a.label} <ChevronRight className="h-3.5 w-3.5 text-content-faint" />
                </Link>
              ))}
            </div>
          </Glass>
        </div>
      </div>
    </div>
  )
}
