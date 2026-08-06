import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, BadgeCheck, MapPin, Users, Dumbbell, ChevronRight, ArrowRight, Salad, PlayCircle, CalendarCheck, MessageCircle, Sparkles } from 'lucide-react'
import { useDB } from '@/lib/store'
import { MEDIA } from '@/lib/media'
import { Button } from '@/components/ui'

const FEATURES = [
  { icon: Dumbbell, title: 'Personalized Training Program', desc: 'Every workout is built around your body, schedule, and goals — nothing generic.' },
  { icon: Salad, title: 'Personalized Meal Plan', desc: 'Simple, realistic meals you can actually enjoy while making progress.' },
  { icon: PlayCircle, title: 'Exercise Video Library', desc: 'Clear video demos for every exercise so you always know exactly what to do.' },
  { icon: CalendarCheck, title: 'Weekly Progress Reviews', desc: 'I track your progress every week and adjust the plan whenever needed.' },
  { icon: MessageCircle, title: 'Direct Coach Support', desc: 'Message me anytime. I\'ll be there to answer questions and keep you on track.' },
]

export default function TrainerDetail() {
  const { slug } = useParams()
  const db = useDB()
  const partner = db.partners.find((p) => p.slug === slug) ?? db.partners[0]
  const courses = db.courses.filter((c) => c.partnerSlug === partner.slug)
  const templates = db.templates.filter((t) => t.partnerSlug === partner.slug)
  const related = db.partners.filter((p) => p.slug !== partner.slug).slice(0, 3)
  const transformations = [
    { image: partner.cover, label: '8 months' },
    { image: MEDIA.gymDark, label: '1 year' },
    { image: MEDIA.barbell, label: '6 months' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0">
          <img src={partner.cover} alt={partner.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
        </div>
        <div className="container-shell relative">
          <Link to="/trainers" className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-white/70 transition hover:text-white">
            <ChevronRight className="h-4 w-4 rotate-180" /> All trainers
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Online Coaching with {partner.name}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-5xl">
            Let's take your fitness to the next level.
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            I'll create a training and nutrition plan built for your goals, your schedule, and your lifestyle, and I'll guide you every step of the way.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="accent" size="md" className="group shadow-glow">
              <Link to={`/onboarding?coach=${partner.slug}`}>Start Your Transformation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild variant="outline" size="md" className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10">
              <Link to="/contact">Book free call</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-start gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img src={partner.avatar} alt={partner.name} className="h-16 w-16 rounded-2xl border-4 border-accent object-cover shadow-lift" />
              <div>
                <p className="flex items-center gap-2 text-lg font-black text-white">
                  {partner.name}
                  {partner.verified && <BadgeCheck className="h-5 w-5 text-accent" />}
                </p>
                <p className="text-sm font-semibold text-white/70">{partner.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-white/80 sm:ml-auto">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-warning" fill="currentColor" /> {partner.rating} rating</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" /> {partner.clients} clients</span>
              <span className="flex items-center gap-1.5"><Dumbbell className="h-4 w-4 text-accent" /> {partner.programs} programs</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> {partner.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-surface-subtle/40 dark:bg-surface-subtle/60">
        <div className="container-shell grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
          <div className="px-6 py-8 text-center sm:py-10">
            <p className="text-3xl font-black text-content sm:text-4xl">{partner.experience}+</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-content-muted">Years Experience</p>
          </div>
          <div className="px-6 py-8 text-center sm:py-10">
            <p className="text-3xl font-black text-content sm:text-4xl">{partner.clients}+</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-content-muted">Clients Coached</p>
          </div>
          <div className="px-6 py-8 text-center sm:py-10">
            <p className="text-3xl font-black text-accent sm:text-4xl">100%</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-content-muted">Personalized Programs</p>
          </div>
          <div className="px-6 py-8 text-center sm:py-10">
            <p className="text-3xl font-black text-content sm:text-4xl">{partner.rating}★</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-content-muted">Average Rating</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {/* About */}
            <h2 className="text-2xl font-black text-content">Hi, I'm {partner.name.split(' ')[0]}.</h2>
            <p className="mt-4 text-base leading-relaxed text-content-muted">{partner.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {partner.specialties.map((s) => (
                <span key={s} className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-black text-primary dark:text-accent">{s}</span>
              ))}
            </div>

            {/* Transformations */}
            <div className="mt-16">
              <h3 className="text-2xl font-black text-content">My Clients. Their Transformations.</h3>
              <p className="mt-2 text-sm font-semibold text-content-muted">Real results from real people — built on consistency and a plan made just for them.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {transformations.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative h-72 overflow-hidden rounded-3xl border border-border">
                    <img src={t.image} alt={`Transformation · ${t.label}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-black text-primary">Transformation</span>
                    <span className="absolute bottom-3 left-3 text-sm font-black text-white">"{t.label}"</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Everything you'll get */}
            <div className="mt-16">
              <h3 className="text-2xl font-black text-content">Everything You'll Get</h3>
              <p className="mt-2 text-sm font-semibold text-content-muted">Everything you need to succeed.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {FEATURES.map((f, i) => (
                  <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-surface-subtle/60 p-5 transition hover:border-accent/40 dark:bg-surface-subtle">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                      <f.icon className="h-5 w-5 text-accent" />
                    </div>
                    <p className="mt-4 text-sm font-black text-content">{f.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-content-muted">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {courses.length > 0 && (
              <div className="mt-16">
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
                            <span className="text-lg font-black text-content">{c.price === 0 ? 'Free' : `ETB ${c.price.toLocaleString()}`}</span>
                            {c.compareAt && <span className="ml-2 text-xs text-content-faint line-through">ETB {c.compareAt.toLocaleString()}</span>}
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
                        <p className="text-lg font-black text-content">{t.price === 0 ? 'Free' : `ETB ${t.price.toLocaleString()}`}</p>
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
              <p className="mt-2 text-xs leading-relaxed text-content-muted">Get a personalized training and nutrition plan built for your goals, your schedule, and your lifestyle — and guided every step of the way.</p>
              <Button asChild variant="accent" size="md" className="group mt-4 w-full">
                <Link to={`/onboarding?coach=${partner.slug}`}>Start Your Transformation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="md" className="mt-2 w-full">
                <Link to="/contact">Book free call</Link>
              </Button>
              <Button asChild variant="ghost" size="md" className="mt-1 w-full opacity-80">
                <Link to="/programs">View programs</Link>
              </Button>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                <p className="mb-4 text-sm font-black text-content">Other trainers</p>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} to={`/trainers/${r.slug}`} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface-subtle/60">
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

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[#070707]">
          <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
        </div>
        <div className="container-shell relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Start Your Transformation
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
              Ready to take your fitness to the next level?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-white/70">
              Join the clients who've already changed their lives. Your journey starts with one decision.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="lg" className="group shadow-glow">
                <Link to={`/onboarding?coach=${partner.slug}`}>Start Your Transformation <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10">
                <Link to="/programs">Browse programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
