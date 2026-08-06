import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { FAQS } from '@/lib/constants'
import { SectionHeading } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'General', 'Coaching', 'Billing']

export function FAQSection() {
  const [cat, setCat] = useState('All')
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)

  const list = cat === 'All' ? FAQS : FAQS.filter((f) => f.category === cat)

  return (
    <section id="faq" className="section-padding relative">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={<>Questions? <span className="text-gradient-accent">Answered.</span></>}
              description="Everything you need to know before starting. Still unsure? Message me directly — I reply within the hour."
            />
            <Reveal dir="up">
              <div className="mt-6 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300',
                      cat === c
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-border text-content-muted hover:border-accent/30 hover:bg-surface-subtle',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal dir="up" className="mt-8">
              <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                <p className="text-sm text-content-muted">
                  Can't find your answer?{' '}
                  <Link to="/contact" className="font-semibold text-accent underline-offset-4 hover:underline">
                    Book a free consultation
                  </Link>{' '}
                  and ask me anything.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {list.map((f, i) => (
              <Reveal key={f.id} dir="up" delay={i * 0.05}>
                <div className={cn('overflow-hidden rounded-2xl border transition-all duration-300', openId === f.id ? 'border-accent/30 bg-accent/5' : 'border-border bg-surface-card')}>
                  <button
                    onClick={() => setOpenId(openId === f.id ? null : f.id)}
                    aria-expanded={openId === f.id}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-black text-content sm:text-base">{f.question}</span>
                    <motion.span
                      animate={{ rotate: openId === f.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-content-muted"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openId === f.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-content-muted">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
