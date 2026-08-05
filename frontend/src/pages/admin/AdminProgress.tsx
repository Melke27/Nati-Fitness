import { useMemo, useState } from 'react'
import { HeartPulse, TrendingDown, TrendingUp, Activity, Award } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, StatCard, Segmented, Ring } from '@/components/trainer'
import { LineChart } from '@/components/charts'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

type Metric = 'weight' | 'bodyFat'

export default function AdminProgress() {
  const db = useDB()
  const [selected, setSelected] = useState(db.clients[0]?.id ?? '')
  const [metric, setMetric] = useState<Metric>('weight')

  const client = db.clients.find((c) => c.id === selected) ?? db.clients[0]

  const history = useMemo(() => (client ? client.progress.filter((p) => (metric === 'weight' ? p.weightKg : p.bodyFat) !== undefined).slice(-12) : []), [client, metric])
  const chartData = history.map((p) => ({ label: p.date.slice(5), value: metric === 'weight' ? p.weightKg ?? 0 : p.bodyFat ?? 0 }))

  const first = chartData[0]?.value ?? 0
  const last = chartData[chartData.length - 1]?.value ?? 0
  const delta = last - first
  const isDown = delta < 0

  const goal = client ? db.goals.find((g) => g.clientId === client.id) : null
  const attendance = client ? db.attendance.filter((a) => a.clientId === client.id) : []
  const presentRate = attendance.length ? Math.round((attendance.filter((a) => a.status !== 'absent').length / attendance.length) * 100) : 0

  if (!client) return <PageHeader title="Progress" sub="No members yet" />

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Progress" sub="Track every member’s journey" icon={<HeartPulse className="h-5 w-5" />} />

      {/* Member selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {db.clients.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)}
              className={cn('flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-xs font-black transition', selected === c.id ? 'border-accent bg-accent/15 text-accent-dark dark:text-accent' : 'border-border text-content-muted hover:border-accent/40')}>
              <img src={c.avatar} alt={c.name} className="h-7 w-7 rounded-full object-cover" />
              {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <Segmented<Metric> value={metric} onChange={setMetric} options={[{ id: 'weight', label: 'Weight' }, { id: 'bodyFat', label: 'Body fat' }]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Start" value={`${first.toFixed(1)} ${metric === 'weight' ? 'kg' : '%'}`} icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Current" value={`${last.toFixed(1)} ${metric === 'weight' ? 'kg' : '%'}`} trend={Math.abs(delta) > 0.1 ? Math.round(Math.abs(delta) / first * 100) : 0} icon={isDown ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />} iconBg={isDown ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'} />
        <StatCard label="Total change" value={`${delta > 0 ? '+' : ''}${delta.toFixed(1)}`} sub={metric === 'weight' ? (isDown ? 'goal direction' : 'trending up') : undefined} icon={<TrendingDown className="h-5 w-5" />} iconBg={isDown ? 'bg-success/15 text-success' : 'bg-error/15 text-error'} />
        <StatCard label="Attendance rate" value={`${presentRate}%`} icon={<Award className="h-5 w-5" />} iconBg="bg-accent/15 text-accent-dark dark:text-accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Glass className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-content">{metric === 'weight' ? 'Weight trend' : 'Body fat trend'}</h2>
              <p className="text-xs text-content-muted">{client.name} · last {chartData.length} check-ins</p>
            </div>
            <Badge variant="accent">{chartData.length} entries</Badge>
          </div>
          {chartData.length >= 2 ? <LineChart data={chartData} height={240} /> : <div className="grid h-60 place-items-center rounded-xl border border-dashed border-border text-sm text-content-faint">Not enough data yet</div>}
        </Glass>

        <div className="space-y-6">
          <Glass className="p-5 text-center">
            <h2 className="mb-4 text-left text-sm font-black text-content">Goal progress</h2>
            {goal ? (
              <>
                <Ring value={goal.progress} size={130} stroke={12} label={<><span className="block text-2xl">{goal.progress}%</span></>} />
                <p className="mt-3 text-sm font-black text-content">{goal.title}</p>
                <p className="text-xs text-content-muted">{goal.target}</p>
                <div className="mt-3">
                  <Badge className={cn('uppercase', goal.status === 'on-track' ? 'bg-success/10 text-success' : 'bg-error/10 text-error')}>{goal.status}</Badge>
                </div>
              </>
            ) : <p className="py-10 text-xs text-content-faint">No active goal</p>}
          </Glass>

          <Glass className="p-5">
            <h2 className="mb-3 text-sm font-black text-content">Recent check-ins</h2>
            <div className="space-y-2.5">
              {client.progress.slice(-4).reverse().map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl bg-surface-subtle/60 px-3 py-2.5 text-xs dark:bg-surface-subtle">
                  <span className="font-black text-content">{p.date}</span>
                  <span className="text-content-muted">
                    {p.weightKg !== undefined && <span className="mr-2 font-bold">{p.weightKg.toFixed(1)} kg</span>}
                    {p.bodyFat !== undefined && <span className="font-bold text-accent-dark dark:text-accent">{p.bodyFat}% bf</span>}
                  </span>
                </div>
              ))}
            </div>
          </Glass>
        </div>
      </div>
    </div>
  )
}
