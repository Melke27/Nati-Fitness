import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CreditCard, Landmark, Smartphone, Ticket, ShieldCheck, Sparkles, Dumbbell, HeartPulse, Zap, CalendarDays, Wallet, CircleDollarSign } from 'lucide-react'
import { useDB, getSession, registerUser, setSession, saveOnboarding, addPayment, applyCoupon, type PaymentMethod } from '@/lib/store'
import { Button, Input } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'

const PAYMENT_METHODS: { id: PaymentMethod; icon: typeof CreditCard; label: string; desc: string }[] = [
  { id: 'Card', icon: CreditCard, label: 'Card', desc: 'Instant secure checkout' },
  { id: 'CBE', icon: Landmark, label: 'CBE', desc: 'Bank transfer & screenshot' },
  { id: 'Telebirr', icon: Smartphone, label: 'Telebirr', desc: 'Mobile money + screenshot' },
  { id: 'Bank Transfer', icon: Landmark, label: 'Bank transfer', desc: 'Manual transfer' },
]

type Cycle = 'monthly' | 'quarterly' | 'yearly'

type StepKey = 'program' | 'plan' | 'payment' | 'account'

interface AccountForm {
  name: string
  email: string
  phone: string
  password: string
  confirm: string
}

function initialAccountForm() {
  return { name: '', email: '', phone: '', password: '', confirm: '' }
}

