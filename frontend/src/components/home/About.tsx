import { motion } from 'framer-motion'
import { BadgeCheck, Target, Eye, Award, Play } from 'lucide-react'
import { ACHIEVEMENTS } from '@/lib/constants'
import { Reveal } from '@/components/motion'
import { MEDIA } from '@/lib/media'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual */}
        <Reveal dir="right" className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl border-2 border-accent/40" aria-hidden />
            <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-accent/15 blur-[70px]" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <img
                src={MEDIA.coach}
                alt="Coach Nati training a client"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              {/* Play button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
              >
                <button className="group relative grid h-16 w-16 place-items-center rounded-full bg-accent text-primary shadow-glow transition hover:scale-110" aria-label="Watch intro video">
                  <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent/40" />
                  <Play className="relative h-6 w-6 fill-current" />
                </button>
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pb-5">
                <p className="text-lg font-black text-white">Nati Alemayehu</p>
                <p className="text-xs font-semibold text-accent">CSCS · Precision Nutrition L2 · 10+ years</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="glass absolute -right-3 top-8 rounded-2xl border border-border/70 px-5 py-4 shadow-lift sm:-right-8"
            >
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-black text-content">Coach of the Year</p>
                  <p className="text-[11px] font-semibold text-content-muted">National Fitness Awards 2025</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal dir="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-primary dark:text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" />
              About Coach Nati
            </span>
          </Reveal>
          <Reveal dir="left" delay={0.08}>
            <h2 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight text-content sm:text-4xl lg:text-5xl">
              I don't sell workouts.
              <br />
              I engineer <span className="text-gradient-accent">transformations.</span>
            </h2>
          </Reveal>
          <Reveal dir="left" delay={0.16}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-content-muted">
              <p>
                For over a decade I've coached everyone from total beginners to competitive athletes — online and in
                person across 12 countries. My philosophy is simple: sustainable habits, progressive programming and
                accountability that actually holds.
              </p>
              <p>
                No fad diets. No 6-week gimmicks. Just the proven intersection of strength science and real life — so the
                body you build is the one you keep.
              </p>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Reveal dir="up" delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface-subtle/60 p-5 dark:bg-surface-subtle">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-primary dark:text-accent">
                  <Target className="h-5 w-5" />
                </div>
                <p className="font-black text-content">My Mission</p>
                <p className="mt-1 text-sm leading-relaxed text-content-muted">
                  Make elite coaching accessible and build health habits that last a lifetime.
                </p>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.2}>
              <div className="rounded-2xl border border-border bg-surface-subtle/60 p-5 dark:bg-surface-subtle">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-primary dark:text-accent">
                  <Eye className="h-5 w-5" />
                </div>
                <p className="font-black text-content">My Vision</p>
                <p className="mt-1 text-sm leading-relaxed text-content-muted">
                  A world where everyone has a coach who sees them, trains them and believes in them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="container-shell mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} dir="up" delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-border bg-surface-subtle/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5 dark:bg-surface-subtle">
                <div className="mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-accent-dark dark:text-accent" />
                </div>
                <p className="text-sm font-black text-content">{a.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">{a.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
