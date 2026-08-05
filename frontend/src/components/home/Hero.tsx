import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ArrowRight, Play, Flame, HeartPulse, Timer, ShieldCheck, TrendingUp, Dumbbell, Trophy, Activity } from 'lucide-react'
import { Rings } from '@/components/visuals'
import { Button } from '@/components/ui'
import { MEDIA } from '@/lib/media'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="grid-pattern absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-10%] h-[480px] w-[480px] rounded-full bg-accent/15 blur-[140px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold text-primary dark:text-accent">
              <span className="flex items-center gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              5.0 Rated Coach · 500+ Transformations
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-5xl font-black leading-[1.02] tracking-tight text-content sm:text-6xl lg:text-7xl"
          >
            Transform your <span className="text-gradient-accent">body.</span>
            <br />
            Transform your <span className="relative inline-block">
              life.
              <svg className="absolute -bottom-2 left-0 w-full text-accent" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9 C 30 3, 90 3, 118 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-content-muted sm:text-lg">
            Elite 1:1 personal training, science-backed nutrition and relentless accountability — engineered around
            <span className="font-bold text-content"> your body, your schedule, your life.</span> No guesswork. No shortcuts. Just results.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/programs">
              <Button variant="accent" size="lg" className="group">
                Start Training
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
            <Link to="/#pricing">
              <Button variant="outline" size="lg" className="group">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-primary transition-colors group-hover:bg-accent dark:text-accent dark:group-hover:text-primary">
                  <Play className="h-3.5 w-3.5" fill="currentColor" />
                </span>
                Book Free Consultation
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              { icon: ShieldCheck, text: 'Money-back guarantee' },
              { icon: TrendingUp, text: 'Results in 12 weeks' },
              { icon: Timer, text: 'Train in 30–60 min' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm font-semibold text-content-muted">
                <b.icon className="h-4 w-4 text-accent-dark dark:text-accent" />
                {b.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — coach visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <Rings className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 opacity-70" />
          <div className="relative mx-auto aspect-[4/5] w-[86%] overflow-hidden rounded-[32px] border border-border shadow-lift">
            <motion.img
              src={MEDIA.coach}
              alt="Coach Nati — elite personal trainer"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Transformation score chip */}
            <motion.div
              className="absolute right-4 top-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <span className="flex items-center gap-2 rounded-full bg-primary/85 px-3.5 py-2 text-[11px] font-black text-white backdrop-blur">
                <Trophy className="h-3.5 w-3.5 text-accent" fill="currentColor" /> Score 98
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="rounded-full bg-accent px-4 py-1 text-[11px] font-black uppercase tracking-widest text-primary">
                Coach Nati
              </span>
              <span className="text-xs font-semibold text-white/85">CSCS · PN-L2 · 10 yrs</span>
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <FloatingCard className="left-0 top-14 sm:-left-4" delay={0.6} duration={6}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-black leading-none text-content">−12 kg</p>
                <p className="mt-1 text-[11px] font-semibold text-content-muted">Client progress</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="right-0 top-[34%] sm:-right-4" delay={1} duration={7}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-black leading-none text-content">540 kcal</p>
                <p className="mt-1 text-[11px] font-semibold text-content-muted">Calories burned</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-28 left-[4%]" delay={1.4} duration={8}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-primary dark:text-accent">
                <Dumbbell className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-black leading-none text-content">24 / 28</p>
                <p className="mt-1 text-[11px] font-semibold text-content-muted">Workouts completed</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="right-[4%] bottom-8" delay={1.8} duration={6.5}>
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-error/10 text-error">
                <span className="absolute inset-0 animate-ping-slow rounded-xl bg-error/25" />
                <span className="relative grid h-5 w-5 place-items-center"><HeartPulse className="h-5 w-5" /></span>
              </span>
              <div>
                <p className="text-lg font-black leading-none text-content">142</p>
                <p className="mt-1 text-[11px] font-semibold text-content-muted">bpm · heart rate</p>
              </div>
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  )
}

function FloatingCard({
  children,
  className,
  delay,
  duration,
}: {
  children: React.ReactNode
  className?: string
  delay: number
  duration: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${className ?? ''}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="glass rounded-2xl border border-border/70 px-4 py-3 shadow-lift"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
