import { useState } from 'react'
import { Play, Check, Clock, Flame, RotateCcw } from 'lucide-react'
import { useDB, getSession, logWorkout } from '@/lib/store'
import { todayKey, DAY_SHORT } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Badge, Card, Progress } from '@/components/ui'
import { cn } from '@/lib/utils'

const WEEK_PLAN = [
  { day: 'Monday', name: 'Lower Body Power', focus: 'Legs & Glutes', duration: 45, type: 'Strength' },
  { day: 'Tuesday', name: 'Active Recovery', focus: 'Walk + Stretching', duration: 30, type: 'Recovery' },
  { day: 'Wednesday', name: 'Upper Body Push', focus: 'Chest, Shoulders, Triceps', duration: 50, type: 'Strength' },
  { day: 'Thursday', name: 'Core & Mobility', focus: 'Abs + Mobility Flow', duration: 35, type: 'Core' },
  { day: 'Friday', name: 'Upper Body Pull', focus: 'Back & Biceps', duration: 50, type: 'Strength' },
  { day: 'Saturday', name: 'Cardio Conditioning', focus: 'HIIT or Zone 2', duration: 40, type: 'Cardio' },
  { day: 'Sunday', name: 'Full Rest', focus: 'Recover & sleep well', duration: 0, type: 'Rest' },
]

const EXERCISES = [
  { name: 'Goblet Squat', sets: 4, reps: 10, weight: '12–16 kg', note: 'Control the descent, drive through heels' },
  { name: 'Romanian Deadlift', sets: 4, reps: 12, weight: '10–14 kg', note: 'Hinge at hips, flat back' },
  { name: 'Walking Lunges', sets: 3, reps: 14, weight: '8–10 kg', note: 'Long stride, knee tracks over toes' },
  { name: 'Glute Bridge', sets: 3, reps: 15, weight: 'Bodyweight', note: 'Squeeze at the top for 1 second' },
  { name: 'Plank', sets: 3, reps: '45 sec', weight: 'Bodyweight', note: 'Neutral spine, brace core' },
]

export default function ClientWorkouts() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const { success } = useToast()
  const [done, setDone] = useState<Record<string, boolean>>({})
  const today = todayKey()
  const doneToday = db.workouts.some((w) => w.clientId === client.id && w.date === today)

  const totalSets = EXERCISES.reduce((a, e) => a + e.sets, 0)
  const completedSets = Object.values(done).filter(Boolean).length
  const pct = Math.round((completedSets / totalSets) * 100)

  const finishWorkout = () => {
    logWorkout({ clientId: client.id, name: 'Lower Body Power', durationMin: 45, calories: 380 })
    success('Workout completed! 🔥', '+380 kcal · +1 session this week')
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Workouts</h1>
          <p className="text-sm text-content-muted">Your weekly plan · {weeklyDoneCount(db, client.id)}/7 sessions done</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Today's session */}
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-content">Today — Coach Nati’s Lower Body Power</h2>
              <p className="text-xs font-bold text-content-muted">45 min · Strength · 5 Coach Nati exercises · ~380 kcal</p>
            </div>
            <Badge variant={doneToday ? 'success' : 'accent'}>{doneToday ? 'Completed' : 'Ready'}</Badge>
          </div>

          <div className="mb-5 space-y-3">
            {EXERCISES.map((e, i) => (
              <div key={e.name} className="rounded-2xl border border-border p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                    aria-label={done[i] ? `Unmark ${e.name}` : `Mark ${e.name} complete`}
                    className={cn(
                      'grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-300',
                      done[i] ? 'border-success bg-success text-white' : 'border-border text-transparent hover:border-success',
                    )}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className={cn('font-black text-content', done[i] && 'line-through opacity-50')}>{e.name}</p>
                      <span className="shrink-0 text-xs font-black text-accent-dark dark:text-accent">{e.sets} × {e.reps}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-content-muted">{e.weight} · {e.note}</p>
                  </div>
                  <button aria-label={`Watch ${e.name} tutorial`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-primary transition hover:bg-accent dark:text-accent dark:hover:text-primary">
                    <Play className="h-3.5 w-3.5" fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between text-xs font-black text-content-muted">
            <span>Completion</span>
            <span>{completedSets}/{totalSets} sets ({pct}%)</span>
          </div>
          <Progress value={pct} className="mb-6" />

          {doneToday ? (
            <div className="flex items-center gap-3 rounded-2xl border border-success/25 bg-success/5 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-success text-white"><Check className="h-5 w-5" /></span>
              <p className="text-sm font-black text-content">Session complete — see you at the next one! 💪</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Button variant="accent" size="lg" className="group" onClick={finishWorkout} disabled={pct < 100}>
                <Check className="h-5 w-5" /> Finish workout {pct < 100 && `(${100 - pct}% left)`}
              </Button>
              <Button variant="outline" size="lg"><RotateCcw className="h-4 w-4" /> Reset sets</Button>
            </div>
          )}
        </Card>

        {/* Weekly plan */}
        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-sm font-black text-content">This week's plan</h2>
            <div className="space-y-2">
              {WEEK_PLAN.map((d, i) => {
                const dateKey = todayKey(new Date(Date.now() - new Date().getDay() + 1 + i))
                const done = db.workouts.some((w) => w.clientId === client.id && w.date === dateKey)
                const isToday = i === (new Date().getDay() + 6) % 7
                return (
                  <div
                    key={d.day}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border p-3 transition',
                      isToday ? 'border-accent bg-accent/5' : 'border-border',
                    )}
                  >
                    <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[10px] font-black', isToday ? 'bg-accent text-primary' : 'bg-surface-subtle text-content-muted dark:bg-surface-subtle')}>
                      {DAY_SHORT[i]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-content">{d.name}</p>
                      <p className="truncate text-[11px] text-content-muted">{d.focus}</p>
                    </div>
                    {d.type === 'Rest' ? (
                      <span className="text-[10px] font-black uppercase text-content-faint">Rest</span>
                    ) : done ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-content-faint"><Clock className="h-3 w-3" />{d.duration}m</span>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-black text-content">History</h2>
            <div className="space-y-2.5">
              {db.workouts.filter((w) => w.clientId === client.id).slice(-5).reverse().map((w) => (
                <div key={w.id} className="flex items-center gap-3 text-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-success/15 text-success"><Check className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-content">{w.name}</p>
                    <p className="text-[11px] text-content-muted">{w.date}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-content-muted"><Flame className="h-3 w-3 text-warning" />{w.calories}</span>
                </div>
              ))}
              {db.workouts.filter((w) => w.clientId === client.id).length === 0 && (
                <p className="text-sm text-content-muted">No workouts logged yet — start today!</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function weeklyDoneCount(db: { workouts: { clientId: string; date: string }[] }, clientId: string) {
  const start = todayKey(new Date(Date.now() - ((new Date().getDay() + 6) % 7)))
  return db.workouts.filter((w) => w.clientId === clientId && w.date >= start).length
}
