import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import {
  Flame, CheckCircle2, ChevronRight, Dumbbell, Trophy, CalendarClock, MessageSquare, ArrowRight, Sparkles,
  Target, Award, Lock, Salad, Droplets, HeartPulse, Zap, TrendingUp,
} from 'lucide-react'
import { useDB, getSession, logWorkout } from '@/lib/store'
import { greeting, todayKey, weekDates, DAY_SHORT, cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Badge, Card, Progress } from '@/components/ui'
import { LineChart, RingChart } from '@/components/charts'

export default function ClientOverview() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const program = db.programs.find((p) => p.id === client.programId)
  const today = todayKey()

  const workoutsToday = db.workouts.filter((w) => w.clientId === client.id && w.date === today)
  const workoutsAll = db.workouts.filter((w) => w.clientId === client.id)
  const weeklyPlanned = client.profile?.trainingDays.length ?? 4
  const weeklyDone = new Set(workoutsAll.map((w) => w.date)).size
  const progress = Math.min(100, Math.round((weeklyDone / Math.max(1, weeklyPlanned)) * 100))

  const weightHistory = client.progress.filter((p) => p.weightKg).slice(-12)
  const startWeight = client.profile?.weightKg
  const latest = weightHistory[weightHistory.length - 1]
  const lost = startWeight ? startWeight - (latest?.weightKg ?? startWeight) : 0

  const todayMeals = db.meals.filter((m) => m.clientId === client.id && m.date === today)
  const totalCals = todayMeals.reduce((a, m) => a + m.calories, 0)
  const totalProtein = todayMeals.reduce((a, m) => a + m.protein, 0)
  const target = client.profile?.targetCalories ?? 2000
  const targetProtein = client.profile?.targetWeightKg ? Math.round(client.profile.targetWeightKg * 1.6) : 120

  const water = db.water.filter((w) => w.clientId === client.id && w.date === today).reduce((a, w) => a + w.ml, 0)

  const week = weekDates()
  const plannedDays = client.profile?.trainingDays ?? []

  const goals = db.goals.filter((g) => g.clientId === client.id)
  const achievedGoals = goals.filter((g) => g.status === 'achieved').length
  const unreadMsgs = db.messages.filter((m) => m.clientId === client.id && m.sender === 'coach' && !m.read).length

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-white sm:p-9">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-accent/10 blur-[100px]" />
        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-bold text-accent">
              <Sparkles className="h-4 w-4 shrink-0" /> {client.streak > 0 ? `${client.streak}-day streak — keep it going!` : 'Let’s start your streak today'}
            </p>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">
              {greeting()}, {session.name.split(' ')[0]} 👋
            </h1>
            <p className="mt-1.5 text-sm text-white/60">
              {program ? `Training on the ${program.name} program.` : 'Complete your onboarding to unlock your program.'}{' '}
              {lost > 0 && <span className="font-black text-accent">You're down {lost.toFixed(1)} kg. 💪</span>}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <RingChart value={progress} size={64} stroke={6} label={`${progress}%`} color="#F43F5E" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Weekly goal</p>
                <p className="text-sm font-black text-white">{weeklyDone} / {weeklyPlanned} sessions</p>
                <div className="flex items-center gap-1 text-xs font-bold text-accent">
                  <Flame className="h-3 w-3" /> {client.streak} day streak
                </div>
              </div>
            </div>
            <Link to="/dashboard/workouts">
              <Button variant="accent" size="md" className="group w-full sm:w-auto">
                Today's workout <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Calories today" value={totalCals.toLocaleString()} sub={`/ ${target.toLocaleString()} kcal`} accent="text-warning" />
        <StatCard icon={Dumbbell} label="Workouts" value={`${weeklyDone} / ${weeklyPlanned}`} sub="this week" accent="text-accent-dark dark:text-accent" />
        <StatCard icon={Trophy} label="Weight lost" value={lost > 0 ? `${lost.toFixed(1)} kg` : '0 kg'} sub="since start" accent="text-success" />
        <StatCard icon={MessageSquare} label="Unread messages" value={String(unreadMsgs)} sub="from Coach Nati" accent="text-error" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's workout */}
        <Card className="lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-black text-content">Today's workout</h2>
              <p className="text-xs font-semibold text-content-muted">
                {workoutsToday.length > 0 ? 'Completed — great job!' : 'Scheduled for today'}
              </p>
            </div>
            <Link to="/dashboard/workouts" className="text-xs font-black text-accent-dark hover:underline dark:text-accent">View plan →</Link>
          </div>

          {workoutsToday.length > 0 ? (
            <div className="flex items-center gap-4 rounded-2xl border border-success/25 bg-success/5 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-success text-white"><CheckCircle2 className="h-6 w-6" /></span>
              <div className="min-w-0">
                <p className="truncate font-black text-content">{workoutsToday[0].name} — done! ✅</p>
                <p className="text-sm text-content-muted">{workoutsToday[0].durationMin} min · {workoutsToday[0].calories} kcal</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <TodayWorkoutCard />
              <Link to="/dashboard/workouts">
                <Button variant="outline" size="md" className="w-full">Mark workout complete</Button>
              </Link>
            </div>
          )}

          {/* Week strip */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-content">This week</h3>
              <span className="text-xs font-bold text-content-muted">{weeklyDone}/{weeklyPlanned} sessions</span>
            </div>
            <Progress value={progress} />
            <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
              {week.map((d, i) => {
                const key = todayKey(d)
                const done = db.workouts.some((w) => w.clientId === client.id && w.date === key)
                const planned = plannedDays.includes(DAY_SHORT[i])
                const isToday = key === today
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border py-3',
                      isToday ? 'border-accent bg-accent/10' : 'border-border',
                    )}
                  >
                    <span className="text-[10px] font-bold text-content-faint">{DAY_SHORT[i]}</span>
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : planned ? (
                      <Dumbbell className={cn('h-5 w-5', isToday ? 'text-accent-dark dark:text-accent' : 'text-content-faint')} />
                    ) : (
                      <span className="h-5 w-5 rounded-full border border-dashed border-content-faint" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* NEW: Consistency heatmap */}
          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black text-content">Consistency <span className="text-content-faint">· last 6 weeks</span></h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-content-faint">
                <span>Less</span>
                <span className="h-2.5 w-2.5 rounded bg-surface-subtle" />
                <span className="h-2.5 w-2.5 rounded bg-accent/35" />
                <span className="h-2.5 w-2.5 rounded bg-accent/70" />
                <span className="h-2.5 w-2.5 rounded bg-accent" />
                <span>More</span>
              </div>
            </div>
            <Heatmap workouts={workoutsAll} />
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-content">Nutrition today</h2>
              <Link to="/dashboard/nutrition" className="text-xs font-black text-accent-dark hover:underline dark:text-accent">Log →</Link>
            </div>
            <div className="flex items-center justify-center gap-6">
              <RingChart value={(totalCals / target) * 100} label={`${Math.round((totalCals / target) * 100)}%`} sublabel="calories" color="#F59E0B" />
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-bold text-content-muted">Calories</p>
                  <p className="font-black text-content">{totalCals.toLocaleString()} <span className="text-xs font-semibold text-content-faint">/ {target.toLocaleString()}</span></p>
                </div>
                <div>
                  <p className="text-xs font-bold text-content-muted">Protein</p>
                  <p className="font-black text-content">{totalProtein}g <span className="text-xs font-semibold text-content-faint">/ {targetProtein}g</span></p>
                </div>
                <div>
                  <p className="text-xs font-bold text-content-muted">Water</p>
                  <p className="font-black text-content">{(water / 1000).toFixed(1)}L <span className="text-xs font-semibold text-content-faint">/ 2.5L</span></p>
                </div>
              </div>
            </div>
            <Progress value={(totalProtein / targetProtein) * 100} className="mt-5" />
          </Card>

          <Card>
            <h2 className="mb-4 text-sm font-black text-content">Weight progress</h2>
            <LineChart
              data={weightHistory.slice(-8).map((p) => ({ label: p.date.slice(5), value: p.weightKg ?? 0 }))}
              height={120}
            />
            <Link to="/dashboard/progress" className="mt-3 flex items-center gap-1 text-xs font-black text-accent-dark hover:underline dark:text-accent">
              View all progress <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>
        </div>
      </div>

      {/* NEW: Goals tracker */}
      <GoalsSection goals={goals} achievedCount={achievedGoals} />

      {/* NEW: Achievements */}
      <AchievementsSection client={client} workoutsCount={workoutsAll.length} lost={lost} mealsCount={todayMeals.length} waterMl={water} achievedGoals={achievedGoals} />

      {/* Announcements + messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-black text-content">Announcements</h2>
          <div className="space-y-3">
            {db.announcements.slice(0, 3).map((a) => (
              <div key={a.id} className="rounded-xl border border-border p-4">
                <p className="text-sm font-black text-content">{a.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">{a.body}</p>
                <p className="mt-2 text-[10px] font-bold text-content-faint">{new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-black text-content">Coach messages</h2>
            <Link to="/dashboard/messages" className="text-xs font-black text-accent-dark hover:underline dark:text-accent">Open chat →</Link>
          </div>
          <div className="space-y-3">
            {db.messages.filter((m) => m.clientId === client.id).slice(-3).reverse().map((m) => (
              <div key={m.id} className={cn('rounded-xl border p-4', m.sender === 'coach' ? 'border-accent/30 bg-accent/5' : 'border-border')}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-content">{m.senderName}</p>
                  <span className="text-[10px] font-bold text-content-faint">{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-sm text-content-muted">{m.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: '/dashboard/workouts', icon: CalendarClock, title: 'Log workout', desc: 'Track your session' },
          { to: '/dashboard/nutrition', icon: Salad, title: 'Log food & water', desc: 'Hit your macros' },
          { to: '/dashboard/progress', icon: TrendingUp, title: 'Log progress', desc: 'Record weight & photos' },
          { to: '/dashboard/calendar', icon: HeartPulse, title: 'Check schedule', desc: 'See upcoming sessions' },
        ].map((a) => (
          <Link key={a.to} to={a.to} className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-primary transition group-hover:bg-accent dark:text-accent dark:group-hover:text-primary">
              <a.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-black text-content">{a.title}</p>
              <p className="text-xs text-content-muted">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: typeof Flame; label: string; value: string; sub: string; accent: string }) {
  return (
    <Card hover className="flex items-center gap-3 !p-4 sm:!p-5">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-subtle sm:h-12 sm:w-12 sm:rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-bold text-content-muted sm:text-xs">{label}</p>
        <p className="truncate text-base font-black text-content sm:text-lg">{value}</p>
        <p className="truncate text-[10px] font-bold text-content-faint">{sub}</p>
      </div>
    </Card>
  )
}

function Heatmap({ workouts }: { workouts: { date: string }[] }) {
  const today = todayKey()
  const cells = useMemo(() => {
    const result: Date[] = []
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 41)
    const dow = (start.getDay() + 6) % 7
    start.setDate(start.getDate() - dow)
    for (let w = 0; w < 6; w++) {
      for (let d = 0; d < 7; d++) {
        const date = new Date(start)
        date.setDate(start.getDate() + w * 7 + d)
        result.push(date)
      }
    }
    return result
  }, [])

  const byDate = useMemo(() => {
    const map: Record<string, number> = {}
    workouts.forEach((w) => {
      map[w.date] = (map[w.date] ?? 0) + 1
    })
    return map
  }, [workouts])

  const weeks = useMemo(() => {
    const out: Date[][] = []
    for (let w = 0; w < 6; w++) out.push(cells.slice(w * 7, w * 7 + 7))
    return out
  }, [cells])

  return (
    <div className="overflow-x-auto pb-1">
      <div className="grid min-w-[300px] grid-cols-[auto_repeat(6,1fr)] gap-1.5">
        <div className="flex flex-col gap-1.5">
          {['M', 'W', 'F', 'S'].map((d) => (
            <span key={d} className="grid h-5 place-items-center text-[9px] font-bold text-content-faint">{d}</span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            {week.map((d, di) => {
              const key = todayKey(d)
              const count = byDate[key] ?? 0
              const isToday = key === today
              const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              return (
                <div
                  key={di}
                  title={`${label}${count > 0 ? ` · ${count} workout${count > 1 ? 's' : ''}` : ' · rest day'}`}
                  className={cn(
                    'h-5 w-full rounded-md transition-colors',
                    count === 0 ? 'bg-surface-subtle dark:bg-surface-subtle' : count === 1 ? 'bg-accent/35' : count === 2 ? 'bg-accent/70' : 'bg-accent',
                    isToday && 'ring-2 ring-accent ring-offset-1 ring-offset-surface',
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function GoalsSection({ goals, achievedCount }: { goals: { id: string; title: string; target: string; deadline: string; progress: number; status: 'on-track' | 'at-risk' | 'achieved' | 'upcoming' }[]; achievedCount: number }) {
  if (goals.length === 0) return null
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-content">My goals</h2>
          <p className="text-xs font-semibold text-content-muted">{achievedCount} achieved · track what matters</p>
        </div>
        <Link to="/dashboard/progress" className="text-xs font-black text-accent-dark hover:underline dark:text-accent">View all →</Link>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <Card key={g.id} hover className="!p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <span className={cn(
                'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
                g.status === 'achieved' ? 'bg-success/15 text-success' : g.status === 'at-risk' ? 'bg-error/10 text-error' : 'bg-accent/15 text-primary dark:text-accent',
              )}>
                <Target className="h-5 w-5" />
              </span>
              <Badge variant={g.status === 'achieved' ? 'success' : g.status === 'at-risk' ? 'warning' : g.status === 'on-track' ? 'accent' : 'outline'}>
                {g.status.replace('-', ' ')}
              </Badge>
            </div>
            <p className="font-black text-content">{g.title}</p>
            <p className="mt-0.5 text-xs font-semibold text-content-muted">{g.target}</p>
            <Progress value={g.progress} className="mt-4" />
            <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-content-faint">
              <span>{g.progress}% complete</span>
              <span>by {new Date(g.deadline).toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AchievementsSection({ client, workoutsCount, lost, mealsCount, waterMl, achievedGoals }: {
  client: { streak: number; status: string }
  workoutsCount: number
  lost: number
  mealsCount: number
  waterMl: number
  achievedGoals: number
}) {
  const badges = [
    { id: 'first', title: 'First Steps', desc: 'Log your first workout', icon: Zap, unlocked: workoutsCount > 0, points: 100 },
    { id: 'streak3', title: 'On Fire', desc: 'Hit a 3-day streak', icon: Flame, unlocked: client.streak >= 3, points: 150 },
    { id: 'streak7', title: 'Unstoppable', desc: 'Hit a 7-day streak', icon: Trophy, unlocked: client.streak >= 7, points: 300 },
    { id: 'weight', title: 'Weight Winner', desc: 'Lose your first kg', icon: TrendingUp, unlocked: lost > 0, points: 200 },
    { id: 'meals', title: 'Macro Master', desc: 'Log 3 meals in a day', icon: Salad, unlocked: mealsCount >= 3, points: 150 },
    { id: 'water', title: 'Well Hydrated', desc: 'Drink 2L+ in a day', icon: Droplets, unlocked: waterMl >= 2000, points: 100 },
    { id: 'goal', title: 'Goal Getter', desc: 'Achieve a goal', icon: Target, unlocked: achievedGoals > 0, points: 250 },
  ]
  const basePoints = badges.filter((b) => b.unlocked).reduce((a, b) => a + b.points, 0)
  const eliteUnlocked = basePoints >= 1000
  const total = [
    ...badges,
    { id: 'elite', title: 'Elite Status', desc: 'Reach 1,000+ points', icon: Award, unlocked: eliteUnlocked, points: 500 },
  ]
  const unlocked = total.filter((b) => b.unlocked).length
  const points = basePoints + (eliteUnlocked ? 500 : 0)
  const rank = eliteUnlocked ? 'Elite' : points >= 600 ? 'Athlete' : points >= 300 ? 'Contender' : 'Rookie'

  return (
    <Card>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-content">Achievements</h2>
          <p className="text-xs font-semibold text-content-muted">{unlocked} of {total.length} unlocked · {points} points</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <Award className="h-4 w-4 text-primary dark:text-accent" />
          <span className="text-xs font-black text-content">{rank}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {total.map((b) => (
          <div
            key={b.id}
            title={b.unlocked ? `${b.desc} · +${b.points} pts` : 'Locked'}
            className={cn(
              'flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all',
              b.unlocked ? 'border-accent/25 bg-accent/5' : 'border-border opacity-50',
            )}
          >
            <span className={cn('grid h-12 w-12 place-items-center rounded-full', b.unlocked ? 'bg-accent/20 text-primary dark:text-accent' : 'bg-surface-subtle text-content-faint')}>
              {b.unlocked ? <b.icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-black text-content">{b.title}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-content-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function TodayWorkoutCard() {
  const db = useDB()
  const { success } = useToast()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const exercises = [
    { name: 'Goblet Squat', sets: 4, reps: 10 },
    { name: 'Romanian Deadlift', sets: 4, reps: 12 },
    { name: 'Walking Lunges', sets: 3, reps: 14 },
    { name: 'Glute Bridge', sets: 3, reps: 15 },
  ]
  const complete = () => {
    logWorkout({ clientId: client.id, name: 'Lower Body Power', durationMin: 45, calories: 380 })
    success('Workout logged! 🔥', '+380 kcal burned · streak updated')
  }
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-black text-content">Lower Body Power</p>
        <Badge variant="accent">45 min</Badge>
      </div>
      <ul className="space-y-2">
        {exercises.map((e) => (
          <li key={e.name} className="flex items-center justify-between rounded-lg bg-surface-subtle/60 px-3 py-2.5 text-xs font-bold text-content-muted dark:bg-surface-subtle">
            <span>{e.name}</span>
            <span>{e.sets} × {e.reps}</span>
          </li>
        ))}
      </ul>
      <Button variant="accent" size="sm" className="mt-4 w-full" onClick={complete}>
        <CheckCircle2 className="h-4 w-4" /> Mark workout complete
      </Button>
    </div>
  )
}
