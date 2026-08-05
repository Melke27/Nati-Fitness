import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Dumbbell, Video, Users } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass } from '@/components/trainer'
import { Button, Badge } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn, DAY_SHORT } from '@/lib/utils'

interface Session {
  id: string
  day: number
  time: string
  title: string
  type: 'training' | 'call' | 'group'
  clientId?: string
}

const SEED_SESSIONS: Session[] = [
  { id: 's1', day: 0, time: '06:00', title: 'Sarah — Full Body', type: 'training', clientId: 'client_sarah' },
  { id: 's2', day: 0, time: '07:30', title: 'David — Upper Push', type: 'training', clientId: 'client_david' },
  { id: 's3', day: 1, time: '18:00', title: 'Sarah — Nutrition call', type: 'call', clientId: 'client_sarah' },
  { id: 's4', day: 2, time: '06:00', title: 'Sarah — Lower Body', type: 'training', clientId: 'client_sarah' },
  { id: 's5', day: 3, time: '17:30', title: 'Group HIIT class', type: 'group' },
  { id: 's6', day: 4, time: '06:00', title: 'David — Back & Bi', type: 'training', clientId: 'client_david' },
  { id: 's7', day: 5, time: '09:00', title: 'Sarah — Monthly check-in', type: 'call', clientId: 'client_sarah' },
]

const TYPE_STYLE: Record<Session['type'], string> = {
  training: 'border-l-accent bg-accent/10 text-accent-dark dark:text-accent',
  call: 'border-l-sky-500 bg-sky-500/10 text-sky-500',
  group: 'border-l-pink-500 bg-pink-500/10 text-pink-500',
}

export default function AdminSchedule() {
  const db = useDB()
  const toast = useToast()
  const [weekOffset, setWeekOffset] = useState(0)
  const [sessions, setSessions] = useState<Session[]>(SEED_SESSIONS)

  const client = (id?: string) => db.clients.find((c) => c.id === id)

  const weekLabel = (() => {
    const base = new Date()
    base.setDate(base.getDate() + weekOffset * 7)
    const start = new Date(base)
    start.setDate(start.getDate() - start.getDay() + 1)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  })()

  const addSession = () => {
    setSessions((s) => [...s, { id: `s_${Date.now()}`, day: new Date().getDay() - 1, time: '18:30', title: 'New session', type: 'training' }])
    toast?.success('Session added')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Schedule"
        sub={weekLabel}
        icon={<CalendarDays className="h-5 w-5" />}
        actions={
          <>
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button onClick={() => setWeekOffset((o) => o - 1)} className="grid h-8 w-8 place-items-center rounded-full text-content-muted transition hover:bg-surface-subtle hover:text-content" aria-label="Previous week"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setWeekOffset(0)} className="px-2 text-xs font-black text-content-muted hover:text-content">Today</button>
              <button onClick={() => setWeekOffset((o) => o + 1)} className="grid h-8 w-8 place-items-center rounded-full text-content-muted transition hover:bg-surface-subtle hover:text-content" aria-label="Next week"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <Button variant="accent" size="md" onClick={addSession}><Plus className="h-4 w-4" /> New session</Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {DAY_SHORT.map((d, di) => {
          const daySessions = sessions.filter((s) => s.day === di).sort((a, b) => (a.time < b.time ? -1 : 1))
          return (
            <Glass key={d} className={cn('min-h-56 p-4', di === new Date().getDay() - 1 && 'border-accent/40')}>
              <p className="mb-3 flex items-center justify-between text-xs font-black text-content">
                {d}
                <span className="text-content-faint">{daySessions.length}</span>
              </p>
              <div className="space-y-2">
                {daySessions.map((s) => {
                  const c = client(s.clientId)
                  return (
                    <div key={s.id} className={cn('rounded-xl border-l-4 p-2.5', TYPE_STYLE[s.type])}>
                      <p className="text-[9px] font-black text-content-faint">{s.time}</p>
                      <p className="truncate text-[11px] font-black text-content">{s.title}</p>
                      {c && <div className="mt-1 flex items-center gap-1"><img src={c.avatar} alt="" className="h-4 w-4 rounded-full" /><span className="text-[9px] font-bold text-content-faint">{c.name.split(' ')[0]}</span></div>}
                    </div>
                  )
                })}
                {daySessions.length === 0 && <p className="py-6 text-center text-[10px] font-bold text-content-faint">—</p>}
              </div>
            </Glass>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4">
        <Badge><Dumbbell className="h-3.5 w-3.5" /> Training session</Badge>
        <Badge><Video className="h-3.5 w-3.5" /> Call / check-in</Badge>
        <Badge><Users className="h-3.5 w-3.5" /> Group session</Badge>
      </div>
    </div>
  )
}
