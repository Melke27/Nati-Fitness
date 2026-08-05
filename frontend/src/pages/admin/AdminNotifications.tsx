import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BellRing, CalendarCheck2, TrendingUp, MessageSquareText, UserPlus, Mail, BellOff } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, Segmented } from '@/components/trainer'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'unread'

export default function AdminNotifications() {
  const db = useDB()
  const [filter, setFilter] = useState<Filter>('all')
  const [read, setRead] = useState<Record<string, boolean>>({})

  const items = useMemo(() => {
    const out: { id: string; icon: typeof BellRing; title: string; body: string; time: string; tone: string; read: boolean }[] = []
    db.appointments.filter((a) => a.status === 'new').slice(0, 4).forEach((a) =>
      out.push({ id: `app-${a.id}`, icon: CalendarCheck2, title: `New consultation request`, body: `${a.name} booked a ${a.type} for ${a.date} at ${a.time}`, time: new Date(a.createdAt).toLocaleDateString(), tone: 'bg-accent/15 text-accent-dark dark:text-accent', read: read[`app-${a.id}`] ?? false }),
    )
    db.leads.slice(0, 4).forEach((l) =>
      out.push({ id: `lead-${l.id}`, icon: UserPlus, title: `New lead: ${l.name}`, body: `Goal — ${l.goal} · ${l.email}`, time: new Date(l.createdAt).toLocaleDateString(), tone: 'bg-pink-500/15 text-pink-500', read: read[`lead-${l.id}`] ?? false }),
    )
    db.messages.filter((m) => m.sender === 'client').slice(0, 4).forEach((m) =>
      out.push({ id: `msg-${m.id}`, icon: MessageSquareText, title: `Message from ${m.senderName}`, body: m.text, time: new Date(m.createdAt).toLocaleDateString(), tone: 'bg-sky-500/15 text-sky-500', read: read[`msg-${m.id}`] ?? false }),
    )
    return out.sort((a, b) => (a.time < b.time ? 1 : -1))
  }, [db, read])

  const filtered = items.filter((i) => filter === 'all' || !i.read)
  const unread = items.filter((i) => !i.read).length

  const markAll = () => {
    const next: Record<string, boolean> = {}
    items.forEach((i) => (next[i.id] = true))
    setRead(next)
  }

  const prefs = [
    { icon: MessageSquareText, label: 'New messages', sub: 'Get notified when a member messages you', on: true },
    { icon: CalendarCheck2, label: 'Bookings & check-ins', sub: 'Consultation and check-in reminders', on: true },
    { icon: TrendingUp, label: 'Progress milestones', sub: 'When a member hits a goal', on: true },
    { icon: UserPlus, label: 'New leads', sub: 'Lead captures from the website', on: true },
    { icon: Mail, label: 'Weekly digest', sub: 'Monday performance summary', on: false },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Notifications"
        sub={`${unread} unread · manage your notification stream`}
        icon={<BellRing className="h-5 w-5" />}
        actions={<button onClick={markAll} className="rounded-full border border-border px-4 py-2.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">Mark all read</button>}
      />

      <Segmented<Filter> value={filter} onChange={setFilter} options={[{ id: 'all', label: `All (${items.length})` }, { id: 'unread', label: `Unread (${unread})` }]} />

      <div className="space-y-3">
        {filtered.map((n, i) => (
          <motion.button key={n.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => setRead((r) => ({ ...r, [n.id]: true }))}
            className={cn('flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition hover:border-accent/40', n.read ? 'border-border bg-surface-subtle/40 dark:bg-surface-subtle' : 'border-accent/40 bg-accent/5')}>
            <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', n.tone)}><n.icon className="h-4 w-4" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-content">{n.title}</p>
                <span className="shrink-0 text-[10px] font-bold text-content-faint">{n.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-content-muted">{n.body}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />}
          </motion.button>
        ))}
        {filtered.length === 0 && <p className="py-12 text-center text-sm font-bold text-content-faint">Nothing here — you’re all caught up 🎉</p>}
      </div>

      <Glass className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><BellOff className="h-4 w-4 text-content-muted" /> Notification preferences</h2>
        <div className="divide-y divide-border">
          {prefs.map((p) => (
            <div key={p.label} className="flex items-center gap-4 py-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-subtle text-content-muted dark:bg-surface-subtle"><p.icon className="h-4 w-4" /></span>
              <div className="flex-1">
                <p className="text-sm font-black text-content">{p.label}</p>
                <p className="text-xs text-content-muted">{p.sub}</p>
              </div>
              <button onClick={() => setRead((r) => ({ ...r, [p.label]: !(read[p.label] ?? p.on) }))}
                className={cn('relative h-6 w-11 rounded-full transition', read[p.label] ?? p.on ? 'bg-accent' : 'bg-surface-solid/20')}>
                <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-primary transition-all', read[p.label] ?? p.on ? 'left-[22px]' : 'left-0.5')} />
              </button>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  )
}
