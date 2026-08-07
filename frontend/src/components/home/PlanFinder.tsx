import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Flame, Dumbbell, HeartPulse, Zap, Sparkles, Home as HomeIcon, Weight, Clock, MapPin, Check } from 'lucide-react'
import { getSession } from '@/lib/store'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

const QUESTIONS = [
  {
    key: 'goal',
    title: 'What is your primary goal?',
    hint: 'This helps us tailor the program to your objectives',
    options: [
      { id: 'Weight Loss', label: 'Weight Loss / Fat Loss', desc: 'Burn fat while maintaining muscle', icon: Flame },
      { id: 'Muscle Gain', label: 'Adding Mass', desc: 'Build muscle and gain size', icon: Dumbbell },
      { id: 'Overall Fitness', label: 'Overall Fitness', desc: 'Feel great, move better, stay active', icon: HeartPulse },
      { id: 'Strength Training', label: 'Get Stronger', desc: 'Boost strength and athletic performance', icon: Zap },
    ],
  },
  {
    key: 'days',
    title: 'How many days a week can you train?',
    hint: 'Pick what you can realistically commit to',
    options: [
      { id: '2', label: '1–2 days', desc: 'Busy schedule, minimal time', icon: Clock },
      { id: '3', label: '3 days', desc: 'Balanced & consistent', icon: Clock },
      { id: '4', label: '4–5 days', desc: 'High commitment, fast results', icon: Clock },
      { id: '6', label: '6+ days', desc: 'Training is a lifestyle', icon: Clock },
    ],
  },
  {
    key: 'setting',
    title: 'Where will you train?',
    hint: 'We match your program to your equipment',
    options: [
      { id: 'No equipment', label: 'At home', desc: 'No equipment — bodyweight only', icon: HomeIcon },
      { id: 'Dumbbells', label: 'Dumbbells', desc: 'Home or gym with free weights', icon: Weight },
      { id: 'Full gym', label: 'Full gym', desc: 'Access to machines & barbells', icon: MapPin },
      { id: 'Classes', label: 'Group classes', desc: 'Prefer coached group sessions', icon: Sparkles },
    ],
  },
]

export function PlanFinder() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const current = QUESTIONS[step]
  const selected = answers[current.key]
  const done = step === QUESTIONS.length - 1

  const pick = (id: string) => {
    const next = { ...answers, [current.key]: id }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 220)
    } else {
      const params = new URLSearchParams({ goal: next.goal ?? 'Overall Fitness' })
      const target = getSession() ? '/onboarding' : '/register'
      navigate(`${target}?${params.toString()}`)
    }
  }

  return (
    <section id="plan-finder" className="section-padding relative overflow-hidden bg-surface-subtle">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Free Assessment"
          title={<>Find your <span className="text-gradient-accent">perfect plan</span></>}
          description="Answer 3 quick questions to get started — it takes under 30 seconds and your plan is matched instantly."
        />

        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface-card shadow-lift">
          {/* Progress header */}
          <div className="flex items-center gap-4 border-b border-border px-6 py-5 sm:px-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-content-muted">
                Step {step + 1} of {QUESTIONS.length}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={false}
                  animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border text-content-muted transition hover:border-accent hover:text-accent"
                aria-label="Previous question"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-2xl font-black tracking-tight text-content sm:text-3xl">{current.title}</h3>
                <p className="mt-2 text-sm font-semibold text-content-muted">{current.hint}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {current.options.map((o) => {
                    const Icon = o.icon
                    const active = selected === o.id
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => pick(o.id)}
                        className={cn(
                          'group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200',
                          active
                            ? 'border-accent bg-accent/10 shadow-glow'
                            : 'border-border bg-surface-subtle/40 hover:border-accent/40 hover:bg-surface-subtle',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors',
                            active ? 'bg-accent text-white' : 'bg-surface-card text-content-muted group-hover:text-accent',
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-black text-content">{o.label}</span>
                          <span className="block text-xs text-content-muted">{o.desc}</span>
                        </span>
                        {active && (
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold text-content-faint">
              {done ? 'Almost there — let’s build your plan' : `${QUESTIONS.length - step - 1} question${QUESTIONS.length - step - 1 === 1 ? '' : 's'} remaining`}
            </p>
            {selected && step === QUESTIONS.length - 1 ? (
              <button
                onClick={() => pick(selected)}
                className="group flex items-center gap-2 rounded-full bg-cta-gradient px-6 py-3 text-sm font-black text-primary shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                Get my plan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <span className="text-xs font-bold text-content-faint">Free · No card required</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
