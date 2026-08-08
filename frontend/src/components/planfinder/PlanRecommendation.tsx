import { PlanRecommendationCard } from './PlanRecommendationCard'
import type { RecommendedPlan } from '@/lib/recommendation'
import type { QuizState } from '@/lib/planFinderData'
import { QUESTIONS } from '@/lib/planFinderData'

interface Props {
  plan: RecommendedPlan
  answers: QuizState
  onGetStarted: () => void
  onChangeAnswers: () => void
}

export function PlanRecommendation({ plan, answers, onGetStarted, onChangeAnswers }: Props) {
  const label = (key: 'goal' | 'gender' | 'experience', id: string) =>
    QUESTIONS.find((q) => q.key === key)?.options.find((o) => o.id === id)?.label ?? id

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">Your recommendation</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-content">YOUR PERFECT PLAN</h2>
        <p className="mt-1 text-sm text-content-muted">Based on your goals and experience, we recommend the plan below.</p>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] font-bold">
        <span className="rounded-full bg-surface-subtle px-3 py-1 text-content-muted">Goal: {label('goal', answers.goal)}</span>
        <span className="rounded-full bg-surface-subtle px-3 py-1 text-content-muted">Experience: {label('experience', answers.experience)}</span>
      </div>

      <PlanRecommendationCard plan={plan} onGetStarted={onGetStarted} onChangeAnswers={onChangeAnswers} />

      <p className="text-center text-xs font-semibold text-content-faint">
        This is a recommendation — you choose your plan and enroll before anything starts.
      </p>
    </div>
  )
}