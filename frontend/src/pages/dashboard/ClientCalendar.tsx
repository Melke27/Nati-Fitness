import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, ChevronLeft, ChevronRight, Clock, MapPin, CalendarDays } from 'lucide-react'
import { useDB, getSession } from '@/lib/store'
import { cn, todayKey, DAY_SHORT, MONTHS_SHORT } from '@/lib/utils'
import { Button, Badge, Card, Modal } from '@/components/ui'
import { useToast } from '@/context/ToastContext'

const SESSIONS = [
  { day: 0, name: 'Lower Body Power', time: '18:00', type: 'Workout', location: 'Home · Dumbbells' },
  { day: 2, name: 'Upper Body Push', time: '18:00', type: 'Workout', location: 'Home · Dumbbells' },
  { day: 4, name: 'Upper Body Pull', time: '18:00', type: 'Workout', location: 'Home · Dumbbells' },
  { day: 5, name: 'Weekly check-in', time: '11:00', type: 'Call', location: 'Zoom' },
]

export default function ClientCalendar() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const { success } = useToast()
  const [monthOffset, setMonthOffset] = useState(0)
  const [joinModal, setJoinModal] = useState<null | (typeof SESSIONS)[number]>(null)

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + monthOffset
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = todayKey()

  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const join = (s: (typeof SESSIONS)[number]) => {
    success('Joined session!', `${s.name} · ${s.time}`)
    setJoinModal(null)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Calendar</h1>
          <p className="text-sm text-content-muted">Workouts, check-ins & calls</p>
        </div>
        <Button variant="outline" size="md"><CalendarDays className="h-4 w-4" /> Sync to Google Calendar</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Month */}
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <button onClick={() => setMonthOffset((m) => m - 1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:border-accent hover:text-content"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="text-lg font-black text-content">{MONTHS_SHORT[month]} {year}</h2>
            <button onClick={() => setMonthOffset((m) => m + 1)} aria-label="Next month" className="grid h-10 w-10 place-items-center rounded-full border border-border text-content-muted transition hover:border-accent hover:text-content"><ChevronRight className="h-4 w-4" /></button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-content-faint">
            {DAY_SHORT.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const isTraining = day !== null && SESSIONS.some((s) => s.day === (new Date(year, month, day).getDay() + 6) % 7 && s.type === 'Workout')
              const dateKey = day ? todayKey(new Date(year, month, day)) : ''
              const isDone = day !== null && db.workouts.some((w) => w.clientId === client.id && w.date === dateKey)
              const isToday = dateKey === today
              return (
                <div
                  key={i}
                  className={cn(
                    'relative grid aspect-square place-items-center rounded-lg text-sm font-bold transition',
                    isToday ? 'bg-primary text-accent' : 'text-content-muted',
                    day === null && 'opacity-0',
                  )}
                >
                  {day}
                  {isTraining && <span className={cn('absolute bottom-1 h-1.5 w-1.5 rounded-full', isDone ? 'bg-success' : 'bg-accent-dark dark:bg-accent')} />}
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-[11px] font-bold text-content-muted">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-dark dark:bg-accent" /> Training</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Completed</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Today</span>
          </div>
        </Card>

        {/* Upcoming */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-content">This week's sessions</h2>
          {SESSIONS.map((s, i) => {
            const isPast = i === 3
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={cn('rounded-2xl border p-5 transition', isPast ? 'border-border opacity-80' : 'border-accent/30 bg-accent/5')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {s.type === 'Call' ? <Video className="h-4 w-4 text-accent-dark dark:text-accent" /> : <Clock className="h-4 w-4 text-accent-dark dark:text-accent" />}
                      <p className="font-black text-content">{s.name}</p>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-content-muted">
                      <CalendarDays className="h-3 w-3" /> {DAY_SHORT[s.day]} · {s.time}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-content-muted">
                      <MapPin className="h-3 w-3" /> {s.location}
                    </p>
                  </div>
                  <Badge variant={s.type === 'Call' ? 'warning' : 'accent'}>{s.type}</Badge>
                </div>
                {s.type === 'Call' ? (
                  <Button variant="accent" size="sm" className="mt-4 w-full" onClick={() => setJoinModal(s)}>Join video call</Button>
                ) : (
                  <span className="mt-4 flex items-center gap-2 text-xs font-bold text-content-muted">
                    <Clock className="h-3.5 w-3.5" /> Scheduled
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <Modal open={!!joinModal} onClose={() => setJoinModal(null)} title="Join session">
        <div className="space-y-4">
          <p className="text-sm text-content-muted">
            <span className="font-black text-content">{joinModal?.name}</span> starts at {joinModal?.time}. Your video link will be
            live 5 minutes before.
          </p>
          <div className="rounded-xl border border-border bg-surface-subtle/60 p-4 text-center dark:bg-surface-subtle">
            <p className="text-xs font-black uppercase tracking-widest text-content-faint">Meeting link</p>
            <p className="mt-1 text-lg font-black text-accent-dark dark:text-accent">coachnati.com/checkin</p>
          </div>
          <Button variant="accent" className="w-full" onClick={() => joinModal && join(joinModal)}>Join now</Button>
        </div>
      </Modal>
    </div>
  )
}
