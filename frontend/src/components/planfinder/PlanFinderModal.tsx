import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Loader2 } from 'lucide-react'
import { QUESTIONS, EMPTY_ANSWERS, type AnswerKey, type QuizState } from '@/lib/planFinderData'
import { recommendPlan, type RecommendedPlan } from '@/lib/recommendation'
import { track } from '@/lib/analytics'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ProgressIndicator } from './ProgressIndicator'
import { GoalSelection } from './GoalSelection'
import { GenderSelection } from './GenderSelection'
import { ExperienceSelection } from './ExperienceSelection'
import { QuestionnaireNavigation } from './QuestionnaireNavigation'
import { PlanRecommendation } from './PlanRecommendation'

const OPEN_EVENT = 'coachnati:planfinder:open'
const CLOSE_EVENT = 'coachnati:planfinder:close'

type View = 'question' | 'loading' | 'result' | 'error'

const STORAGE_KEY = 'coachnati:planfinder:answers'

function loadStored(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw) as QuizState
      return { goal: p.goal ?? '', gender: p.gender ?? '', experience: p.experience ?? '' }
    }
  } catch {
    /* ignore */
  }
  return EMPTY_ANSWERS
}

function QuestionBody({ step, answers, onChange }: { step: number; answers: QuizState; onChange: (k: AnswerKey, v: string) => void }) {
  const q = QUESTIONS[step]
  const value = answers[q.key]
  const select = (v: string) => onChange(q.key, v)

  if (q.key === 'goal') return <GoalSelection value={value} onChange={select} />
  if (q.key === 'gender') return <GenderSelection value={value} onChange={select} />
  return <ExperienceSelection value={value} onChange={select} />
}

