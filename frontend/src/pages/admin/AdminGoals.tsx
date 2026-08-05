import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Plus, CheckCircle2, AlertTriangle, CircleDot } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, EmptyState } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn, formatDate } from '@/lib/utils'

const COLUMNS = [
  { status: 'on-track', label: 'On track', color: 'text-success', dot: 'bg-success' },
  { status: 'at-risk', label: 'At risk', color: 'text-error', dot: 'bg-error' },
  { status: 'upcoming', label: 'Upcoming', color: 'text-warning', dot: 'bg-warning' },
  { status: 'achieved', label: 'Achieved', color: 'text-sky-500', dot: 'bg-sky-500' },
] as const

export default function AdminGoals() {
  const db = useDB()
  const toast = useToast()
  const [draft, setDraft] = useState('')

  const client = (id: string) => db.clients.find((c) => c.id === id)

  const addGoal = () => {
    if (!draft.trim()) return toast?.error('Describe the goal first')
    toast?.success('Goal created')
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Goals"
        sub={`${db.goals.length} active goals · ${db.goals.filter((g) => g.status === 'achieved').length} achieved`}
        icon={<Target className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={addGoal}><Plus className="h-4 w-4" /> New goal</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const goals = db.goals.filter((g) => g.status === col.status)
          return (
            <Glass key={col.status} className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className={cn('flex items-center gap-2 text-xs font-black uppercase tracking-wider', col.color)}>
                  <span className={cn('h-2 w-2 rounded-full', col.dot)} /> {col.label}
                </p>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-surface-subtle text-[10px] font-black text-content-muted dark:bg-surface-subtle">{goals.length}</span>
              </div>
              <div className="space-y-3">
                {goals.map((g) => {
                  const c = client(g.clientId)
                  return (
                    <motion.div key={g.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border bg-surface-subtle/40 p-4 dark:bg-surface-subtle">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={c?.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                          <p className="text-xs font-black text-content">{g.title}</p>
                        </div>
                        {g.status === 'achieved' ? <CheckCircle2 className="h-4 w-4 text-success" /> : g.status === 'at-risk' ? <AlertTriangle className="h-4 w-4 text-error" /> : <CircleDot className="h-4 w-4 text-content-faint" />}
                      </div>
                      <p className="mt-2 text-[11px] text-content-muted">{g.target} · due {formatDate(g.deadline)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-solid/10">
                          <motion.div className={cn('h-full rounded-full', g.status === 'achieved' ? 'bg-sky-500' : g.status === 'at-risk' ? 'bg-error' : 'bg-cta-gradient')} initial={{ width: 0 }} whileInView={{ width: `${g.progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                        </div>
                        <span className="text-[10px] font-black text-content-muted">{g.progress}%</span>
                      </div>
                      <button onClick={() => toast?.success(`Progress updated for ${g.title}`)} className="mt-3 w-full rounded-lg border border-border py-1.5 text-[10px] font-black text-content-muted transition hover:border-accent hover:text-content">Update progress</button>
                    </motion.div>
                  )
                })}
                {goals.length === 0 && <p className="py-6 text-center text-xs font-bold text-content-faint">No goals</p>}
              </div>
            </Glass>
          )
        })}
      </div>

      {/* Quick add */}
      <Glass className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addGoal()} placeholder="Add a goal for a member, e.g. “Sarah — run 5k under 30 min”…" className="h-11 flex-1 rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
        <Button variant="accent" onClick={addGoal}><Plus className="h-4 w-4" /> Add goal</Button>
      </Glass>

      {db.goals.length === 0 && <EmptyState title="No goals yet" sub="Create goals to keep members accountable." />}
    </div>
  )
}
