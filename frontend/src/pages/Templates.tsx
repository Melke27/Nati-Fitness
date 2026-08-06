import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Download, Search } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const CATS = ['All', 'Workout', 'Nutrition', 'Meal-Plan'] as const
type Cat = (typeof CATS)[number]

export default function Templates() {
  const db = useDB()
  const [cat, setCat] = useState<Cat>('All')
  const [q, setQ] = useState('')

  const list = db.templates.filter((t) => {
    if (cat !== 'All' && t.category !== cat.toLowerCase().replace('-', '-')) return false
    if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <>
      <PageHero crumb="Templates" eyebrow="Templates" title={<>Done-for-you <span className="text-gradient-accent">plans</span></>} description="Workout programs, meal plans, and trackers — built by our coaches, ready for you." />

      <section className="py-16 lg:py-24">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface p-1">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={cn('rounded-full px-4 py-2 text-xs font-black transition', cat === c ? 'bg-cta-gradient text-primary shadow-glow' : 'text-content-muted hover:text-content')}>{c}</button>
              ))}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates…" className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => {
              const author = db.partners.find((p) => p.slug === t.partnerSlug)
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.05 }} className="flex items-center gap-4 rounded-2xl border border-border bg-surface-subtle/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                  <img src={t.image} alt={t.title} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-content-faint">{t.category}</p>
                    <h3 className="mt-0.5 truncate text-sm font-black text-content">{t.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-[11px] font-bold text-content-muted">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" fill="currentColor" /> {t.rating}</span>
                      <span className="flex items-center gap-1"><Download className="h-3 w-3 text-accent" /> {t.downloads}</span>
                      {author && <span className="truncate text-content-faint">by {author.name}</span>}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-content">{t.price === 0 ? 'Free' : `ETB ${t.price.toLocaleString()}`}</p>
                    <Button variant="outline" size="sm" className="mt-1">Get</Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
