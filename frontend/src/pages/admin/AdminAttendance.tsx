import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck2, CheckCircle2, XCircle, Clock3, Percent } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, StatCard, Segmented, ImgAvatar } from '@/components/trainer'
import { cn } from '@/lib/utils'

type Status = 'present' | 'late' | 'absent'
type Filter = 'all' | Status

const STYLE: Record<Status, { label: string; cls: string }> = {
  present: { label: 'Present', cls: 'bg-success/10 text-success' },
  late: { label: 'Late', cls: 'bg-warning/10 text-warning' },
  absent: { label: 'Absent', cls: 'bg-error/10 text-error' },
}

export default function AdminAttendance() {
  const db = useDB()
  const [filter, setFilter] = useState<Filter>('all')
  const [attendance, setAttendance] = useState(db.attendance)

  const client = (id: string) => db.clients.find((c) => c.id === id)
  const list = attendance.filter((a) => filter === 'all' || a.status === filter).sort((a, b) => (a.date < b.date ? 1 : -1))

  const total = attendance.length
  const present = attendance.filter((a) => a.status === 'present').length
  const late = attendance.filter((a) => a.status === 'late').length
  const absent = attendance.filter((a) => a.status === 'absent').length
  const rate = total ? Math.round((present / total) * 100) : 0

  const toggle = (id: string) => {
    setAttendance((prev) => prev.map((a) => (a.id === id ? { ...a, status: a.status === 'present' ? 'late' : a.status === 'late' ? 'absent' : 'present' } : a)))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Attendance" sub={`Last ${total} sessions logged`} icon={<CalendarCheck2 className="h-5 w-5" />} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sessions logged" value={total} icon={<CalendarCheck2 className="h-5 w-5" />} />
        <StatCard label="Present" value={present} trend={rate} icon={<CheckCircle2 className="h-5 w-5" />} iconBg="bg-success/15 text-success" />
        <StatCard label="Late" value={late} icon={<Clock3 className="h-5 w-5" />} iconBg="bg-warning/15 text-warning" />
        <StatCard label="Absent" value={absent} icon={<XCircle className="h-5 w-5" />} iconBg="bg-error/15 text-error" />
      </div>

      <Segmented<Filter> value={filter} onChange={setFilter} options={(['all', 'present', 'late', 'absent'] as Filter[]).map((f) => ({ id: f, label: f[0].toUpperCase() + f.slice(1) }))} />

      <Glass className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Session</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Tap to cycle</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a, i) => {
                const c = client(a.clientId)
                return (
                  <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ImgAvatar name={c?.name ?? ''} src={c?.avatar} size="sm" />
                        <span className="font-black text-content">{c?.name ?? '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-content">{a.session}</td>
                    <td className="px-6 py-4 text-content-muted">{a.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-black', STYLE[a.status].cls)}>{STYLE[a.status].label}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => toggle(a.id)} className="rounded-lg border border-border px-3 py-1.5 text-[10px] font-black text-content-muted transition hover:border-accent hover:text-content">Cycle →</button>
                    </td>
                  </motion.tr>
                )
              })}
              {list.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-content-faint">No records for this filter</td></tr>}
            </tbody>
          </table>
        </div>
      </Glass>

      <Glass className="flex flex-wrap items-center gap-6 p-5">
        <p className="flex items-center gap-2 text-sm font-black text-content"><Percent className="h-4 w-4 text-accent-dark dark:text-accent" /> Overall attendance rate: <span className="text-accent-dark dark:text-accent">{rate}%</span></p>
        <div className="h-2 min-w-40 flex-1 overflow-hidden rounded-full bg-surface-solid/10">
          <motion.div className="h-full rounded-full bg-cta-gradient" initial={{ width: 0 }} whileInView={{ width: `${rate}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>
        <p className="text-xs text-content-muted">Tip: members with &gt;90% attendance see 2× faster results.</p>
      </Glass>
    </div>
  )
}
