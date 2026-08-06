import { motion } from 'framer-motion'
import { BadgeCheck, Award } from 'lucide-react'
import { MEDIA } from '@/lib/media'
import { Reveal } from '@/components/motion'

const CREDENTIALS = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Clients Coached' },
  { value: '12', label: 'Countries' },
  { value: '100%', label: 'Personalized' },
]

export function AboutCoach() {
  return (
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
                  src={MEDIA.hero}
                  alt="Coach Nati, head coach and transformation specialist"
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
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-black text-content">Coach of the Year</p>
                  <p className="text-[11px] font-semibold text-content-muted">National Fitness Awards 2025</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal dir="left">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-primary dark:text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" />
                About the Coach
              </span>
            </Reveal>

            <Reveal dir="left" delay={0.08}>
              <h2 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-content sm:text-4xl lg:text-5xl">
                Hi, I'm Coach Nati.
              </h2>
              {/* Accent underline bar */}
              <span className="mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-accent to-accent-dark" aria-hidden />
            </Reveal>

            <Reveal dir="left" delay={0.16}>
              <div className="mt-7 space-y-5 text-base leading-[1.75] text-content-muted">
                <p>
                  I'm a dedicated fitness coach with over 10 years of experience helping people transform their bodies,
                  build muscle, lose fat, and take control of their health. As the head coach and transformation
                  specialist behind Coach Nati, I've worked with clients from every fitness level — from total beginners
                  to elite athletes — both online and in person across 12 countries.
                </p>
                <p>
                  My coaching combines science-based training, personalized programming, and proven nutrition strategies
                  so you can build strength, lose weight, and perform at your best — sustainably. No fad diets, no
                  gimmicks. Just the intersection of strength science and real life, so the body you build is the one
                  you keep.
                </p>
                <p>
                  My goal is simple: make fitness sustainable, enjoyable, and results-driven so you can achieve lasting
                  progress with confidence. Let's take your fitness to the next level.
                </p>
              </div>
            </Reveal>

            <Reveal dir="up" delay={0.28}>
              <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {CREDENTIALS.map((c) => (
                  <div key={c.label} className="rounded-2xl border border-border bg-surface-card px-4 py-5 text-center">
                    <p className="text-2xl font-black text-content">{c.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-content-muted">{c.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal dir="up" delay={0.36}>
              <p className="mt-8 flex items-center gap-2 text-sm font-bold text-content">
                <BadgeCheck className="h-5 w-5 text-accent" />
                CSCS · Precision Nutrition L2 · Certified Transformation Specialist
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}