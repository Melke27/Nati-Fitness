import { Button } from '@/components/ui'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface Props {
  step: number
  isLast: boolean
  canContinue: boolean
  onBack: () => void
  onContinue: () => void
  loading?: boolean
}

export function QuestionnaireNavigation({ step, isLast, canContinue, onBack, onContinue, loading }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="ghost"
        size="lg"
        onClick={onBack}
        disabled={step === 0 || loading}
        aria-label="Go back to the previous question"
        className="opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <Button
        variant="accent"
        size="lg"
        onClick={onContinue}
        disabled={!canContinue || loading}
        className="group"
      >
        {loading ? (
          'Analyzing…'
        ) : isLast ? (
          <>
            Get My Plan
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </div>
  )
}