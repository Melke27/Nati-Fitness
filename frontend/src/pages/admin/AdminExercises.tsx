import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Library, Plus, X, ChevronRight, Dumbbell, CheckCircle2 } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, SearchInput, EmptyState, Drawer, Segmented } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'
import { MEDIA } from '@/lib/media'

const MUSCLE_GROUPS = ['All', 'Legs · Glutes', 'Chest · Triceps', 'Back · Biceps', 'Core', 'Full Body', 'Shoulders']

const MUSCLE_IMG: Record<string, string> = {
  'Legs · Glutes': MEDIA.deadlift,
  'Chest · Triceps': MEDIA.barbell,
  'Back · Biceps': MEDIA.trainer,
  'Core': MEDIA.plyo,
  'Full Body': MEDIA.gym,
  'Shoulders': MEDIA.barbell,
}

export default function AdminExercises() {
  const db = useDB()
  const toast = useToast()
  const [q, setQ] = useState('')
  const [muscle, setMuscle] = useState('All')
  const [level, setLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All')
  const [selected, setSelected] = useState<string | null>(null)

  const exercises = useMemo(
    () => db.exercises.filter((e) => (muscle === 'All' || e.muscle.includes(muscle) || e.muscle === muscle) && (level === 'All' || e.level === level) && e.name.toLowerCase().includes(q.toLowerCase())),
    [db, q, muscle, level],
  )

  const current = db.exercises.find((e) => e.id === selected)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Exercise Library"
        sub={`${db.exercises.length} movements · organised by muscle group & equipment`}
        icon={<Library className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={() => toast?.success('Exercise added to library')}><Plus className="h-4 w-4" /> Add exercise</Button>}
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput value={q} onChange={setQ} placeholder="Search exercises…" className="w-full lg:w-72" />
        <Segmented<'All' | 'Beginner' | 'Intermediate' | 'Advanced'> value={level} onChange={setLevel} options={['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => ({ id: l as typeof level, label: l }))} />
      </div>

      <div className="flex flex-wrap gap-2">
        {MUSCLE_GROUPS.map((m) => (
          <button key={m} onClick={() => setMuscle(m)}
            className={cn('rounded-full border px-4 py-2 text-xs font-bold transition', muscle === m ? 'border-accent bg-accent/15 text-accent-dark dark:text-accent' : 'border-border text-content-muted hover:border-accent/40')}>
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exercises.map((e, i) => (
          <motion.button key={e.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => setSelected(e.id)}
            className="group overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 text-left transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
            <div className="relative h-32 overflow-hidden">
              <img src={MUSCLE_IMG[e.muscle] ?? MEDIA.gym} alt={e.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className={cn('absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-black', e.level === 'Beginner' ? 'bg-success text-primary' : e.level === 'Intermediate' ? 'bg-warning text-primary' : 'bg-error text-white')}>{e.level}</span>
              <p className="absolute bottom-3 left-4 text-sm font-black text-white">{e.name}</p>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-[11px] font-bold text-content-muted">{e.muscle}</p>
              <p className="text-[11px] font-bold text-content-faint">{e.equipment}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {exercises.length === 0 && <EmptyState title="No exercises match" sub="Try a different muscle group or search term." />}

      {/* Detail drawer */}
      <Drawer open={!!current} onClose={() => setSelected(null)}>
        {current && (
          <div>
            <div className="relative h-52">
              <img src={MUSCLE_IMG[current.muscle] ?? MEDIA.gym} alt={current.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-solid to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur" aria-label="Close"><X className="h-4 w-4" /></button>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black text-primary">{current.level}</span>
                <h3 className="mt-2 text-xl font-black text-white">{current.name}</h3>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-subtle/60 p-4 dark:bg-surface-subtle">
                  <p className="text-[9px] font-black uppercase tracking-wider text-content-faint">Muscle group</p>
                  <p className="mt-1 text-sm font-black text-content">{current.muscle}</p>
                </div>
                <div className="rounded-xl bg-surface-subtle/60 p-4 dark:bg-surface-subtle">
                  <p className="text-[9px] font-black uppercase tracking-wider text-content-faint">Equipment</p>
                  <p className="mt-1 text-sm font-black text-content">{current.equipment}</p>
                </div>
              </div>
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-xs font-black text-content-muted"><CheckCircle2 className="h-4 w-4 text-accent-dark dark:text-accent" /> How to perform</h4>
                <ol className="space-y-3">
                  {current.instructions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-border p-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cta-gradient text-[11px] font-black text-primary">{i + 1}</span>
                      <p className="text-sm font-bold text-content">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex gap-3">
                <Button variant="accent" className="flex-1" onClick={() => { toast?.success(`${current.name} added to a workout plan`); setSelected(null) }}><Dumbbell className="h-4 w-4" /> Add to workout</Button>
                <button className="grid h-11 w-11 place-items-center rounded-xl border border-border text-content-muted transition hover:border-accent hover:text-content" aria-label="View related exercises"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
