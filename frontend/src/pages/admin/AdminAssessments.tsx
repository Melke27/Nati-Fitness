import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Plus, X, Target, Activity, Scale } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, Ring, EmptyState, Segmented, StatCard } from '@/components/trainer'
import { Button, Badge } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { formatDate } from '@/lib/utils'

type Filter = 'All' | 'Initial' | 'Monthly Check-in' | 'Movement Screen'

export default function AdminAssessments() {
  const db = useDB()
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ clientId: db.clients[0]?.id ?? '', type: 'Monthly Check-in' as string, score: 80, bodyFat: '', notes: '' })

  const list = db.assessments.filter((a) => filter === 'All' || a.type === filter).sort((a, b) => (a.date < b.date ? 1 : -1))
  const client = (id: string) => db.clients.find((c) => c.id === id)

  const create = () => {
    toast?.success('Assessment recorded')
    setOpen(false)
    setForm({ ...form, notes: '' })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Assessments"
        sub={`${db.assessments.length} assessments on record`}
        icon={<ClipboardList className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New assessment</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Avg. score" value="77" sub="across all members" icon={<Target className="h-5 w-5" />} iconBg="bg-accent/15 text-accent-dark dark:text-accent" />
        <StatCard label="Initial assessments" value={db.assessments.filter((a) => a.type === 'Initial').length} icon={<Scale className="h-5 w-5" />} iconBg="bg-sky-500/15 text-sky-500" />
        <StatCard label="Monthly check-ins" value={db.assessments.filter((a) => a.type === 'Monthly Check-in').length} icon={<Activity className="h-5 w-5" />} iconBg="bg-success/15 text-success" />
      </div>

      <Segmented<Filter> value={filter} onChange={setFilter} options={(['All', 'Initial', 'Monthly Check-in', 'Movement Screen'] as Filter[]).map((f) => ({ id: f, label: f }))} />

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Glass hover className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={client(a.clientId)?.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-black text-content">{client(a.clientId)?.name ?? 'Member'}</p>
                    <p className="text-xs text-content-muted">{a.type} · {formatDate(a.date)}</p>
                  </div>
                </div>
                <Ring value={a.score} size={52} stroke={5} color={a.score >= 80 ? '#22C55E' : a.score >= 65 ? '#F59E0B' : '#EF4444'} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {a.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-surface-subtle/60 p-2.5 text-center dark:bg-surface-subtle">
                    <p className="text-[9px] font-black uppercase tracking-wider text-content-faint">{m.label}</p>
                    <p className="mt-0.5 text-xs font-black text-content">{m.value}</p>
                  </div>
                ))}
              </div>
              {a.bodyFat !== undefined && (
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold text-content-muted">
                  <Badge variant="accent">Body fat {a.bodyFat}%</Badge>
                  {a.bmi !== undefined && <Badge variant="warning">BMI {a.bmi.toFixed(1)}</Badge>}
                </div>
              )}
              <p className="mt-3 rounded-xl bg-surface-subtle/60 p-3 text-xs font-bold text-content-muted dark:bg-surface-subtle">{a.notes}</p>
            </Glass>
          </motion.div>
        ))}
      </div>
      {list.length === 0 && <EmptyState title="No assessments" sub="Record an assessment to track movement & metrics." action={<Button variant="accent" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New assessment</Button>} />}

      {/* Create modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface-solid shadow-lift dark:bg-surface">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="text-base font-black text-content">New assessment</h3>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-content-muted hover:text-content" aria-label="Close"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4 px-6 py-5">
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Member</label>
                  <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle">
                    {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-content-muted">Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle">
                      {['Initial', 'Monthly Check-in', 'Movement Screen'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-content-muted">Body fat %</label>
                    <input value={form.bodyFat} onChange={(e) => setForm({ ...form, bodyFat: e.target.value })} placeholder="e.g. 27" className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Score · {form.score}</label>
                  <input type="range" min={0} max={100} value={form.score} onChange={(e) => setForm({ ...form, score: +e.target.value })} className="w-full accent-[#E11D48]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Coach observations…" className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                </div>
              </div>
              <div className="flex gap-3 border-t border-border px-6 py-4">
                <Button variant="ghost" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="accent" className="flex-1" onClick={create}><Plus className="h-4 w-4" /> Save assessment</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
