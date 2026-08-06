import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Scale, User, HeartPulse, Dumbbell, Target,
  CalendarDays, Salad, ClipboardCheck, ShieldCheck, Star,
} from 'lucide-react'
import { getSession, saveOnboarding, useDB } from '@/lib/store'
import { PROGRAMS, PLANS } from '@/lib/constants'
import { bmi, bmiCategory, formatCurrency, cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Badge } from '@/components/ui'
import { DynamicIcon } from '@/lib/icons'

type Gender = 'Male' | 'Female'
type Level = 'Beginner' | 'Intermediate' | 'Advanced'
type Goal = 'Weight Loss' | 'Muscle Gain' | 'Body Recomposition' | 'Strength Training' | 'Overall Fitness'

interface Form {
  age: number
  gender: Gender
  heightCm: number
  weightKg: number
  targetWeightKg: number
  targetDate: string
  level: Level
  goal: Goal
  medicalConditions: string[]
  experience: string
  trainingDays: string[]
  equipment: string[]
  foodPreferences: string[]
  lifestyle: string
  programId: string
  planId: string
}

const STEPS = [
  { title: 'Welcome', icon: Sparkles },
  { title: 'Body', icon: Scale },
  { title: 'Health', icon: HeartPulse },
  { title: 'Experience', icon: Dumbbell },
  { title: 'Goals', icon: Target },
  { title: 'Schedule', icon: CalendarDays },
  { title: 'Nutrition', icon: Salad },
  { title: 'Your Program', icon: ClipboardCheck },
]

const MEDICAL = ['None', 'Back pain', 'Knee issues', 'Shoulder injury', 'High blood pressure', 'Diabetes', 'Asthma', 'Heart condition']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const EQUIPMENT = ['No equipment', 'Dumbbells', 'Barbell', 'Resistance bands', 'Full gym', 'Cardio machine', 'Kettlebells']
const FOODS = ['Chicken', 'Beef', 'Fish', 'Eggs', 'Rice', 'Oats', 'Vegetables', 'Fruits', 'Dairy', 'Beans/Legumes']
const GOALS: { id: Goal; emoji: string }[] = [
  { id: 'Weight Loss', emoji: '🔥' },
  { id: 'Muscle Gain', emoji: '💪' },
  { id: 'Body Recomposition', emoji: '🔄' },
  { id: 'Strength Training', emoji: '🏋️' },
  { id: 'Overall Fitness', emoji: '⚡' },
]

function initialForm(goal?: string | null): Form {
  const today = new Date()
  const d = new Date(today)
  d.setMonth(d.getMonth() + 3)
  const validGoals: Goal[] = ['Weight Loss', 'Muscle Gain', 'Body Recomposition', 'Strength Training', 'Overall Fitness']
  return {
    age: 28, gender: 'Male', heightCm: 175, weightKg: 75, targetWeightKg: 70,
    targetDate: d.toISOString().split('T')[0], level: 'Beginner', goal: (validGoals.find((g) => g === goal) ?? 'Weight Loss') as Goal,
    medicalConditions: ['None'], experience: 'Never trained', trainingDays: ['Monday', 'Wednesday', 'Friday'],
    equipment: ['No equipment'], foodPreferences: [], lifestyle: 'Office job', programId: '', planId: 'pro',
  }
}

const goalToProgram: Record<Goal, string> = {
  'Weight Loss': 'p_weightloss',
  'Muscle Gain': 'p_muscle',
  'Body Recomposition': 'p_recomp',
  'Strength Training': 'p_strength',
  'Overall Fitness': 'p_beginner',
}

