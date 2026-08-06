import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, BadgeCheck, MapPin, Users, Dumbbell, ChevronRight } from 'lucide-react'
import { useDB } from '@/lib/store'
import { Button } from '@/components/ui'

export default function PartnerDetail() {
  const { slug } = useParams()
  const db = useDB()
  const partner = db.partners.find((p) => p.slug === slug) ?? db.partners[0]
  const courses = db.courses.filter((c) => c.partnerSlug === partner.slug)
  const templates = db.templates.filter((t) => t.partnerSlug === partner.slug)
  const related = db.partners.filter((p) => p.slug !== partner.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0">
          <img src={partner.cover} alt={partner.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
        </div>
        <div className="container-shell relative">
          <Link to="/partners" className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-white/70 transition hover:text-white">
            <ChevronRight className="h-4 w-4 rotate-180" /> All partners
          </Link>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <img src={partner.avatar} alt={partner.name} className="h-28 w-28 rounded-2xl border-4 border-accent object-cover shadow-lift" />
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-black text-white sm:text-4xl">
                {partner.name}
                {partner.verified && <BadgeCheck className="h-7 w-7 text-accent" />}
              </h1>
              <p className="mt-1 text-sm font-semibold text-white/70">{partner.role}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-bold text-white/80">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-warning" fill="currentColor" /> {partner.rating}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" /> {partner.clients} clients</span>
                <span className="flex items-center gap-1.5"><Dumbbell className="h-4 w-4 text-accent" /> {partner.programs} programs</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> {partner.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-2xl font-black text-content">About</h2>
            <p className="mt-4 text-base leading-relaxed text-content-muted">{partner.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {partner.specialties.map((s) => (
                <span key={s} className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-black text-primary dark:text-accent">{s}</span>
              ))}
            </div>

            {courses.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-black text-content">Courses by {partner.name}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {courses.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 transition hover:border-accent/40 dark:bg-surface-subtle">
                      <div className="relative h-32">
                        <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                        {c.badge && <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-black text-primary">{c.badge}</span>}
                      </div>
                      <div className="p-5">
                        <p className="text-sm font-black text-content">{c.title}</p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-content-muted">
                          <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" fill="currentColor" /> {c.rating}</span>
                          <span>{c.lessons} lessons</span>
                          <span>{c.students} students</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="text-lg font-black text-content">${c.price}</span>
                            {c.compareAt && <span className="ml-2 text-xs text-content-faint line-through">${c.compareAt}</span>}
                          </div>
                          <Button variant="outline" size="sm">Enroll</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {templates.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-black text-content">Templates</h3>
                <div className="space-y-3">
                  {templates.map((t) => (
                    <div key={t.id} className="flex items-center gap-4 rounded-2xl border border-border bg-surface-subtle/60 p-4 transition hover:border-accent/40 dark:bg-surface-subtle">
                      <img src={t.image} alt={t.title} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-content">{t.title}</p>
                        <p className="text-[11px] font-bold text-content-muted">{t.items} items · {t.downloads} downloads</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-content">{t.price === 0 ? 'Free' : `$${t.price}`}</p>
                        <Button variant="outline" size="sm">Get</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
              <p className="text-sm font-black text-content">Work with {partner.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-content-muted">Book a free discovery call to discuss your goals and see if it is the right fit.</p>
              <Button asChild variant="accent" size="md" className="mt-4 w-full">
                <Link to="/contact">Book free call</Link>
              </Button>
              <Button asChild variant="outline" size="md" className="mt-2 w-full">
                <Link to="/programs">View programs</Link>
              </Button>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                <p className="mb-4 text-sm font-black text-content">Other partners</p>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} to={`/partners/${r.slug}`} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface-subtle/60">
                      <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-content">{r.name}</p>
                        <p className="text-[11px] font-semibold text-content-muted">{r.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
