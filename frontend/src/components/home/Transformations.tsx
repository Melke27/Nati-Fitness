import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal, Quote, TrendingUp, Scale, Dumbbell } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { SectionHeading, Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { cn } from '@/lib/utils'
import { MEDIA } from '@/lib/media'

const PAIRS = [
  { before: MEDIA.stretching, after: MEDIA.womanFit },
  { before: MEDIA.gym, after: MEDIA.deadlift },
  { before: MEDIA.outdoor, after: MEDIA.trainer },
  { before: MEDIA.runWoman, after: MEDIA.womanFit2 },
]

export function Transformations() {
  return (
    <section id="transformations" className="section-padding relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-shell relative">
        <SectionHeading
          dark
          eyebrow="Transformations"
          title={<>Real people. Real bodies. <span className="text-gradient-accent">Real proof.</span></>}
          description="Drag the slider to see what happens when coaching, nutrition and accountability come together."
        />

        <div className="mx-auto max-w-5xl">
          <BeforeAfterSlider />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Scale, label: 'Avg. weight lost', value: '12.4 kg' },
            { icon: Dumbbell, label: 'Avg. muscle gained', value: '4.8 kg' },
            { icon: TrendingUp, label: 'Avg. strength improved', value: '+45%' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-surface-card p-6 text-center"
            >
              <s.icon className="mx-auto mb-3 h-6 w-6 text-accent" />
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onMove = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(94, Math.max(6, pct)))
  }

  const t = TESTIMONIALS[active]
  const pair = PAIRS[active % PAIRS.length]

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
      {/* Slider */}
      <Reveal dir="right">
        <div
          ref={ref}
          className="relative mx-auto aspect-[4/5] max-w-sm select-none overflow-hidden rounded-3xl border border-white/10"
          onPointerDown={(e) => {
            ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
            onMove(e.clientX)
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) onMove(e.clientX)
          }}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(6, p - 4))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(94, p + 4))
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2c2c2c]" />
          <div className="absolute inset-x-0 top-0 grid grid-cols-2">
            <span className="bg-gradient-to-r from-black/60 to-black/0 px-4 py-3 text-xs font-black uppercase tracking-widest text-white/90">
              Before · {t.before}
            </span>
          </div>
          <div className="absolute inset-x-0 top-0 grid grid-cols-2 text-right">
            <span />
            <span className="bg-gradient-to-l from-black/60 to-black/0 px-4 py-3 text-xs font-black uppercase tracking-widest text-accent">
              After · {t.after}
            </span>
          </div>

          {/* After layer (right) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img src={pair.after} alt="After" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Before layer (left) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={pair.before} alt="Before" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Handle */}
          <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-accent shadow-[0_0_20px_rgba(225,29,72,0.8)]" />
            <button
              aria-label="Drag to compare"
              className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-primary text-accent shadow-glow"
            >
              <MoveHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stories */}
      <div>
        <Reveal dir="left">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((x, i) => (
              <button
                key={x.id}
                onClick={() => setActive(i)}
                aria-label={`Show ${x.name} story`}
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  i === active ? 'w-10 bg-accent' : 'w-2 bg-white/25 hover:bg-white/50',
                )}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-6">
          <Stagger amount={0.3}>
            <StaggerItem>
              <Quote className="h-8 w-8 text-accent" />
              <p className="mt-4 text-2xl font-black leading-snug text-white sm:text-[26px]">
                “{t.quote}”
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-cta-gradient text-lg font-black text-primary">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div>
                  <p className="font-black text-white">{t.name}</p>
                  <p className="text-sm text-white/60">{t.role}</p>
                </div>
                <Badge className="ml-auto border-accent/30 bg-accent/10 text-accent">{t.result}</Badge>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-white/60">
                <span className="rounded-full border border-white/15 px-4 py-2">{t.program}</span>
                <span className="rounded-full border border-white/15 px-4 py-2">{t.months} months</span>
                <span className="rounded-full border border-white/15 px-4 py-2">100% coach-led</span>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </div>
  )
}
