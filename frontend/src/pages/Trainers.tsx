import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, BadgeCheck, ChevronRight, Users, Dumbbell, MapPin } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui'
import { SectionHeading } from '@/components/ui'

export default function Trainers() {
  const db = useDB()
  const partners = db.partners

  return (
    <>
      <PageHero crumb="Trainers" eyebrow="Our Trainers" title={<>Train with the <span className="text-gradient-accent">best</span></>} description="Elite coaches and specialists. Verified, reviewed, and ready to help you transform." />

      <section className="py-20 lg:py-28">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Meet the team"
            title={<>Verified <span className="text-gradient-accent">experts</span></>}
            description="Every trainer is certified, background-checked, and rated by real clients."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/trainers/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-lift">
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img src={p.cover} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                    {p.rating && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md">
                        <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" /> {p.rating}
                      </span>
                    )}
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                      <MapPin className="h-3 w-3 text-accent" /> {p.location}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5">
                      <img src={p.avatar} alt={p.name} className="h-20 w-20 shrink-0 rounded-2xl border-2 border-accent object-cover shadow-glow" />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-lg font-black leading-tight text-white">
                          {p.name}
                          {p.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />}
                        </p>
                        <p className="truncate text-xs font-semibold text-white/70">{p.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-content-muted">{p.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-black text-primary dark:text-accent">{s}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-bold text-content-muted">
                      <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-accent" /> {p.clients} clients</span>
                      <span className="flex items-center gap-1.5"><Dumbbell className="h-3.5 w-3.5 text-accent" /> {p.programs} programs</span>
                      <span className="flex items-center gap-1.5 text-accent-dark dark:text-accent">View <ChevronRight className="h-3.5 w-3.5" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-subtle/40 py-20 lg:py-28">
        <div className="container-shell">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { value: `${partners.reduce((a, p) => a + p.clients, 0)}+`, label: 'Combined clients' },
              { value: `${partners.length}`, label: 'Verified trainers' },
              { value: `${partners.reduce((a, p) => a + p.programs, 0)}+`, label: 'Programs available' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-surface-subtle/60 p-8 text-center dark:bg-surface-subtle">
                <p className="text-4xl font-black tracking-tight text-content">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-content-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Become a trainer</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">Are you a certified coach? Join our platform, get matched with clients, and grow your business with our tools.</p>
              <Button asChild variant="accent" size="lg" className="mt-8">
                <Link to="/contact">Apply now <ChevronRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
