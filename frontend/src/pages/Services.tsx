import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDB } from '@/lib/store'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui'
import { DynamicIcon } from '@/lib/icons'

export default function Services() {
  const db = useDB()

  return (
    <>
      <PageHero crumb="Services" eyebrow="Services" title={<>Everything you need, <span className="text-gradient-accent">nothing you don't</span></>} description="From 1:1 personal training to fully remote coaching — choose how you want to be coached." />

      <section className="py-16 lg:py-24">
        <div className="container-shell">
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
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
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

      <section className="border-t border-border bg-surface-subtle/40 py-16 lg:py-24">
        <div className="container-shell">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-content sm:text-4xl">Not sure what's right for you?</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-content-muted">Book a free 15-minute call. We will discuss your goals, answer your questions, and recommend the best path forward — no pressure.</p>
              <Button asChild variant="accent" size="lg" className="mt-8 group">
                <Link to="/contact">Book free consultation <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Clients transformed' },
                { value: '98%', label: 'Satisfaction rate' },
                { value: '10+', label: 'Years experience' },
                { value: '1', label: 'Coach guiding everything' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-surface-subtle/60 p-6 text-center dark:bg-surface-subtle">
                  <p className="text-3xl font-black text-content">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold text-content-muted">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
