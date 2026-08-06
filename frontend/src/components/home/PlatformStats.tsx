import { motion } from 'framer-motion'
import { PLATFORM_STATS } from '@/lib/constants'
import { Counter } from '@/components/ui'

export function PlatformStats() {
  return (
    <section className="border-y border-border bg-surface-subtle py-16 lg:py-20">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PLATFORM_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-content-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