export default function GetStarted() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const db = useDB()
  const { success, error } = useToast()
  const session = getSession()

  const [step, setStep] = useState<StepKey>('program')
  const [selectedProgramId, setSelectedProgramId] = useState(() => searchParams.get('program') ?? db.programs[0]?.id ?? '')
  const [selectedPlanId, setSelectedPlanId] = useState(() => db.plans.find((p) => p.popular)?.id ?? db.plans[0]?.id ?? '')
  const [cycle, setCycle] = useState<Cycle>('quarterly')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card')
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' })
  const [ref, setRef] = useState({ value: '', phone: '', screenshot: '' })
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<null | { code: string; pct: number }>(null)
  const [accountForm, setAccountForm] = useState<AccountForm>(initialAccountForm)
  const [submitting, setSubmitting] = useState(false)

  const selectedProgram = useMemo(() => db.programs.find((p) => p.id === selectedProgramId) ?? db.programs[0], [db.programs, selectedProgramId])
  const selectedPlan = useMemo(() => db.plans.find((p) => p.id === selectedPlanId) ?? db.plans[0], [db.plans, selectedPlanId])

  const months = cycle === 'monthly' ? 1 : cycle === 'quarterly' ? 3 : 12
  const subtotal = (selectedPlan?.[cycle] ?? 0) * months
  const discount = applied ? Math.round((subtotal * applied.pct) / 100) : 0
  const total = subtotal - discount

  const isTransferLike = paymentMethod === 'CBE' || paymentMethod === 'Telebirr' || paymentMethod === 'Bank Transfer'
  const paymentValid = paymentMethod === 'Card'
    ? card.name.trim() && card.number.replace(/\s/g, '').length >= 12 && card.expiry.trim() && card.cvc.trim().length >= 3
    : ref.value.trim().length > 3

  const goNext = () => {
    if (step === 'program') setStep('plan')
    else if (step === 'plan') setStep('payment')
    else if (step === 'payment') setStep('account')
  }

  const goBack = () => {
    if (step === 'plan') setStep('program')
    else if (step === 'payment') setStep('plan')
    else if (step === 'account') setStep('payment')
  }

  const applyPromo = () => {
    try {
      const pct = applyCoupon(code.trim())
      setApplied({ code: code.trim().toUpperCase(), pct })
      success('Coupon applied!', `${pct}% discount added.`)
    } catch (e) {
      error('Coupon error', (e as Error).message)
    }
  }

  const submitAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (accountForm.password.length < 6) return error('Password too short', 'Use at least 6 characters.')
    if (accountForm.password !== accountForm.confirm) return error('Passwords do not match')

    setSubmitting(true)
    try {
      const userId = registerUser({
        name: accountForm.name,
        email: accountForm.email,
        password: accountForm.password,
        phone: accountForm.phone,
      })

      const paymentStatus = isTransferLike ? 'pending' : 'paid'
      addPayment({
        clientId: `client_${userId}`,
        clientName: accountForm.name,
        amount: total,
        plan: selectedPlan?.name ?? 'Pro',
        program: selectedProgram?.name ?? 'Coaching',
        method: paymentMethod,
        paymentRef: isTransferLike ? ref.value : undefined,
        status: paymentStatus,
      })

      setSession({ userId, name: accountForm.name, email: accountForm.email, role: 'client' })
      saveOnboarding(userId, {
        profile: {
          age: 28,
          gender: 'Male',
          heightCm: 175,
          weightKg: 75,
          targetWeightKg: 70,
          targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          fitnessLevel: 'Beginner',
          goal: selectedProgram?.goal ?? 'Overall Fitness',
          medicalConditions: ['None'],
          workoutExperience: 'Never trained',
          trainingDays: ['Monday', 'Wednesday', 'Friday'],
          equipment: ['No equipment'],
          foodPreferences: [],
          lifestyle: 'Office job',
        },
        programId: selectedProgram?.id ?? 'p_beginner',
        planId: selectedPlan?.id ?? 'pro',
      })

      success('Account created!', 'Your plan is reserved and Coach Nati will review your payment.')
      navigate(`/onboarding?goal=${encodeURIComponent(selectedProgram?.goal ?? 'Overall Fitness')}`)
    } catch (err) {
      error('Registration failed', (err as Error).message)
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-surface pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-accent">Get Started</p>
            <h1 className="text-3xl font-black tracking-tight text-content">Build your coaching plan step by step</h1>
          </div>
          <Link to="/" className="text-sm font-semibold text-content-muted hover:text-content">Back home</Link>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-surface-card p-4 shadow-lift">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-content-muted">
            {(['program', 'plan', 'payment', 'account'] as StepKey[]).map((key, index) => {
              const active = step === key
              const done = ['program', 'plan', 'payment', 'account'].indexOf(step) > index
              return (
                <div key={key} className={cn('flex items-center gap-2 rounded-full px-3 py-2', active ? 'bg-accent/10 text-accent' : done ? 'bg-success/10 text-success' : 'bg-surface-subtle text-content-faint')}>
                  <span className={cn('grid h-6 w-6 place-items-center rounded-full', active ? 'bg-accent text-white' : done ? 'bg-success text-white' : 'bg-surface-card')}>
                    {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
                  </span>
                  <span className="capitalize">{key}</span>
                </div>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
            {step === 'program' && (
              <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-2xl border border-border bg-surface-subtle/70 p-6 dark:bg-surface-subtle">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Dumbbell className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Step 1</p>
                      <h2 className="text-xl font-black text-content">Choose the program that fits you best</h2>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {db.programs.map((program) => {
                      const active = selectedProgramId === program.id
                      return (
                        <button key={program.id} type="button" onClick={() => setSelectedProgramId(program.id)} className={cn('rounded-2xl border p-4 text-left transition-all', active ? 'border-accent bg-accent/10 shadow-glow' : 'border-border bg-surface-card hover:border-accent/40')}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-black text-content">{program.name}</p>
                              <p className="mt-1 text-xs font-semibold text-content-muted">{program.tagline}</p>
                            </div>
                            {active && <Check className="h-4 w-4 text-accent" strokeWidth={3} />}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-content-muted">{program.description}</p>
                          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-content-faint">
                            <span className="rounded-full bg-surface-subtle px-2.5 py-1">{program.duration}</span>
                            <span className="rounded-full bg-surface-subtle px-2.5 py-1">{program.goal}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Sparkles className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Your choice</p>
                      <h3 className="text-lg font-black text-content">{selectedProgram?.name ?? 'Program'}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-content-muted">{selectedProgram?.description ?? 'Every option is fully personalized after your assessment and payment review.'}</p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-border bg-surface-subtle/60 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-content-faint">What happens next</p>
                      <p className="mt-2 text-sm text-content-muted">You’ll choose your plan, pick a payment method, and then create your account at the end.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface-subtle/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-black text-content"><HeartPulse className="h-4 w-4 text-accent" /> Includes personalized coaching</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'plan' && (
              <div className="rounded-2xl border border-border bg-surface-subtle/70 p-6 dark:bg-surface-subtle">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><CalendarDays className="h-5 w-5" /></span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Step 2</p>
                    <h2 className="text-xl font-black text-content">Choose the support level you want</h2>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  {db.plans.map((plan) => {
                    const active = selectedPlanId === plan.id
                    return (
                      <button key={plan.id} type="button" onClick={() => setSelectedPlanId(plan.id)} className={cn('rounded-2xl border p-5 text-left transition-all', active ? 'border-accent bg-accent/10 shadow-glow' : 'border-border bg-surface-card hover:border-accent/40')}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-lg font-black text-content">{plan.name}</p>
                            <p className="text-sm text-content-muted">{plan.tagline}</p>
                          </div>
                          {plan.popular && <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-accent">Popular</span>}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {plan.features.slice(0, 3).map((feature) => (
                            <span key={feature} className="rounded-full bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold text-content-muted">{feature}</span>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {(['monthly', 'quarterly', 'yearly'] as Cycle[]).map((value) => (
                    <button key={value} type="button" onClick={() => setCycle(value)} className={cn('rounded-full border px-4 py-2 text-sm font-semibold capitalize', cycle === value ? 'border-accent bg-accent/10 text-accent' : 'border-border text-content-muted')}>
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl border border-border bg-surface-subtle/70 p-6 dark:bg-surface-subtle">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Wallet className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Step 3</p>
                      <h2 className="text-xl font-black text-content">Choose how you want to pay</h2>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon
                      const active = paymentMethod === method.id
                      return (
                        <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id)} className={cn('flex items-start gap-3 rounded-2xl border p-4 text-left transition-all', active ? 'border-accent bg-accent/10 shadow-glow' : 'border-border bg-surface-card hover:border-accent/40')}>
                          <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', active ? 'bg-accent text-white' : 'bg-surface-subtle text-content-muted')}><Icon className="h-5 w-5" /></span>
                          <span>
                            <span className="block text-sm font-black text-content">{method.label}</span>
                            <span className="block text-xs font-semibold text-content-muted">{method.desc}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {paymentMethod === 'Card' && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <Input label="Cardholder name" className="sm:col-span-2" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                      <Input label="Card number" className="sm:col-span-2" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                      <Input label="Expiry" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                      <Input label="CVC" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                    </div>
                  )}

                  {(paymentMethod === 'CBE' || paymentMethod === 'Telebirr' || paymentMethod === 'Bank Transfer') && (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs font-semibold text-content-muted">
                        {paymentMethod === 'CBE' && <>Send your transfer to <span className="font-black text-content">Coach Nati · CBE · #1000 2030 4050</span>.</>}
                        {paymentMethod === 'Telebirr' && <>Send your payment to <span className="font-black text-content">Coach Nati · 0911 234 567</span>.</>}
                        {paymentMethod === 'Bank Transfer' && <>Transfer to <span className="font-black text-content">Coach Nati · Bank of Addis · #1234 5678 90</span>.</>}
                      </div>
                      <Input label="Transaction reference" placeholder="Enter your reference" value={ref.value} onChange={(e) => setRef({ ...ref, value: e.target.value })} />
                    </div>
                  )}

                  <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-accent" />
                      <h3 className="text-sm font-black text-content">Promo code</h3>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Input placeholder="WELCOME10" value={code} onChange={(e) => setCode(e.target.value)} className="uppercase" />
                      <Button variant="outline" size="md" onClick={applyPromo}>Apply</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><CircleDollarSign className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Review</p>
                      <h3 className="text-lg font-black text-content">Your chosen package</h3>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 text-sm text-content-muted">
                    <div className="flex items-center justify-between"><span>Program</span><span className="font-black text-content">{selectedProgram?.name}</span></div>
                    <div className="flex items-center justify-between"><span>Plan</span><span className="font-black text-content">{selectedPlan?.name} · {cycle}</span></div>
                    <div className="flex items-center justify-between"><span>Payment</span><span className="font-black text-content">{paymentMethod}</span></div>
                    <div className="flex items-center justify-between border-t border-border pt-3"><span>Subtotal</span><span className="font-black text-content">{formatCurrency(subtotal)}</span></div>
                    {applied && <div className="flex items-center justify-between text-success"><span>Coupon</span><span className="font-black">-{formatCurrency(discount)}</span></div>}
                    <div className="flex items-center justify-between text-base"><span className="font-black text-content">Total</span><span className="font-black text-accent">{formatCurrency(total)}</span></div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-surface-subtle/70 p-4 text-sm text-content-muted">
                    <div className="flex items-center gap-2 font-black text-content"><ShieldCheck className="h-4 w-4 text-accent" /> Payment review before activation</div>
                    <p className="mt-2">Your payment will be reviewed by Coach Nati and then your account will be created so you can continue your onboarding.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 'account' && (
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><ShieldCheck className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Step 4</p>
                      <h2 className="text-xl font-black text-content">Create your account</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-content-muted">Your selected program, plan, and payment method are saved. Finish the sign-up so Coach Nati can activate your onboarding.</p>
                  <div className="mt-6 space-y-3 text-sm text-content-muted">
                    <div className="flex items-center justify-between"><span>Program</span><span className="font-black text-content">{selectedProgram?.name}</span></div>
                    <div className="flex items-center justify-between"><span>Plan</span><span className="font-black text-content">{selectedPlan?.name}</span></div>
                    <div className="flex items-center justify-between"><span>Payment</span><span className="font-black text-content">{paymentMethod}</span></div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-subtle/70 p-6 dark:bg-surface-subtle">
                  <form onSubmit={submitAccount} className="space-y-4">
                    <Input label="Full name" required value={accountForm.name} onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })} />
                    <Input label="Email" type="email" required value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} />
                    <Input label="Phone / WhatsApp" type="tel" value={accountForm.phone} onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })} />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input label="Password" type="password" required value={accountForm.password} onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })} />
                      <Input label="Confirm" type="password" required value={accountForm.confirm} onChange={(e) => setAccountForm({ ...accountForm, confirm: e.target.value })} />
                    </div>
                    <Button type="submit" variant="accent" size="lg" className="w-full" loading={submitting}>
                      Create account & continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={goBack} disabled={step === 'program'}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step !== 'account' && (
            <Button variant="accent" size="lg" onClick={goNext} disabled={step === 'payment' && !paymentValid} className="group">
              Continue <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
