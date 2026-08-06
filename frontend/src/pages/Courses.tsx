import { motion } from 'framer-motion'
import { Star, Play, Clock, BarChart3 } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHero } from '@/components/PageHero'
import { Button, Badge } from '@/components/ui'

export default function Courses() {
  const db = useDB()

  return (
    <>
      <PageHero crumb="Courses" eyebrow="Courses" title={<>Learn from the <span className="text-gradient-accent">pros</span></>} description="In-depth video courses led by our certified coaches. Go at your own pace." />

      <section className="py-16 lg:py-24">
        <div className="container-shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {db.courses.map((c, i) => {
              const author = db.partners.find((p) => p.slug === c.partnerSlug)
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent/90 text-primary opacity-0 transition-all group-hover:opacity-100"><Play className="h-5 w-5 translate-x-0.5" fill="currentColor" /></span>
                    {c.badge && <Badge className="absolute left-4 top-4 bg-accent text-primary">{c.badge}</Badge>}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-content-faint">
                      <span>{c.level}</span>
                      <span>·</span>
                      <span>{c.hours}h</span>
                    </div>
                    <h3 className="mt-2 text-base font-black text-content">{c.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-content-muted">{c.description}</p>
                    {author && (
                      <div className="mt-3 flex items-center gap-2">
                        <img src={author.avatar} alt={author.name} className="h-6 w-6 rounded-full object-cover" />
                        <span className="text-[11px] font-bold text-content-muted">{author.name}</span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-[11px] font-bold text-content-muted">
                      <span className="flex items-center gap-1"><Play className="h-3 w-3 text-accent" /> {c.lessons}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {c.hours}h</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" fill="currentColor" /> {c.rating}</span>
                      <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3 text-accent" /> {c.students}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <span className="text-xl font-black text-content">{c.price === 0 ? 'Free' : `ETB ${c.price.toLocaleString()}`}</span>
                        {c.compareAt && <span className="ml-2 text-sm text-content-faint line-through">ETB {c.compareAt.toLocaleString()}</span>}
                      </div>
                      <Button variant="accent" size="sm">Enroll</Button>
                    </div>
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
