import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Plus, Clock, Flame, Users, X, Trash2, Pencil } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, EmptyState, SearchInput, Drawer, MiniBar } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'
import { MEDIA } from '@/lib/media'

interface WorkoutPlan {
  id: string
  name: string
  tagline: string
  days: string[]
  durationMin: number
  level: string
  focus: string[]
  exercises: number
  image: string
  assigned: number
}

const SEED_PLANS: WorkoutPlan[] = [
  { id: 'wp1', name: 'Full Body Conditioning', tagline: 'Balanced strength & cardio', days: ['Mon', 'Wed', 'Fri'], durationMin: 40, level: 'Beginner', focus: ['Full Body', 'Cardio', 'Core'], exercises: 8, image: MEDIA.trainer, assigned: 2 },
  { id: 'wp2', name: 'Upper Body Push / Pull', tagline: 'Chest, back, arms split', days: ['Tue', 'Thu'], durationMin: 50, level: 'Intermediate', focus: ['Chest', 'Back', 'Shoulders'], exercises: 12, image: MEDIA.barbell, assigned: 1 },
  { id: 'wp3', name: 'Lower Body Power', tagline: 'Legs, glutes & posterior chain', days: ['Sat'], durationMin: 55, level: 'Intermediate', focus: ['Legs', 'Glutes', 'Hamstrings'], exercises: 9, image: MEDIA.deadlift, assigned: 2 },
  { id: 'wp4', name: 'HIIT Fat Burner', tagline: 'High intensity intervals', days: ['Mon', 'Thu'], durationMin: 25, level: 'Advanced', focus: ['Conditioning', 'Fat Loss'], exercises: 6, image: MEDIA.plyo, assigned: 0 },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function AdminWorkouts() {
  const db = useDB()
  const toast = useToast()
  const [plans, setPlans] = useState<WorkoutPlan[]>(SEED_PLANS)
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<WorkoutPlan | null>(null)
  const [form, setForm] = useState({ name: '', tagline: '', durationMin: 40, level: 'Beginner', days: [] as string[], image: MEDIA.gym })

  const filtered = useMemo(() => plans.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.tagline.toLowerCase().includes(q.toLowerCase())), [q, plans])
  const totalExercises = plans.reduce((a, p) => a + p.exercises, 0)
  const totalAssignments = plans.reduce((a, p) => a + p.assigned, 0)

  const create = () => {
    if (!form.name.trim()) return toast?.error('Give your plan a name')
    setPlans((p) => [{ id: `wp_${Date.now()}`, ...form, focus: ['Full Body', 'Core'], exercises: 6 + Math.floor(Math.random() * 6), assigned: 0 }, ...p])
    toast?.success('Workout plan created')
    setOpen(false)
    setForm({ name: '', tagline: '', durationMin: 40, level: 'Beginner', days: [], image: MEDIA.gym })
  }

  const remove = (id: string) => {
    setPlans((p) => p.filter((x) => x.id !== id))
    toast?.success('Plan removed')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Workout Plans"
        sub={`${plans.length} plans · ${totalExercises} exercises · ${totalAssignments} active assignments`}
        icon={<Dumbbell className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New plan</Button>}
      />

      <SearchInput value={q} onChange={setQ} placeholder="Search workout plans…" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Glass hover className="group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-black text-primary">{p.level}</span>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-base font-black text-white">{p.name}</p>
                  <p className="text-[11px] text-white/70">{p.tagline}</p>
                </div>
                <button onClick={() => remove(p.id)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white/70 opacity-0 backdrop-blur transition hover:text-error group-hover:opacity-100" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.focus.map((f) => <span key={f} className="rounded-full bg-surface-subtle px-2.5 py-1 text-[10px] font-black text-content-muted dark:bg-surface-subtle">{f}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-content-muted">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-accent-dark dark:text-accent" /> {p.durationMin} min</span>
                  <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-warning" /> {p.exercises} exercises</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-sky-500" /> {p.assigned} members</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setDetail(p)} className="flex-1 rounded-xl bg-cta-gradient py-2.5 text-xs font-black text-primary transition hover:-translate-y-0.5">View plan</button>
                  <button onClick={() => toast?.success(`Plan assigned to members`)} className="rounded-xl border border-border px-3 py-2.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">Assign</button>
                </div>
              </div>
            </Glass>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyState title="No plans found" sub="Create your first workout plan to get started." action={<Button variant="accent" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New plan</Button>} />}

      {/* Create modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface-solid shadow-lift dark:bg-surface">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="text-base font-black text-content">New workout plan</h3>
                  <p className="text-xs text-content-muted">Design a program for your members</p>
                </div>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-content-muted hover:text-content" aria-label="Close"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4 px-6 py-5">
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Plan name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Summer Shred Program" className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Tagline</label>
                  <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="Short description" className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-content-muted">Duration (min)</label>
                    <input type="number" value={form.durationMin} onChange={(e) => setForm({ ...form, durationMin: +e.target.value })} className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-content-muted">Level</label>
                    <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle">
                      {['Beginner', 'Intermediate', 'Advanced'].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Training days</label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((d) => (
                      <button key={d} onClick={() => setForm({ ...form, days: form.days.includes(d) ? form.days.filter((x) => x !== d) : [...form.days, d] })}
                        className={cn('h-10 w-12 rounded-xl border text-xs font-black transition', form.days.includes(d) ? 'border-accent bg-accent/15 text-accent-dark dark:text-accent' : 'border-border text-content-muted hover:border-accent/40')}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-t border-border px-6 py-4">
                <Button variant="ghost" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="accent" className="flex-1" onClick={create}><Plus className="h-4 w-4" /> Create plan</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail drawer */}
      <Drawer open={!!detail} onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <div className="relative h-52">
              <img src={detail.image} alt={detail.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-solid to-transparent" />
              <button onClick={() => setDetail(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur" aria-label="Close"><X className="h-4 w-4" /></button>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black text-primary">{detail.level}</span>
                <h3 className="mt-2 text-xl font-black text-white">{detail.name}</h3>
                <p className="text-xs text-white/70">{detail.tagline}</p>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Days', value: detail.days.join(' · ') }, { label: 'Duration', value: `${detail.durationMin} min` }, { label: 'Members', value: String(detail.assigned) }].map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface-subtle/60 p-3 text-center dark:bg-surface-subtle">
                    <p className="text-[9px] font-black uppercase tracking-wider text-content-faint">{s.label}</p>
                    <p className="mt-0.5 text-xs font-black text-content">{s.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="mb-2 text-xs font-black text-content-muted">Focus areas</h4>
                <div className="flex flex-wrap gap-2">{detail.focus.map((f) => <span key={f} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-dark dark:text-accent">{f}</span>)}</div>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-black text-content-muted">Weekly structure</h4>
                <div className="flex items-center gap-1.5">
                  {DAYS.map((d) => (
                    <div key={d} className={cn('flex-1 rounded-lg py-3 text-center text-[10px] font-black', detail.days.includes(d) ? 'bg-cta-gradient text-primary' : 'bg-surface-subtle text-content-faint dark:bg-surface-subtle')}>{d}</div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-black text-content-muted">Assigned members</h4>
                <div className="space-y-2">
                  {db.clients.filter((c) => c.status === 'active').map((c) => {
                    const on = c.id === 'client_sarah' || c.id === 'client_david'
                    return (
                      <button key={c.id} onClick={() => toast?.success(`Updated assignment for ${c.name}`)} className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 transition hover:border-accent/50">
                        <img src={c.avatar} alt={c.name} className="h-9 w-9 rounded-full object-cover" />
                        <span className="flex-1 text-left text-xs font-black text-content">{c.name}</span>
                        <MiniBar value={on ? 100 : 35} className="w-20" />
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="accent" className="flex-1" onClick={() => { toast?.success('Plan assigned'); setDetail(null) }}><Users className="h-4 w-4" /> Assign to members</Button>
                <button className="grid h-11 w-11 place-items-center rounded-xl border border-border text-content-muted hover:text-content" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
