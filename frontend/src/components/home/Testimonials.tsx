import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { SectionHeading, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import { AVATAR } from '@/lib/media'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section id="testimonials" className="relative overflow-hidden bg-surface-subtle/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Loved by <span className="text-gradient-accent">500+ clients</span></>}
          description="Real words from real people who committed to the process."
        />

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-subtle/70 shadow-card dark:bg-surface-subtle">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-12"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-warning">
                    {Array.from({ length: TESTIMONIALS[index].rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <Badge variant="accent">{TESTIMONIALS[index].result}</Badge>
                </div>

                <Quote className="mt-6 h-10 w-10 text-accent-dark dark:text-accent" />

                <blockquote className="mt-4 text-xl font-bold leading-relaxed text-content sm:text-2xl">
                  “{TESTIMONIALS[index].quote}”
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="relative">
                    <img src={AVATAR(TESTIMONIALS[index].name)} alt={TESTIMONIALS[index].name} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/40" />
                    <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-success text-white"><BadgeCheck className="h-3 w-3" /></span>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 font-black text-content">
                      {TESTIMONIALS[index].name}
                    </p>
                    <p className="text-sm text-content-muted">
                      {TESTIMONIALS[index].role} · {TESTIMONIALS[index].program} · {TESTIMONIALS[index].months} months
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-500',
                    i === index ? 'w-10 bg-accent-dark dark:bg-accent' : 'w-2 bg-border hover:bg-content/30',
                  )}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-content-muted transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-content"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-content-muted transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-content"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
