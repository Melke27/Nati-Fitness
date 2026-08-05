import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, FileText, BookOpen, Dumbbell, Salad, Sun, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, Card } from '@/components/ui'
import { Modal } from '@/components/ui'

const LIBRARY = [
  { icon: Dumbbell, title: 'Goblet Squat — Form Masterclass', cat: 'Exercise', duration: '4:12', color: 'text-accent-dark dark:text-accent' },
  { icon: Dumbbell, title: 'Romanian Deadlift — How to Hinge', cat: 'Exercise', duration: '3:48', color: 'text-accent-dark dark:text-accent' },
  { icon: Dumbbell, title: 'Push-up Progression (3 levels)', cat: 'Exercise', duration: '5:01', color: 'text-accent-dark dark:text-accent' },
  { icon: Sun, title: '10-min Mobility & Hip Openers', cat: 'Recovery', duration: '9:36', color: 'text-warning' },
  { icon: Salad, title: 'Meal Prep: 5 High-Protein Lunches', cat: 'Nutrition', duration: '12:20', color: 'text-success' },
  { icon: Dumbbell, title: 'Full Body Dumbbell Workout', cat: 'Workout', duration: '32:00', color: 'text-accent-dark dark:text-accent' },
  { icon: Sun, title: 'Breathwork for Deep Sleep', cat: 'Recovery', duration: '8:15', color: 'text-warning' },
]

const GUIDES = [
  { icon: FileText, title: 'The 12-Week Transformation Handbook', type: 'PDF', pages: '48 pages' },
  { icon: FileText, title: 'Macro Cheat Sheet & Portion Guide', type: 'PDF', pages: '12 pages' },
  { icon: FileText, title: 'Habit Builder: 90-Day Tracker', type: 'PDF', pages: '12 pages' },
  { icon: BookOpen, title: 'Gym Starter Dictionary', type: 'PDF', pages: '24 pages' },
]

export default function ClientResources() {
  const [playing, setPlaying] = useState<null | (typeof LIBRARY)[number]>(null)
  const [q, setQ] = useState('')
  const list = LIBRARY.filter((v) => (v.title + v.cat).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Resources</h1>
          <p className="text-sm text-content-muted">Video tutorials, guides & downloads</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources…"
            className="h-12 w-64 rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 dark:bg-surface-subtle"
          />
        </div>
      </div>

      <Card>
        <h2 className="mb-5 text-sm font-black text-content">Exercise library</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((v, i) => (
            <motion.button
              key={v.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setPlaying(v)}
              className="group flex items-center gap-4 rounded-2xl border border-border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card"
            >
              <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-subtle transition group-hover:bg-accent/15 dark:bg-surface-subtle')}>
                <v.icon className={cn('h-5 w-5', v.color)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-content">{v.title}</p>
                <p className="mt-0.5 flex items-center gap-2 text-xs font-bold text-content-faint">
                  <Badge variant="outline" className="px-2 py-0 text-[9px]">{v.cat}</Badge> {v.duration}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-primary transition group-hover:scale-110 group-hover:bg-accent dark:text-accent dark:group-hover:text-primary">
                <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
              </span>
            </motion.button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-5 text-sm font-black text-content">Guides & downloads</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g, i) => (
            <motion.a
              key={g.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-error/10 text-error">
                <g.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-content">{g.title}</p>
                <p className="mt-0.5 text-xs font-bold text-content-faint">{g.type} · {g.pages}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-content-muted transition group-hover:border-accent group-hover:text-accent-dark dark:group-hover:text-accent">
                <Download className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </Card>

      <Modal open={!!playing} onClose={() => setPlaying(null)} title={playing?.title ?? 'Video'}>
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary">
            <div className="absolute inset-0 grid grid-cols-3 gap-px p-px opacity-30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white/5" />
              ))}
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-primary shadow-glow">
                <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
              </span>
            </div>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm font-bold text-white">
              {playing?.title}
            </p>
          </div>
          <p className="text-xs text-content-muted">
            Demo player — connect your video hosting (Vimeo/YouTube) or upload MP4s in the admin panel.
          </p>
        </div>
      </Modal>
    </div>
  )
}
