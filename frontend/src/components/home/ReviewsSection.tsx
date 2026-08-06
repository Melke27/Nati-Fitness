import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { SectionHeading, Badge } from '@/components/ui'
import { AVATAR } from '@/lib/media'

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding relative overflow-hidden bg-surface">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Reviews"
          title={<>From <span className="text-gradient-accent">you</span></>}
          description="Real words from real people who committed to the process."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface-card p-8"
            >
              <Quote className="h-8 w-8 text-accent" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-content-muted">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <img src={AVATAR(t.name)} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/30" />
                <div>
                  <p className="font-bold text-content">{t.name}</p>
                  <p className="text-caption text-content-faint">{t.role}</p>
                </div>
                <Badge variant="accent" className="ml-auto">{t.result}</Badge>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
