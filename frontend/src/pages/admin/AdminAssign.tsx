import { useState } from 'react'
import { Dumbbell, Check, Send, CalendarDays } from 'lucide-react'
import { useDB } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { Avatar, Badge, Card, Button, Select, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

const PRESET_WORKOUTS = [
  { name: 'Lower Body Power', focus: 'Legs & Glutes', duration: 45 },
  { name: 'Upper Body Push', focus: 'Chest, Shoulders, Triceps', duration: 50 },
  { name: 'Upper Body Pull', focus: 'Back & Biceps', duration: 50 },
  { name: 'Cardio Conditioning', focus: 'HIIT or Zone 2', duration: 40 },
  { name: 'Core & Mobility', focus: 'Abs + Mobility Flow', duration: 35 },
]

export default function AdminAssign() {
  const db = useDB()
  const { success } = useToast()
  const clients = db.clients.filter((c) => c.status === 'active' || c.status === 'onboarding')
  const [clientId, setClientId] = useState(clients[0]?.id ?? '')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selected, setSelected] = useState<string[]>([])

  const assign = () => {
    success('Workout assigned!', `${selected.length} sessions scheduled for ${date}`)
    setSelected([])
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-content">Assign work</h1>
        <p className="text-sm text-content-muted">Schedule workouts and tasks for your clients</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Select client */}
        <Card>
          <h2 className="mb-4 text-sm font-black text-content">1 · Pick a client</h2>
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {clients.map((c) => (
              <button
                key={c.id}
                onClick={() => setClientId(c.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition',
                  clientId === c.id ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40',
                )}
              >
                <Avatar name={c.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-content">{c.name}</p>
                  <p className="text-[11px] text-content-muted">{db.programs.find((p) => p.id === c.programId)?.name ?? 'No program'}</p>
                </div>
                {clientId === c.id && <Check className="h-4 w-4 text-accent-dark dark:text-accent" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Workout library */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-content">2 · Choose workouts</h2>
              <Badge variant="accent">{selected.length} selected</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRESET_WORKOUTS.map((w) => (
                <button
                  key={w.name}
                  onClick={() => setSelected((s) => (s.includes(w.name) ? s.filter((x) => x !== w.name) : [...s, w.name]))}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-4 text-left transition',
                    selected.includes(w.name) ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40',
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-primary dark:text-accent"><Dumbbell className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-content">{w.name}</p>
                    <p className="truncate text-[11px] text-content-muted">{w.focus} · {w.duration} min</p>
                  </div>
                  <span className={cn('grid h-6 w-6 place-items-center rounded-full border-2', selected.includes(w.name) ? 'border-accent bg-accent text-primary' : 'border-border text-transparent')}>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-sm font-black text-content">3 · Schedule & send</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select label="Assign to" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Input label="Start date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Button variant="accent" size="lg" className="mt-5 w-full group" onClick={assign} disabled={selected.length === 0 || !clientId}>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              Assign {selected.length} workout{selected.length === 1 ? '' : 's'}
            </Button>
            <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-content-faint">
              <CalendarDays className="h-3.5 w-3.5" /> Client will be notified with a push notification & reminder.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
