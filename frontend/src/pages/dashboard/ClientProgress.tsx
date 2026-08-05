import { useState } from 'react'
import { Scale, Camera, Trophy, Ruler, Download, Plus } from 'lucide-react'
import { useDB, getSession, logWeight } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Badge, Card, Progress, Modal, Input } from '@/components/ui'
import { LineChart, RingChart } from '@/components/charts'

export default function ClientProgress() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const { success } = useToast()
  const [weightModal, setWeightModal] = useState(false)
  const [newWeight, setNewWeight] = useState(client.profile?.weightKg ?? 70)

  const history = client.progress.filter((p) => p.weightKg).sort((a, b) => a.date.localeCompare(b.date))
  const first = history[0]?.weightKg ?? client.profile?.weightKg ?? 0
  const last = history[history.length - 1]?.weightKg ?? client.profile?.weightKg ?? 0
  const delta = last - first
  const goalProgress = client.profile?.targetWeightKg
    ? Math.min(100, Math.max(0, ((first - last) / (first - (client.profile.targetWeightKg || first))) * 100))
    : 0

  const bmiNow = client.profile ? (client.profile.weightKg / ((client.profile.heightCm / 100) ** 2)).toFixed(1) : '—'

  const submitWeight = () => {
    logWeight(client.id, newWeight)
    setWeightModal(false)
    success('Progress logged! 📈')
  }

  const achievements = client.achievements ?? []

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Progress</h1>
          <p className="text-sm text-content-muted">Track your transformation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="md"><Download className="h-4 w-4" /> Download report</Button>
          <Button variant="accent" size="md" onClick={() => setWeightModal(true)}><Plus className="h-4 w-4" /> Log weight</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center">
          <p className="text-xs font-bold text-content-muted">Current weight</p>
          <p className="mt-1 text-3xl font-black text-content">{last.toFixed(1)} <span className="text-sm font-bold text-content-faint">kg</span></p>
          <p className={cn('mt-1 text-xs font-black', delta < 0 ? 'text-success' : 'text-warning')}>
            {delta > 0 ? '▲' : delta < 0 ? '▼' : '·'} {Math.abs(delta).toFixed(1)} kg total
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-bold text-content-muted">BMI</p>
          <p className="mt-1 text-3xl font-black text-content">{bmiNow}</p>
          <p className="mt-1 text-xs font-black text-success">Healthy zone</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-bold text-content-muted">Goal progress</p>
          <div className="mt-2 flex justify-center"><RingChart value={goalProgress} size={88} stroke={8} label={`${Math.round(goalProgress)}%`} sublabel="to goal" /></div>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-bold text-content-muted">Streak</p>
          <p className="mt-1 text-3xl font-black text-content">{client.streak} <span className="text-sm font-bold text-content-faint">days</span></p>
          <p className="mt-1 text-xs font-black text-warning">🔥 Keep it up!</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weight chart */}
        <Card className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-content">Weight trend</h2>
            <Badge variant="accent">{history.length} check-ins</Badge>
          </div>
          {history.length >= 2 ? (
            <LineChart data={history.map((p) => ({ label: p.date.slice(5), value: p.weightKg ?? 0 }))} height={220} />
          ) : (
            <div className="grid h-48 place-items-center rounded-2xl border border-dashed border-border text-sm text-content-faint">
              Log a couple of check-ins to see your trend
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Start', value: `${first.toFixed(1)} kg` },
              { label: 'Current', value: `${last.toFixed(1)} kg` },
              { label: 'Target', value: client.profile?.targetWeightKg ? `${client.profile.targetWeightKg} kg` : '—' },
              { label: 'To go', value: client.profile?.targetWeightKg ? `${Math.abs(last - client.profile.targetWeightKg).toFixed(1)} kg` : '—' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-surface-subtle/60 p-3 text-center dark:bg-surface-subtle">
                <p className="text-[10px] font-bold uppercase text-content-faint">{s.label}</p>
                <p className="mt-0.5 text-sm font-black text-content">{s.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><Ruler className="h-4 w-4 text-accent-dark dark:text-accent" /> Measurements</h2>
            <div className="space-y-4">
              {[
                { label: 'Waist', current: '86 cm', start: '98 cm', delta: '-12 cm' },
                { label: 'Chest', current: '104 cm', start: '101 cm', delta: '+3 cm' },
                { label: 'Hips', current: '94 cm', start: '101 cm', delta: '-7 cm' },
                { label: 'Arms', current: '36 cm', start: '34 cm', delta: '+2 cm' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="mb-1 flex items-center justify-between text-xs font-bold">
                    <span className="text-content">{m.label}</span>
                    <span className="text-content-faint">{m.start} → <span className="text-content">{m.current}</span></span>
                  </div>
                  <Progress value={70} barClassName={m.delta.startsWith('+') ? '!bg-cta-gradient' : undefined} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><Trophy className="h-4 w-4 text-warning" /> Achievements</h2>
            <div className="flex flex-wrap gap-2">
              {achievements.map((a) => (
                <span key={a} className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-black text-primary dark:text-accent">
                  🏅 {a}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-bold text-content-faint">+ 3 hidden</span>
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-content"><Camera className="h-4 w-4 text-accent-dark dark:text-accent" /> Progress photos</h2>
            <button className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-10 text-xs font-bold text-content-faint transition hover:border-accent hover:text-content">
              <Camera className="h-6 w-6" />
              Upload this month's photo
            </button>
          </Card>
        </div>
      </div>

      <Modal open={weightModal} onClose={() => setWeightModal(false)} title="Log your weight">
        <div className="space-y-4">
          <Input label="Weight (kg)" type="number" value={newWeight} onChange={(e) => setNewWeight(Number(e.target.value))} />
          <div className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 p-4 text-xs text-content-muted">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark dark:text-accent" />
            Tip: weigh in at the same time each morning, after the bathroom, for consistent data.
          </div>
          <Button variant="accent" className="w-full" onClick={submitWeight}>Save check-in</Button>
        </div>
      </Modal>
    </div>
  )
}