export default function Onboarding() {
  const navigate = useNavigate()
  const db = useDB()
  const { success } = useToast()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(() => initialForm(searchParams.get('goal')))
  const session = getSession()
  const isDone = step === STEPS.length - 1

  const profile = useMemo(() => {
    const value = bmi(form.weightKg, form.heightCm)
    return { value, cat: bmiCategory(value) }
  }, [form.weightKg, form.heightCm])

  const suggestedProgram = useMemo(
    () => db.programs.find((p) => p.id === (form.programId || goalToProgram[form.goal])),
    [db.programs, form.programId, form.goal],
  )

  const update = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }))
  const toggle = (key: 'trainingDays' | 'equipment' | 'foodPreferences' | 'medicalConditions', v: string) =>
    setForm((f) => {
      const list = f[key]
      const next = list.includes(v) ? list.filter((x) => x !== v) : v === 'None' && key === 'medicalConditions' ? ['None'] : [...list.filter((x) => x !== 'None'), v]
      return { ...f, [key]: next }
    })

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return form.heightCm > 0 && form.weightKg > 0 && form.age > 0
    if (step === 2) return form.medicalConditions.length > 0
    if (step === 3) return !!form.experience
    if (step === 4) return form.targetWeightKg > 0 && !!form.targetDate
    if (step === 5) return form.trainingDays.length > 0
    if (step === 6) return true
    return !!suggestedProgram
  }

  const next = () => {
    if (step === STEPS.length - 1) {
      if (!session) return navigate('/login')
      saveOnboarding(session.userId, {
        profile: {
          age: form.age, gender: form.gender, heightCm: form.heightCm, weightKg: form.weightKg,
          targetWeightKg: form.targetWeightKg, targetDate: form.targetDate, fitnessLevel: form.level,
          goal: form.goal, medicalConditions: form.medicalConditions, workoutExperience: form.experience,
          trainingDays: form.trainingDays, equipment: form.equipment, foodPreferences: form.foodPreferences,
          lifestyle: form.lifestyle,
        },
        programId: suggestedProgram?.id ?? 'p_beginner',
        planId: form.planId,
      })
      success('Profile created!', 'Your personalized coaching profile is ready.')
      navigate(`/checkout?program=${suggestedProgram?.id ?? 'p_beginner'}&plan=${form.planId}`)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const selectGoal = (g: Goal) => {
    update('goal', g)
    update('programId', goalToProgram[g])
    if (form.goal !== g) {
      // sensible target weight heuristic
      if (g === 'Weight Loss') update('targetWeightKg', Math.round(form.weightKg * 0.9))
      if (g === 'Muscle Gain') update('targetWeightKg', Math.round(form.weightKg * 1.08))
    }
  }

  return (
    <div className="relative min-h-screen bg-surface pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-3xl">
        {/* Stepper */}
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-black text-content">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-xs font-bold text-content-muted">{Math.round((step / (STEPS.length - 1)) * 100)}% complete</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-cta-gradient"
              animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="mt-4 flex justify-between">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                onClick={() => i < step && setStep(i)}
                className={cn(
                  'flex flex-col items-center gap-1.5 text-center',
                  i <= step ? 'text-accent-dark dark:text-accent' : 'text-content-faint',
                )}
                aria-label={s.title}
              >
                <span
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-300',
                    i < step
                      ? 'border-accent bg-accent text-primary'
                      : i === step
                        ? 'border-accent text-accent'
                        : 'border-border',
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" strokeWidth={3} /> : <s.icon className="h-4 w-4" />}
                </span>
                <span className="hidden text-[10px] font-bold sm:block">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <WelcomeStep onStart={() => setStep(1)} />}
            {step === 1 && <BodyStep form={form} update={update} />}
            {step === 2 && <HealthStep form={form} toggle={toggle} />}
            {step === 3 && <ExperienceStep form={form} update={update} />}
            {step === 4 && <GoalsStep form={form} update={update} selectGoal={selectGoal} profile={profile} />}
            {step === 5 && <ScheduleStep form={form} toggle={toggle} />}
            {step === 6 && <FoodStep form={form} update={update} toggle={toggle} />}
            {step === 7 && (
              <ProgramStep
                program={suggestedProgram}
                form={form}
                update={update}
                db={db}
                profile={profile}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="opacity-80">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button variant="accent" size="lg" onClick={next} disabled={!canNext()} className="group">
            {isDone ? 'Create my profile & continue' : 'Continue'}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-3xl bg-cta-gradient shadow-glow"
      >
        <Sparkles className="h-10 w-10 text-primary" />
      </motion.div>
      <h1 className="text-3xl font-black tracking-tight text-content sm:text-4xl">
        Let's build your <span className="text-gradient-accent">coaching profile</span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-content-muted">
        Answer a few quick questions and I'll generate a fully personalized program — your training, nutrition and
        progress plan — in under 2 minutes.
      </p>
      <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
        {[
          'Your body metrics & health history',
          'Your goal, schedule & equipment',
          'Personalized program recommendation',
        ].map((t, i) => (
          <div key={t} className="flex items-center gap-3 rounded-xl border border-border bg-surface-subtle/60 px-5 py-4 dark:bg-surface-subtle">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-black text-primary dark:text-accent">{i + 1}</span>
            <p className="text-sm font-bold text-content">{t}</p>
          </div>
        ))}
      </div>
      <Button variant="accent" size="lg" onClick={onStart} className="group mt-8">
        Start assessment <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  )
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-black text-content">{label}</label>
        {hint && <span className="text-xs text-content-faint">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function BodyStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  const genders: Gender[] = ['Male', 'Female']
  return (
    <div className="space-y-6">
      <StepTitle title="Tell me about your body" sub="This builds your baseline — everything is 100% private." />
      <div className="grid grid-cols-2 gap-3">
        {genders.map((g) => (
          <button
            key={g}
            onClick={() => update('gender', g)}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl border py-4 text-sm font-bold transition-all',
              form.gender === g ? 'border-accent bg-accent/15 text-primary shadow-glow dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            <User className="h-4 w-4" /> {g}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FieldRow label="Age">
          <input type="number" min={14} max={90} value={form.age} onChange={(e) => update('age', Number(e.target.value))} className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-lg font-black text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" aria-label="Age" />
        </FieldRow>
        <FieldRow label="Height" hint="cm">
          <input type="number" min={130} max={220} value={form.heightCm} onChange={(e) => update('heightCm', Number(e.target.value))} className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-lg font-black text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" aria-label="Height in cm" />
        </FieldRow>
        <FieldRow label="Weight" hint="kg">
          <input type="number" min={35} max={220} value={form.weightKg} onChange={(e) => update('weightKg', Number(e.target.value))} className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-lg font-black text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" aria-label="Weight in kg" />
        </FieldRow>
      </div>
    </div>
  )
}

function HealthStep({ form, toggle }: { form: Form; toggle: (k: 'medicalConditions', v: string) => void }) {
  return (
    <div className="space-y-6">
      <StepTitle title="Any medical conditions?" sub="So I can design your plan safely around you." />
      <div className="flex flex-wrap gap-2.5">
        {MEDICAL.map((m) => (
          <Chip key={m} active={form.medicalConditions.includes(m)} onClick={() => toggle('medicalConditions', m)}>{m}</Chip>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <p className="text-xs leading-relaxed text-content-muted">
          Your health data is confidential and only used to adapt your programming. For serious conditions I recommend
          medical clearance before starting any exercise program.
        </p>
      </div>
    </div>
  )
}

function ExperienceStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced']
  const experience = ['Never trained', 'Some experience (1–2 yrs)', 'Regular lifter (2+ yrs)', 'Athlete / competitive']
  return (
    <div className="space-y-7">
      <StepTitle title="Your fitness experience" sub="There's no wrong answer — this customizes the difficulty." />
      <div className="grid grid-cols-3 gap-3">
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => update('level', l)}
            className={cn(
              'rounded-xl border py-4 text-sm font-bold transition-all',
              form.level === l ? 'border-accent bg-accent/15 text-primary shadow-glow dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            {l}
          </button>
        ))}
      </div>
      <FieldRow label="Training history">
        <div className="grid gap-2.5">
          {experience.map((e) => (
            <button
              key={e}
              onClick={() => update('experience', e)}
              className={cn(
                'flex items-center justify-between rounded-xl border px-5 py-3.5 text-sm font-bold transition-all',
                form.experience === e ? 'border-accent bg-accent/10 text-content' : 'border-border text-content-muted hover:border-accent/40',
              )}
            >
              {e}
              {form.experience === e && <Check className="h-4 w-4 text-accent-dark dark:text-accent" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </FieldRow>
    </div>
  )
}

function GoalsStep({
  form, update, selectGoal, profile,
}: {
  form: Form
  update: <K extends keyof Form>(k: K, v: Form[K]) => void
  selectGoal: (g: Goal) => void
  profile: { value: number; cat: { label: string; color: string } }
}) {
  return (
    <div className="space-y-7">
      <StepTitle title="What's your primary goal?" sub={`Your current BMI is ${profile.value.toFixed(1)} (${profile.cat.label}).`} />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => selectGoal(g.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-5 py-4 text-left text-sm font-bold transition-all',
              form.goal === g.id ? 'border-accent bg-accent/10 text-content shadow-glow' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            <span className="text-2xl">{g.emoji}</span>
            {g.id}
            {form.goal === g.id && <Check className="ml-auto h-4 w-4 text-accent-dark dark:text-accent" strokeWidth={3} />}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldRow label="Target weight" hint="kg">
          <input type="number" min={35} max={220} value={form.targetWeightKg} onChange={(e) => update('targetWeightKg', Number(e.target.value))} className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-lg font-black text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" aria-label="Target weight in kg" />
        </FieldRow>
        <FieldRow label="Target date">
          <input type="date" value={form.targetDate} onChange={(e) => update('targetDate', e.target.value)} className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-sm font-bold text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" aria-label="Target date" />
        </FieldRow>
      </div>
    </div>
  )
}

function ScheduleStep({ form, toggle }: { form: Form; toggle: (k: 'trainingDays' | 'equipment', v: string) => void }) {
  return (
    <div className="space-y-7">
      <StepTitle title="Your schedule & equipment" sub="This builds a plan that fits your real life." />
      <FieldRow label="Days you can train" hint="select all">
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => toggle('trainingDays', d)}
              className={cn(
                'rounded-xl border py-3 text-[11px] font-bold transition-all',
                form.trainingDays.includes(d) ? 'border-accent bg-accent/15 text-primary dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
              )}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Equipment you have">
        <div className="flex flex-wrap gap-2.5">
          {EQUIPMENT.map((e) => (
            <Chip key={e} active={form.equipment.includes(e)} onClick={() => toggle('equipment', e)}>{e}</Chip>
          ))}
        </div>
      </FieldRow>
    </div>
  )
}

function FoodStep({ form, update, toggle }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void; toggle: (k: 'foodPreferences', v: string) => void }) {
  const lifestyle = ['Office job', 'Active / on feet', 'Student', 'Shift work', 'Entrepreneur / busy', 'Parent']
  return (
    <div className="space-y-7">
      <StepTitle title="Food & lifestyle" sub="Meals you love = results you keep." />
      <FieldRow label="Foods you enjoy" hint="select all">
        <div className="flex flex-wrap gap-2.5">
          {FOODS.map((f) => (
            <Chip key={f} active={form.foodPreferences.includes(f)} onClick={() => toggle('foodPreferences', f)}>{f}</Chip>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Your lifestyle">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {lifestyle.map((l) => (
            <button
              key={l}
              onClick={() => update('lifestyle', l)}
              className={cn(
                'rounded-xl border px-4 py-3.5 text-xs font-bold transition-all',
                form.lifestyle === l ? 'border-accent bg-accent/10 text-content' : 'border-border text-content-muted hover:border-accent/40',
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </FieldRow>
    </div>
  )
}

function ProgramStep({
  program, form, update, db, profile,
}: {
  program?: (typeof PROGRAMS)[number]
  form: Form
  update: <K extends keyof Form>(k: K, v: Form[K]) => void
  db: { programs: typeof PROGRAMS; plans: typeof PLANS }
  profile: { value: number; cat: { label: string; color: string } }
}) {
  return (
    <div className="space-y-7">
      <StepTitle title="Your personalized program" sub="Recommended based on your goal and assessment." />

      <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-xs font-semibold text-content-muted">
        <Star className="h-4 w-4 shrink-0 text-warning" fill="currentColor" />
        BMI {profile.value.toFixed(1)} ({profile.cat.label}) · {form.level} level · {form.trainingDays.length} training days
      </div>

      {program && (
        <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ background: `${program.color}22`, color: program.color }}>
              <DynamicIcon name={program.icon} className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg font-black text-content">{program.name}</p>
              <p className="text-xs font-semibold text-content-muted">{program.duration} · {program.level} · {program.goal}</p>
            </div>
            <Badge variant="success" className="ml-auto">Recommended</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {program.benefits.map((b) => (
              <span key={b} className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-content-muted">{b}</span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {db.programs.filter((p) => p.id !== program.id).slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => update('programId', p.id)}
                className="rounded-full border border-border px-4 py-2 text-xs font-bold text-content-muted transition hover:border-accent hover:text-content"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <FieldRow label="Choose your plan">
        <div className="grid gap-3 sm:grid-cols-3">
          {db.plans.map((p) => (
            <button
              key={p.id}
              onClick={() => update('planId', p.id)}
              className={cn(
                'relative rounded-2xl border p-5 text-left transition-all',
                form.planId === p.id ? 'border-accent bg-accent/10 shadow-glow' : 'border-border hover:border-accent/40',
              )}
            >
              {p.popular && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-cta-gradient px-3 py-0.5 text-[10px] font-black uppercase text-primary">Popular</span>
              )}
              <p className="font-black text-content">{p.name}</p>
              <p className="mt-1 text-lg font-black text-content">{formatCurrency(p.monthly)}<span className="text-xs font-semibold text-content-faint">/mo</span></p>
              {form.planId === p.id && <Check className="absolute right-4 top-4 h-4 w-4 text-accent-dark dark:text-accent" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </FieldRow>

      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-subtle/60 p-5 text-xs font-semibold text-content-muted dark:bg-surface-subtle">
        <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
        14-day money-back guarantee · Cancel anytime · Personalized within 24h of signup
      </div>
    </div>
  )
}

function StepTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h2 className="text-2xl font-black tracking-tight text-content sm:text-3xl">{title}</h2>
      {sub && <p className="mt-1.5 text-sm text-content-muted">{sub}</p>}
    </div>
  )
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2.5 text-xs font-bold transition-all',
        active ? 'border-accent bg-accent/15 text-primary shadow-glow dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
      )}
    >
      {children}
    </button>
  )
}
