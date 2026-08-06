import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { MEDIA } from '@/lib/media'

const SLIDES = [
  { word1: 'BUILD', word2: 'YOUR', word3: 'MUSCLE', image: MEDIA.hero, alt: 'Trainer building muscle' },
  { word1: 'GROW', word2: 'YOUR', word3: 'POWER', image: MEDIA.gymDark, alt: 'Trainer lifting in a dark gym' },
  { word1: 'FORGE', word2: 'YOUR', word3: 'POWER', image: MEDIA.barbell, alt: 'Trainer loading a barbell' },
]

const STATS = [
  { value: '10+', label: 'Expert Trainers' },
  { value: '500+', label: 'Active Members' },
  { value: '50+', label: 'Programs' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const next = () => setIndex((i) => (i + 1) % SLIDES.length)
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#070707]">
      {/* Base texture + glows */}
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[160px]" />

      <div className="container-shell relative z-10 w-full py-24 lg:py-32">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — headline */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:max-w-3xl">
            <motion.div variants={stagger} initial="hidden" animate="show">
              {/* Since badge */}
              <motion.div variants={rise} className="mb-8 flex items-center gap-3">
                <span className="h-px w-12 bg-accent" />
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Since — 2016</span>
              </motion.div>

              {/* Sliding giant headline */}
              <AnimatePresence mode="wait">
                <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.6)] sm:text-7xl xl:text-8xl"
                  >
                    <span className="block">{slide.word1}</span>
                    <span className="block">
                      {slide.word2}
                      <span className="mx-3 inline-block h-[0.28em] w-[0.28em] rounded-full bg-accent align-middle" />
                    </span>
                    <span className="block text-gradient-accent">{slide.word3}</span>
                  </motion.h1>
                </AnimatePresence>

              <motion.p
                variants={rise}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-content-muted sm:text-xl"
              >
                Transform your body. Build your muscle, build your strength. Start your journey now.
              </motion.p>

              <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/programs">
                  <Button variant="accent" size="xl" className="group items-center gap-3 uppercase tracking-wide shadow-glow">
                    Explore Programs
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="items-center gap-3 border-white/20 bg-white/5 px-10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md hover:border-accent hover:bg-accent/10 hover:text-white">
                    Become a Trainer
                    <ArrowUpRight className="h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-4"
              >
                {STATS.map((s) => (
                  <div key={s.label} className="glass rounded-2xl border border-white/10 px-4 py-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <p className="text-2xl font-bold tracking-tight text-white [text-shadow:0_2px_14px_rgba(225,29,72,0.5)] sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-content-muted">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — trainer image */}
          <div className="lg:col-span-5 lg:self-stretch">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c10] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] sm:h-[520px] lg:h-full lg:min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={slide.image}
                  alt={slide.alt}
                  loading="eager"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Slide counter + arrows */}
              <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
                <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:border-accent hover:bg-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-glow transition hover:bg-accent-dark"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}