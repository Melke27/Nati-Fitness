import { BadgeCheck, Clock, Tag } from 'lucide-react'
import type { RecommendedPlan } from '@/lib/recommendation'
import { Button } from '@/components/ui'

interface Props {
  plan: RecommendedPlan
  onGetStarted: () => void
  onChangeAnswers: () => void
}

export function PlanRecommendationCard({ plan, onGetStarted, onChangeAnswers }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface-card shadow-lift">
      <div className="border-b border-border bg-gradient-to-br from-accent/15 via-accent/5 to-transparent px-6 py-6 text-center sm:px-8">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">Your perfect plan</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-content sm:text-3xl">{plan.name}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-content-muted">{plan.tagline}</p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-accent">
            <Clock className="h-3.5 w-3.5" /> {plan.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-success">
            <Tag className="h-3.5 w-3.5" /> {plan.priceLabel}
          </span>
        </div>

        <h4 className="mt-6 text-xs font-black uppercase tracking-widest text-content-muted">Best for</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-content">{plan.bestFor}</p>

        <h4 className="mt-6 text-xs font-black uppercase tracking-widest text-content-muted">What's included</h4>
        <ul className="mt-3 space-y-2.5">
          {plan.includes.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-content">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-7 space-y-3">
          <Button variant="accent" size="lg" className="w-full" onClick={onGetStarted}>
            GET STARTED
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={onChangeAnswers}>
            ← CHANGE ANSWERS
          </Button>
        </div>
      </div>
    </div>
  )
}