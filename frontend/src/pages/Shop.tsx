import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingBag, Search } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHero } from '@/components/PageHero'
import { Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

const CATS = ['All', 'Equipment', 'Supplement', 'Apparel', 'Digital'] as const
type Cat = (typeof CATS)[number]

export default function Shop() {
  const db = useDB()
  const [cat, setCat] = useState<Cat>('All')
  const [q, setQ] = useState('')

  const list = db.products.filter((p) => {
    if (cat !== 'All' && p.category !== cat.toLowerCase()) return false
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <>
      <PageHero crumb="Shop" eyebrow="Shop" title={<>Premium <span className="text-gradient-accent">fitness gear</span></>} description="Equipment, supplements, and digital tools — hand-picked by our coaches." />

      <section className="py-16 lg:py-24">
        <div className="container-shell">
          {/* Filters */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface p-1">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={cn('rounded-full px-4 py-2 text-xs font-black transition', cat === c ? 'bg-cta-gradient text-primary shadow-glow' : 'text-content-muted hover:text-content')}>{c}</button>
              ))}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {p.badge && <Badge className="absolute left-4 top-4 bg-accent text-primary">{p.badge}</Badge>}
                  {p.compareAt && <Badge className="absolute right-4 top-4 bg-error/90 text-white">{Math.round((1 - p.price / p.compareAt) * 100)}% off</Badge>}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-content-faint">{p.category}</p>
                  <h3 className="mt-1 text-base font-black text-content">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-content-muted">{p.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-content-muted">
                    <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" /> {p.rating} <span className="text-content-faint">({p.reviews})</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-content">${p.price}</span>
                      {p.compareAt && <span className="ml-2 text-sm text-content-faint line-through">${p.compareAt}</span>}
                    </div>
                    <Button variant="accent" size="sm"><ShoppingBag className="h-4 w-4" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
