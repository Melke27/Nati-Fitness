import { motion } from 'framer-motion'
import { STATS, TRUST_LOGOS } from '@/lib/constants'
import { Counter } from '@/components/ui'

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface-subtle py-16 lg:py-20">
      <div className="container-shell">
        <p className="mb-8 text-center text-caption font-semibold uppercase tracking-[0.2em] text-content-faint">
          Trusted by 1,000+ athletes, professionals and beginners worldwide
        </p>

        <div className="relative mb-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-xl font-black tracking-tight text-content/25 transition hover:text-content/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span className="text-4xl font-black tracking-tight text-content sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-sm font-semibold text-content-muted">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
