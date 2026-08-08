import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, CalendarCheck, Dumbbell, MessagesSquare, MonitorPlay, Sparkles, Star, UtensilsCrossed, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDB } from '@/lib/store'
import { TESTIMONIALS } from '@/lib/constants'
import { PageHero } from '@/components/PageHero'
import { Button, SectionHeading } from '@/components/ui'
import { DynamicIcon } from '@/lib/icons'
import { MEDIA, AVATAR } from '@/lib/media'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

const COACH_STATS: { value: string; label: string; suffix?: string }[] = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Clients Coached' },
  { value: '100%', label: 'Personalized Programs' },
  { value: '4.9', label: 'Average Rating', suffix: '★' },
]

const INCLUSIONS = [
  { icon: Dumbbell, title: 'Personalized Training Program', desc: 'Every workout is built around your body, your schedule, and your goals — nothing generic.' },
  { icon: UtensilsCrossed, title: 'Personalized Meal Plan', desc: 'Simple, realistic meals you can actually enjoy while still making steady progress.' },
  { icon: Video, title: 'Exercise Video Library', desc: 'Clear video demos for every exercise so you always know exactly what to do.' },
  { icon: CalendarCheck, title: 'Weekly Progress Reviews', desc: 'I track your progress every week and adjust the plan the moment it\'s needed.' },
  { icon: MessagesSquare, title: 'Direct Coach Support', desc: 'Message me anytime. I\'ll be there to answer questions and keep you on track.' },
  { icon: MonitorPlay, title: 'Personal Coaching Dashboard', desc: 'Your workouts, meals, and progress — all in one place, on any device.' },
]

export default function Services() {
  const db = useDB()

  return (
    <>
      <PageHero crumb="Services" eyebrow="Online Coaching" title={<>Level up your <span className="text-gradient-accent">fitness</span>.</>} description="I'll create a training and nutrition plan built for your goals, your schedule, and your lifestyle — and guide you every step of the way." />

      {/* Coach intro */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" aria-hidden />
        <div className="container-shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Portrait */}
            <Reveal dir="right">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl border-2 border-accent/40" aria-hidden />
                <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-accent/15 blur-[70px]" aria-hidden />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)]">
                  <img
                    src={MEDIA.coach}
                    alt="Coach Nati, online fitness coach"
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl border border-border/70 px-5 py-4 shadow-lift sm:-right-8"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary shadow-glow">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-content">CSCS Certified</p>
                    <p className="text-[11px] font-semibold text-content-muted">Precision Nutrition L2</p>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* Copy */}
            <div>
              <Reveal dir="left">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-primary dark:text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" />
                  Meet your coach
                </span>
              </Reveal>

              <Reveal dir="left" delay={0.08}>
                <h2 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-content sm:text-4xl lg:text-5xl">
                  Hi, I'm Coach Nati.
                </h2>
                <span className="mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-accent to-accent-dark" aria-hidden />
              </Reveal>

              <Reveal dir="left" delay={0.16}>
                <div className="mt-7 space-y-5 text-base leading-[1.75] text-content-muted">
                  <p>
                    My journey into fitness started with a simple passion for self-improvement — but it grew into a
                    career that has taken me to competition stages around the world. Through 10+ years of coaching
                    everyone from complete beginners to elite athletes, I've learned one thing for sure: the path to a
                    powerful, aesthetic physique is the same for all of us — consistency and science.
                  </p>
                  <p>
                    I build training and nutrition plans around your body, your schedule, and your lifestyle — then I
                    guide you every step of the way. No fad diets, no generic templates. Just the intersection of
                    strength science and real life, so the body you build is the one you keep.
                  </p>
                </div>
              </Reveal>

              <Reveal dir="up" delay={0.28}>
                <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {COACH_STATS.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border bg-surface-card px-4 py-5 text-center">
                      <p className="text-2xl font-black text-content">{s.value}{s.suffix ?? ''}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-content-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal dir="up" delay={0.36}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button asChild variant="accent" size="lg" className="group">
                    <Link to="/register">Start Your Transformation <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Book Free Consultation</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Everything you need to succeed */}
      <section className="border-t border-border bg-surface-subtle/40 py-16 lg:py-24 dark:bg-transparent">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Everything You'll Get"
            title="Everything You Need to Succeed"
            description="One complete coaching system — built for real life, backed by real science."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSIONS.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary dark:text-accent dark:group-hover:text-primary">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black text-content">{f.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Ways to work with me */}
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Services"
            title={<>Ways to <span className="text-gradient-accent">work with me</span></>}
            description="From 1:1 personal training to fully remote coaching — choose how you want to be coached."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {db.services.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group flex h-full flex-col rounded-2xl border border-border bg-surface-subtle/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary dark:text-accent dark:group-hover:text-primary">
                  <DynamicIcon name={s.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-content">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">{s.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-content-muted">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                        <Sparkles className="h-2.5 w-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="md" className="mt-7 w-full group/btn">
                  <Link to="/contact">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What clients say about Coach Nati */}
      <section className="section-padding relative overflow-hidden border-t border-border bg-surface-subtle/40 pt-16 lg:pt-24 dark:bg-transparent">
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
        <div className="container-shell relative">
          <SectionHeading
            eyebrow="Testimonials"
            title={<>What clients say about <span className="text-gradient-accent">Coach Nati</span></>}
            description="Real words from real people who trusted the process and got results."
          />

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <motion.figure className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1 text-warning">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:text-accent">{t.result}</span>
                  </div>

                  <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-content-soft">
                    “{t.quote}”
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="relative">
                      <img src={AVATAR(t.name)} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/40" />
                      <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-success text-white">
                        <BadgeCheck className="h-2.5 w-2.5" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-content">{t.name}</p>
                      <p className="truncate text-[11px] font-semibold text-content-muted">{t.role} · {t.program}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding pt-0">
        <div className="container-shell">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface-card px-8 py-16 text-center text-white sm:px-16 lg:py-24"
          >
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />

            <div className="relative mx-auto max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-accent"
              >
                <Sparkles className="h-3.5 w-3.5" /> Limited availability
              </motion.span>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Ready to start your
                <br />
                <span className="text-gradient-accent">transformation?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Join the clients who've already changed their lives. Your journey starts with one decision — and only a
                few coaching spots open this month.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group flex items-center gap-2 rounded-full bg-cta-gradient px-8 py-4 text-base font-black text-primary shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  Start Your Transformation
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-white/25 px-8 py-4 text-base font-black text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  Book Consultation
                </Link>
              </div>

              <p className="mt-6 text-xs font-semibold text-white/40">
                14-day money-back guarantee · Cancel anytime · Trusted by 500+ clients
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
