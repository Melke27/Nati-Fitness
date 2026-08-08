import { motion } from 'framer-motion'

interface Props {
  step: number
  total: number
}

export function ProgressIndicator({ step, total }: Props) {
  const percent = Math.round((step / total) * 100)
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
        <span className="text-content-muted">
          Step {step} <span className="text-content-faint">of {total}</span>
        </span>
        <span className="text-accent">{percent}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-subtle"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${step} of ${total}`}
      >
        <motion.div
          className="h-full rounded-full bg-cta-gradient"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}