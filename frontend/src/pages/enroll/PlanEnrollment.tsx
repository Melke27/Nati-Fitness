import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronLeft, ArrowRight, CreditCard, Landmark, Smartphone, Lock, ShieldCheck, BadgeCheck, Clock, Tag,
  User, Mail, Sparkles, AlertTriangle,
} from 'lucide-react'
import { RECOMMENDED_PLANS, type RecommendedPlan } from '@/lib/planFinderData'
import { getSession, setSession, findOrCreateClient, addPayment, type PaymentMethod } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { Button, Input } from '@/components/ui'
import { cn, formatCurrency } from '@/lib/utils'
import { openPlanFinder } from '@/lib/planFinderBus'

type Step = 'confirm' | 'info' | 'checkout' | 'success'

const METHODS: { id: PaymentMethod; icon: typeof CreditCard; label: string; desc: string }[] = [
  { id: 'Card', icon: CreditCard, label: 'Card', desc: 'Visa · Mastercard' },
  { id: 'CBE', icon: Landmark, label: 'CBE', desc: 'Bank transfer + screenshot' },
  { id: 'Telebirr', icon: Smartphone, label: 'Telebirr', desc: 'Mobile money + screenshot' },
  { id: 'Bank Transfer', icon: Landmark, label: 'Bank transfer', desc: 'Manual transfer' },
]

const STEPS: { id: Step; label: string }[] = [
  { id: 'confirm', label: 'Confirm Plan' },
  { id: 'info', label: 'Your Details' },
  { id: 'checkout', label: 'Payment' },
  { id: 'success', label: 'Done' },
]

interface Customer {
  name: string
  email: string
  phone: string
  age: string
  location: string
  goal: string
  notes: string
  password: string
}

const EMPTY_CUSTOMER: Customer = { name: '', email: '', phone: '', age: '', location: '', goal: '', notes: '', password: '' }