export function PlanFinderModal() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [view, setView] = useState<View>('question')
  const [answers, setAnswers] = useState<QuizState>(loadStored)
  const [plan, setPlan] = useState<RecommendedPlan | null>(null)
  const [validation, setValidation] = useState<string | null>(null)
  const [confirm, setConfirm] = useState(false)
  const answerCount = useRef(0)
  const wasOpened = useRef(false)

  const total = QUESTIONS.length

  useEffect(() => {
    const onOpen = () => {
      setOpen(true)
      setStep(0)
      setView('question')
      setValidation(null)
      setConfirm(false)
      wasOpened.current = true
      track('questionnaire_opened')
    }
    const onClose = () => {
      setOpen(false)
      setConfirm(false)
      if (wasOpened.current && (answers.goal || answers.gender || answers.experience)) {
        track('questionnaire_abandoned')
      }
      wasOpened.current = false
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    window.addEventListener(CLOSE_EVENT, onClose as EventListener)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.removeEventListener(CLOSE_EVENT, onClose as EventListener)
    }
  }, [answers])

  // Persist answers for the current page session
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      /* ignore */
    }
  }, [answers])

  // Escape / scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (confirm) setConfirm(false)
        else if (view === 'result' || view === 'question') requestClose()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, confirm, view])

  const question = QUESTIONS[step]
  const selected = answers[question.key]
  const canContinue = question.optional || !!selected

  const change = (k: AnswerKey, v: string) => {
    setAnswers((a) => ({ ...a, [k]: v }))
    setValidation(null)
  }

  const onContinue = () => {
    if (!canContinue) {
      setValidation('Please select an option to continue.')
      return
    }
    if (!question.optional && selected) answerCount.current += 1
    if (step === 0 && question.key === 'goal') track('questionnaire_step_1_completed', { goal: answers.goal })
    if (step === 1 && question.key === 'gender') track('questionnaire_step_2_completed')
    if (step === total - 1) {
      submit()
      return
    }
    setStep((s) => s + 1)
  }

  const submit = () => {
    setView('loading')
    track('questionnaire_step_3_completed')
    // simulate a short analysis; switch to an async-aware stub so real
    // backends can plug in later without touching the UI
    window.setTimeout(() => {
      try {
        const recommended = recommendPlan(answers)
        setPlan(recommended)
        setView('result')
        track('questionnaire_completed', { goal: answers.goal, experience: answers.experience })
        track('plan_recommended', { plan: recommended.id })
      } catch {
        setView('error')
      }
    }, 1400)
  }

  const getStarted = () => {
    if (!plan) return
    track('plan_selected', { plan: plan.id })
    track('plan_checkout_started', { plan: plan.id })
    setConfirm(false)
    setOpen(false)
    navigate(`/enroll?offer=${plan.id}`)
  }

  const requestClose = () => {
    if (answers.goal || answers.gender || answers.experience) setConfirm(true)
    else closeQuiet()
  }

  const closeQuiet = () => {
    setOpen(false)
    setConfirm(false)
  }

  const changeAnswers = () => {
    setPlan(null)
    setStep(0)
    setView('question')
    setValidation(null)
  }

  const retryAnalysis = () => {
    submit()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-0 backdrop-blur-sm sm:p-6"
          onClick={requestClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="planfinder-title"
            className={cn(
              'max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-surface-card shadow-lift sm:rounded-3xl',
              'flex flex-col',
            )}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-border bg-surface-card/95 px-5 py-4 backdrop-blur sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="plan-title" className="text-lg font-black tracking-tight text-content">
                    FIND YOUR PERFECT PLAN
                  </h2>
                  <p className="text-xs font-semibold text-content-muted">Answer 3 quick questions to get started</p>
                </div>
                <button
                  onClick={requestClose}
                  aria-label="Close questionnaire"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-content-muted transition hover:border-accent hover:text-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4">
                <ProgressIndicator step={view === 'question' ? step + 1 : total} total={total} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 px-5 py-6 sm:px-7">
              <AnimatePresence mode="wait">
                {view === 'question' && (
                  <motion.div
                    key={`q-${step}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="text-xl font-black tracking-tight text-content sm:text-2xl">{question.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-content-muted">{question.helper}</p>
                    {question.optional && (
                      <p className="mt-1 text-xs font-semibold text-content-faint">(Optional)</p>
                    )}

                    <div className="mt-6">
                      <QuestionBody step={step} answers={answers} onChange={change} />
                    </div>

                    {validation && (
                      <p role="alert" className="mt-4 flex items-center gap-1.5 text-sm font-bold text-error">
                        <AlertTriangle className="h-4 w-4" /> {validation}
                      </p>
                    )}
                  </motion.div>
                )}

                {view === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[40vh] flex-col items-center justify-center text-center"
                  >
                    <div className="relative grid h-16 w-16 place-items-center">
                      <motion.span
                        className="absolute inset-0 rounded-2xl border-2 border-accent/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                      />
                      <Loader2 className="h-7 w-7 animate-spin text-accent" />
                    </div>
                    <h3 className="mt-6 text-lg font-black uppercase tracking-wider text-content">ANALYZING YOUR GOALS...</h3>
                    <p className="mt-2 text-sm text-content-muted">Matching you to the best Coach Nati program.</p>
                  </motion.div>
                )}

                {view === 'result' && plan && (
                  <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <PlanRecommendation
                      plan={plan}
                      answers={answers}
                      onGetStarted={getStarted}
                      onChangeAnswers={changeAnswers}
                    />
                  </motion.div>
                )}

                {view === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[40vh] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-error/10 text-error">
                      <AlertTriangle className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-black text-content">Something went wrong. Please try again.</h3>
                    <p className="mt-1 text-sm text-content-muted">Your answers have been saved.</p>
                    <div className="mt-6 flex gap-3">
                      <Button variant="accent" onClick={retryAnalysis}>
                        TRY AGAIN
                      </Button>
                      <Button variant="outline" onClick={changeAnswers}>
                        BACK
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {view === 'question' && (
              <div className="sticky bottom-0 z-10 border-t border-border bg-surface-card/95 px-5 py-4 backdrop-blur sm:px-7">
                <QuestionnaireNavigation
                  step={step}
                  isLast={step === total - 1}
                  canContinue={canContinue}
                  onBack={() => setStep((s) => Math.max(0, s - 1))}
                  onContinue={onContinue}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Confirm exit dialog */}
      <AnimatePresence>
        {open && confirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="exit-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-border bg-surface-card p-6 text-center shadow-lift"
            >
              <h3 id="exit-title" className="text-lg font-black text-content">
                Are you sure you want to exit?
              </h3>
              <p className="mt-2 text-sm text-content-muted">Your answers are kept for this session and will be there if you come back.</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="accent" size="lg" onClick={() => setConfirm(false)}>
                  Continue Questionnaire
                </Button>
                <Button variant="ghost" size="lg" onClick={closeQuiet}>
                  Exit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}