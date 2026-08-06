import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { SectionHeading, Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { cn } from '@/lib/utils'

type Cycle = 'monthly' | 'quarterly' | 'yearly'

const CYCLE_LABEL: Record<Cycle, { label: string; months: number; save: string }> = {
  monthly: { label: 'Monthly', months: 1, save: 'Save 0%' },
  quarterly: { label: 'Quarterly', months: 3, save: 'Save 10%' },
  yearly: { label: 'Yearly', months: 12, save: 'Save 17%' },
}

export function PricingSection({ compact = false }: { compact?: boolean }) {
  const [cycle, setCycle] = useState<Cycle>('quarterly')

  const priceFor = (p: { monthly: number; quarterly: number; yearly: number }) => p[cycle]
  const totalFor = (p: { monthly: number; quarterly: number; yearly: number }) => {
    const m = CYCLE_LABEL[cycle].months
    return priceFor(p) * m
  }

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Simple, honest <span className="text-gradient-accent">pricing</span></>}
          description="Every plan is backed by a 14-day money-back guarantee. Upgrade, downgrade or cancel anytime."
        />

        {/* Cycle toggle */}
        <Reveal className="mb-12 flex justify-center">
          <div className="glass inline-flex items-center gap-1 rounded-full border border-border p-1.5 shadow-card">
            {(['monthly', 'quarterly', 'yearly'] as Cycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors',
                  cycle === c ? 'text-primary' : 'text-content-muted hover:text-content',
                )}
                aria-pressed={cycle === c}
              >
                {cycle === c && (
                  <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{c === 'yearly' ? 'Yearly' : c === 'quarterly' ? 'Quarterly' : 'Monthly'}</span>
                {c === 'yearly' && <span className="relative ml-1.5 text-[10px] font-black text-success">-17%</span>}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger className={cn('grid gap-6', compact ? 'md:grid-cols-3' : 'lg:grid-cols-3')}>
          {PLANS.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1',
                  plan.popular
                    ? 'border-accent/40 bg-surface-card text-white shadow-glow'
                    : 'border-border bg-surface-card hover:border-accent/30 hover:shadow-card-hover',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-cta-gradient px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-primary shadow-glow">
                    <Sparkles className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}

                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className={cn('mt-1 text-sm font-medium', plan.popular ? 'text-white/60' : 'text-content-muted')}>
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <motion.span
                    key={cycle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black tracking-tight"
                  >
                    {formatCurrency(priceFor(plan))}
                  </motion.span>
                  <span className={cn('pb-1.5 text-sm font-semibold', plan.popular ? 'text-white/60' : 'text-content-muted')}>
                    /mo
                  </span>
                </div>
                <p className={cn('mt-1.5 text-xs font-semibold', plan.popular ? 'text-white/50' : 'text-content-faint')}>
                  {formatCurrency(totalFor(plan))} billed {CYCLE_LABEL[cycle].label.toLowerCase()} · {CYCLE_LABEL[cycle].save}
                </p>

                <div className="my-6 h-px w-full bg-border" />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', plan.popular ? 'bg-accent/20 text-accent' : 'bg-success/15 text-success')}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={plan.popular ? 'text-white/85' : 'text-content'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/checkout?plan=${plan.id}&cycle=${cycle}`}
                  className={cn(
                    'group mt-8 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-black transition-all duration-300 hover:-translate-y-0.5',
                    plan.popular
                      ? 'bg-cta-gradient text-primary shadow-glow'
                      : 'border border-border text-content hover:border-accent hover:bg-accent/10',
                  )}
                >
                  Choose {plan.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {!compact && (
          <Reveal dir="up" className="mt-14">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface-card">
              <div className="overflow-x-auto">
                <table className="table-premium min-w-[640px]">
                  <thead>
                    <tr>
                      <th>What's included</th>
                      <th>Starter</th>
                      <th className="text-accent">Pro</th>
                      <th>Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Personalized workout plan', false, true, true],
                      ['Custom meal plan & macros', false, true, true],
                      ['Access to coaching dashboard', false, true, true],
                      ['Weekly video check-ins', false, true, true],
                      ['Live 1:1 calls', false, false, true],
                      ['24/7 priority messaging', false, false, true],
                      ['In-person sessions', false, false, true],
                    ].map((row) => (
                      <tr key={row[0] as string}>
                        <td className="font-semibold text-content">{row[0]}</td>
                        {[1, 2, 3].map((i) => (
                          <td key={i}>
                            {row[i] ? (
                              <Check className="h-4 w-4 text-success" strokeWidth={3} />
                            ) : (
                              <span className="text-content-faint">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Badge variant="success">14-day money-back guarantee</Badge>
              <Badge>Cancel anytime</Badge>
              <Badge variant="accent">Secure payment</Badge>
              <Badge variant="accent">Get 10% off with code WELCOME10</Badge>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