export default function PlanEnrollment() {
  const [params] = useSearchParams()
  const { success } = useToast()
  const session = getSession()

  const offerId = params.get('offer')
  const plan: RecommendedPlan | null = offerId ? (RECOMMENDED_PLANS[offerId] ?? null) : null

  const [step, setStep] = useState<Step>('confirm')
  const [customer, setCustomer] = useState<Customer>(() => ({
    ...EMPTY_CUSTOMER,
    name: session?.name ?? '',
    email: session?.email ?? '',
  }))
  const [method, setMethod] = useState<PaymentMethod>('Card')
  const [refValue, setRefValue] = useState('')
  const [terms, setTerms] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [paymentRef, setPaymentRef] = useState('')

  const stepIndex = useMemo(() => STEPS.findIndex((s) => s.id === step), [step])
  const isTransferLike = method === 'CBE' || method === 'Telebirr' || method === 'Bank Transfer'

  if (!plan) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-6 pt-24">
        <div className="max-w-md text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-warning" />
          <h1 className="mt-4 text-2xl font-black text-content">No plan selected</h1>
          <p className="mt-2 text-sm text-content-muted">Start with the 3-step questionnaire to get your recommendation.</p>
          <Button variant="accent" size="lg" className="mt-6" onClick={openPlanFinder}>
            FIND YOUR PERFECT PLAN <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const set = <K extends keyof Customer>(k: K, v: Customer[K]) => {
    setCustomer((c) => ({ ...c, [k]: v }))
    setErrorMsg(null)
  }

  const infoValid =
    customer.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) &&
    customer.phone.trim().length >= 7 &&
    customer.age.trim() !== '' &&
    Number(customer.age) >= 14 &&
    customer.location.trim().length >= 2

  const checkoutValid = terms && (method === 'Card' ? customer.password.trim().length >= 6 : refValue.trim().length >= 4)

  const continueInfo = () => {
    if (!infoValid) {
      setErrorMsg('Please fill in all required fields correctly.')
      return
    }
    setStep('checkout')
  }

  const pay = () => {
    setProcessing(true)
    setErrorMsg(null)
    // Real behaviour: card uses the demo gateway; all transfer methods are
    // recorded as PENDING and activate only once Coach Nati confirms the funds.
    const pending = isTransferLike
    const status = pending ? ('pending' as const) : ('paid' as const)

    window.setTimeout(() => {
      try {
        const { userId, clientId } = findOrCreateClient({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          password: customer.password,
        })
        setSession({ userId, name: customer.name, email: customer.email, role: 'client' })
        const payment = addPayment({
          clientId,
          clientName: customer.name,
          amount: plan.priceEtb,
          plan: plan.name,
          program: plan.name,
          method,
          paymentRef: isTransferLike ? refValue : undefined,
          status,
        })
        setPaymentRef(payment.reference)
        setStep('success')
        setProcessing(false)
        if (pending) {
          success('Payment received for review', 'Your plan activates once your transfer is confirmed.')
        } else {
          success('Payment successful!', 'Welcome to Coach Nati.')
        }
      } catch (e) {
        setProcessing(false)
        setErrorMsg((e as Error).message || 'Something went wrong. Please try again.')
      }
    }, 1200)
  }

  return (
    <div className="relative min-h-screen bg-surface pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-3xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-content-muted transition hover:text-content">
          <ChevronLeft className="h-4 w-4" /> Back to Coach Nati
        </Link>

        {/* Stepper */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight text-content">Enroll in {plan.name}</h1>
            <span className="text-xs font-bold text-content-muted">Step {stepIndex + 1} of {STEPS.length}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-cta-gradient"
              animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="mt-4 flex gap-3">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-black transition-colors',
                  i <= stepIndex ? 'bg-accent/15 text-primary dark:text-accent' : 'bg-surface-subtle text-content-faint',
                )}
              >
                <span className={cn('grid h-5 w-5 place-items-center rounded-full', i < stepIndex ? 'bg-accent text-white' : i === stepIndex ? 'bg-accent/25' : 'bg-border')}>
                  {i < stepIndex ? <Check className="h-3 w-3" strokeWidth={3} /> : <span>{i + 1}</span>}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ---------- Step 6 — Confirm ---------- */}
          {step === 'confirm' && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              <div className="overflow-hidden rounded-3xl border border-border bg-surface-card shadow-lift">
                <div className="border-b border-border bg-gradient-to-br from-accent/15 via-accent/5 to-transparent px-6 py-6 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">Confirm your plan</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-content sm:text-3xl">{plan.name}</h2>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-black uppercase text-accent">
                      <Clock className="h-3.5 w-3.5" /> {plan.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-black uppercase text-success">
                      <Tag className="h-3.5 w-3.5" /> {plan.priceLabel}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-6 sm:px-8">
                  <p className="text-sm leading-relaxed text-content-muted">{plan.tagline}</p>
                  <h3 className="mt-5 text-xs font-black uppercase tracking-widest text-content-muted">What's included</h3>
                  <ul className="mt-3 space-y-2.5">
                    {plan.includes.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-content">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="accent" size="lg" className="flex-1" onClick={() => setStep('info')}>
                  Confirm & Continue <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={openPlanFinder}>
                  Change Plan
                </Button>
              </div>
            </motion.div>
          )}

          {/* ---------- Step 7 — Customer info ---------- */}
          {step === 'info' && (
            <motion.div key="info" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                <h2 className="font-black text-content">Your details</h2>
                <p className="mb-5 text-xs font-semibold text-content-muted">Used to build your coaching profile and dashboard.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input label="Full name" placeholder="John Doe" value={customer.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                  </div>
                  <Input label="Email" type="email" placeholder="you@email.com" value={customer.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                  <Input label="Phone / WhatsApp" type="tel" placeholder="+251 91 234 5678" value={customer.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
                  <Input label="Age" type="number" min={14} max={99} placeholder="28" value={customer.age} onChange={(e) => set('age', e.target.value)} />
                  <Input label="Location" placeholder="Addis Ababa, Ethiopia" value={customer.location} onChange={(e) => set('location', e.target.value)} />
                  <div className="sm:col-span-2">
                    <Input label="Fitness goal" placeholder="e.g. Lose 12 kg, build muscle" value={customer.goal} onChange={(e) => set('goal', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Notes (optional)" placeholder="Injuries, schedule, anything Coach Nati should know" value={customer.notes} onChange={(e) => set('notes', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Create a password" type="password" placeholder="Min. 6 characters" value={customer.password} onChange={(e) => set('password', e.target.value)} autoComplete="new-password" />
                  </div>
                </div>
                {errorMsg && (
                  <p role="alert" className="mt-4 flex items-center gap-1.5 text-sm font-bold text-error">
                    <AlertTriangle className="h-4 w-4" /> {errorMsg}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="ghost" size="lg" onClick={() => setStep('confirm')}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="accent" size="lg" className="flex-1" onClick={continueInfo}>
                  Continue to Payment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ---------- Step 8 — Checkout ---------- */}
          {step === 'checkout' && (
            <motion.div key="checkout" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                  <h3 className="mb-4 font-black text-content">Payment method</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => { setMethod(m.id); setRefValue('') }}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
                          method === m.id ? 'border-accent bg-accent/10 text-content shadow-glow' : 'border-border text-content-muted hover:border-accent/40',
                        )}
                      >
                        <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', method === m.id ? 'bg-accent text-white' : 'bg-surface-card')}>
                          <m.icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-black">{m.label}</span>
                          <span className="block text-[11px] font-semibold">{m.desc}</span>
                        </span>
                        {method === m.id && <Check className="h-4 w-4 text-accent-dark dark:text-accent" strokeWidth={3} />}
                      </button>
                    ))}
                  </div>

                  {isTransferLike && (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-xs font-semibold text-content-muted">
                        {method === 'CBE' && <>Transfer to <span className="font-black text-content">Coach Nati · CBE · #1000 2030 4050</span>, then add your reference below.</>}
                        {method === 'Telebirr' && <>Pay <span className="font-black text-content">Coach Nati · 0911 234 567</span> on Telebirr, then add your reference below.</>}
                        {method === 'Bank Transfer' && <>Transfer to <span className="font-black text-content">Coach Nati · Bank of Addis · #1234 5678 90</span>. Activates within 4 business hours.</>}
                      </div>
                      <Input label="Transaction reference number" placeholder="Enter transaction reference" value={refValue} onChange={(e) => setRefValue(e.target.value)} />
                    </div>
                  )}

                  <label className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-content-muted">
                    <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[#E11D48]" />
                    I agree to the Coach Nati Terms of Service, Privacy Policy and coaching agreement. I understand I'm enrolling in the {plan.name} program for {plan.duration}.
                  </label>

                  {errorMsg && (
                    <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm font-bold text-error">
                      <AlertTriangle className="h-4 w-4" /> {errorMsg}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="ghost" size="lg" onClick={() => setStep('info')} disabled={processing}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button variant="accent" size="lg" className="flex-1" onClick={pay} disabled={!checkoutValid || processing} loading={processing}>
                    {processing ? 'Processing…' : isTransferLike ? 'Complete Enrollment' : 'Pay & Complete Enrollment'}
                    {!processing && <Lock className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-2xl border border-border bg-primary p-6 text-white lg:sticky lg:top-28">
                <h3 className="font-black text-white">Order summary</h3>
                <div className="mt-4 flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-lg text-accent">◆</div>
                  <div>
                    <p className="text-sm font-black text-white">{plan.name}</p>
                    <p className="text-xs text-white/50">{plan.duration}</p>
                  </div>
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-white/70">
                    <dt>Coach</dt>
                    <dd className="font-bold text-white">Coach Nati</dd>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <dt>Customer</dt>
                    <dd className="font-bold text-white">{customer.name || '—'}</dd>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <dt>Payment</dt>
                    <dd className="font-bold text-white">{method}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                    <dt className="font-black text-white">Total</dt>
                    <dd className="font-black text-accent">{formatCurrency(plan.priceEtb)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[11px] font-semibold text-white/40">One-time payment for the full {plan.duration} program.</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-bold text-white/40">
                  <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> SSL secured</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Guarantee</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ---------- Step 9 — Success ---------- */}
          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-cta-gradient shadow-glow"
              >
                <Check className="h-12 w-12 text-primary" strokeWidth={3} />
              </motion.div>
              <h1 className="mt-8 text-4xl font-black tracking-tight text-content">Welcome to Coach Nati!</h1>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-content-muted">
                You're enrolled in <span className="font-black text-content">{plan.name}</span> for {plan.duration}.
                {isTransferLike && (
                  <span className="mt-2 block text-sm font-semibold text-warning">Payment pending manual confirmation — your plan activates once your transfer is verified.</span>
                )}
              </p>
              {paymentRef && <p className="mt-3 text-xs font-bold text-content-faint">Enrollment reference: {paymentRef}</p>}

              <div className="mt-8 space-y-3 text-left">
                {[
                  { icon: Sparkles, title: 'Plan confirmation', desc: `${plan.name} · ${plan.duration} · ${formatCurrency(plan.priceEtb)}` },
                  { icon: User, title: 'Profile created', desc: `Coach Nati will build your personalized ${plan.name.toLowerCase()} plan.` },
                  { icon: Mail, title: 'Next steps', desc: 'Check your email for a welcome message. Coach Nati reaches out within 24 hours to get you started.' },
                ].map((s) => (
                  <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-subtle/60 p-5 dark:bg-surface-subtle">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-primary dark:text-accent">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-black text-content">{s.title}</p>
                      <p className="text-sm text-content-muted">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface-subtle/60 p-5 text-left dark:bg-surface-subtle">
                <p className="text-xs font-black uppercase tracking-widest text-content-muted">Coach contact</p>
                <p className="mt-2 text-sm font-black text-content">Coach Nati</p>
                <p className="text-sm text-content-muted">hello@coachnati.com · WhatsApp +251 91 234 5678</p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="accent" size="lg" className="w-full">
                    <Sparkles className="h-5 w-5" /> Go to Client Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">Back to home</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}