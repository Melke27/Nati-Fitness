import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, ShieldCheck, CreditCard, Landmark, Smartphone, Ticket, Sparkles, Upload, ChevronLeft, ArrowRight } from 'lucide-react'
import { useDB, getSession, addPayment, addMemberRequest, applyCoupon, type PaymentMethod } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { RECOMMENDED_PLANS } from '@/lib/planFinderData'
import { useToast } from '@/context/ToastContext'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

const METHODS: { id: PaymentMethod; icon: typeof CreditCard; label: string; desc: string }[] = [
  { id: 'Card', icon: CreditCard, label: 'Card', desc: 'Visa · Mastercard' },
  { id: 'CBE', icon: Landmark, label: 'CBE', desc: 'Bank transfer + screenshot' },
  { id: 'Telebirr', icon: Smartphone, label: 'Telebirr', desc: 'Mobile money + screenshot' },
  { id: 'Bank Transfer', icon: Landmark, label: 'Bank transfer', desc: 'Manual transfer' },
  { id: 'Mobile Money', icon: Smartphone, label: 'Mobile money', desc: 'MoMo / M-Pesa' },
]

const STEPS = ['Payment method', 'Payment details', 'Review & pay']

type Cycle = 'monthly' | 'quarterly' | 'yearly'

export default function Checkout() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const db = useDB()
  const { success, error } = useToast()
  const session = getSession()

  const planId = params.get('plan') ?? 'pro'
  const programId = params.get('program')
  const cycle = (params.get('cycle') ?? 'quarterly') as Cycle

  const offerId = params.get('offer')
  const offerPlan = offerId ? RECOMMENDED_PLANS[offerId] : undefined
  const isOffer = !!offerPlan

  const plan = db.plans.find((p) => p.id === planId) ?? db.plans[1]
  const program = db.programs.find((p) => p.id === programId)

  const [step, setStep] = useState(0)
  const [method, setMethod] = useState<PaymentMethod>('Card')
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' })
  const [ref, setRef] = useState({ value: '', phone: '', screenshot: '' })
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<null | { code: string; pct: number }>(null)
  const [processing, setProcessing] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // In "offer" mode we sell the Coach Nati recommended plan at a fixed one-time
  // price for its listed duration. Otherwise we use the classic billing tiers.
  const priceFor = isOffer ? offerPlan.priceEtb : plan[cycle]
  const months = isOffer ? 1 : cycle === 'monthly' ? 1 : cycle === 'quarterly' ? 3 : 12
  const subtotal = priceFor * months
  const discount = applied ? Math.round((subtotal * applied.pct) / 100) : 0
  const total = subtotal - discount

  const orderProgram = isOffer ? offerPlan.name : (program?.name ?? 'Premium Coaching')
  const orderPlanLabel = isOffer ? `Coach Nati · ${offerPlan?.name} · ${offerPlan?.duration ?? ''}` : `${plan.name} · ${cycle}`

  const isTransferLike = method === 'CBE' || method === 'Telebirr' || method === 'Bank Transfer' || method === 'Mobile Money'

  const methodValid =
    method === 'Card'
      ? card.name.trim() && card.number.replace(/\s/g, '').length >= 12 && card.expiry.trim() && card.cvc.trim().length >= 3
      : ref.value.trim().length > 3

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return methodValid
    return true
  }

  const next = () => {
    if (step === STEPS.length - 1) return pay()
    setStep((s) => s + 1)
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setRef((r) => ({ ...r, screenshot: reader.result as string }))
    reader.readAsDataURL(f)
  }

  const apply = () => {
    try {
      const pct = applyCoupon(code.trim())
      setApplied({ code: code.trim().toUpperCase(), pct })
      success('Coupon applied!', `${pct}% discount added.`)
    } catch (e) {
      error('Coupon error', (e as Error).message)
    }
  }

  const pay = () => {
    if (!session) return navigate('/login')
    setProcessing(true)
    // Card uses a demo gateway (no real charge). All manual-transfer methods are
    // recorded as PENDING and only become active once Coach Nati confirms the money.
    const pending = isTransferLike
    const status = pending ? ('pending' as const) : ('paid' as const)
    setTimeout(() => {
      const clientId = `client_${session.userId}`
      const payment = addPayment({
        clientId,
        clientName: session.name,
        amount: total,
        plan: orderPlanLabel,
        program: orderProgram,
        method,
        paymentRef: isTransferLike ? ref.value : undefined,
        status,
      })
      addMemberRequest({
        clientId,
        userId: session.userId,
        name: session.name,
        email: session.email,
        plan: orderPlanLabel,
        program: orderProgram,
        amount: total,
        method,
        reference: isTransferLike ? ref.value : undefined,
        status: pending ? 'pending' : 'approved',
      })
      if (pending) {
        success('Payment received for review', 'Your plan will activate once your transfer is confirmed.')
        navigate(`/checkout/success?ref=${payment.reference}&pending=1`)
      } else {
        success('Payment successful! 🎉', 'Welcome to your coaching journey.')
        navigate(`/checkout/success?ref=${payment.reference}`)
      }
    }, 1200)
  }

  return (
    <div className="relative min-h-screen bg-surface pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-5xl">
        <Link to="/pricing" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-content-muted transition hover:text-content">
          <ChevronLeft className="h-4 w-4" /> Back to pricing
        </Link>

        {/* Stepper */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight text-content">Secure checkout</h1>
            <span className="text-xs font-bold text-content-muted">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-cta-gradient"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="mt-4 flex gap-3">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={cn(
                  'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-black transition-colors',
                  i <= step ? 'bg-accent/15 text-primary dark:text-accent' : 'bg-surface-subtle text-content-faint dark:bg-surface-subtle',
                )}
              >
                <span className={cn('grid h-5 w-5 place-items-center rounded-full', i < step ? 'bg-accent text-white' : i === step ? 'bg-accent/25' : 'bg-border')}>
                  {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : <span>{i + 1}</span>}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left — wizard */}
          <motion.div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                    <h2 className="mb-1 font-black text-content">Choose your payment method</h2>
                    <p className="mb-5 text-xs font-semibold text-content-muted">Your plan activates immediately after payment.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {METHODS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => { setMethod(m.id); setRef({ value: '', phone: '', screenshot: '' }) }}
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
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                      <h2 className="mb-4 font-black text-content">Payment details</h2>

                      {method === 'Card' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Input label="Cardholder name" placeholder="John Doe" className="sm:col-span-2" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                          <Input label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" className="sm:col-span-2" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                          <Input label="Expiry" placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                          <Input label="CVC" placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                        </div>
                      )}

                      {(method === 'CBE' || method === 'Telebirr' || method === 'Bank Transfer' || method === 'Mobile Money') && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-xs font-semibold text-content-muted">
                            {method === 'CBE' && <>Transfer to <span className="font-black text-content">Coach Nati · CBE · #1000 2030 4050</span>, then add your reference number and upload the payment screenshot below.</>}
                            {method === 'Telebirr' && <>Pay <span className="font-black text-content">Coach Nati · 0911 234 567</span> on Telebirr, then add your reference number and upload the payment screenshot below.</>}
                            {method === 'Bank Transfer' && <>Transfer to <span className="font-black text-content">Coach Nati · Bank of Addis · #1234 5678 90</span>. Your plan activates within 4 business hours.</>}
                            {method === 'Mobile Money' && <>Pay <span className="font-black text-content">Coach Nati · 0911 234 567</span> on mobile money, then add your reference number below.</>}
                          </div>

                          {(method === 'Telebirr' || method === 'Mobile Money') && (
                            <Input label="Phone number" type="tel" placeholder="0911 234 567" value={ref.phone} onChange={(e) => setRef({ ...ref, phone: e.target.value })} />
                          )}

                          {(method === 'CBE' || method === 'Telebirr' || method === 'Bank Transfer' || method === 'Mobile Money') && (
                            <Input label={method === 'CBE' ? 'CBE reference number' : 'Transaction reference number'} placeholder="Enter transaction reference" value={ref.value} onChange={(e) => setRef({ ...ref, value: e.target.value })} />
                          )}

                          {(method === 'CBE' || method === 'Telebirr') && (
                            <div>
                              <label className="mb-2 block text-sm font-black text-content">Payment screenshot</label>
                              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                              {ref.screenshot ? (
                                <div className="flex items-center gap-4 rounded-xl border border-border p-3">
                                  <img src={ref.screenshot} alt="Payment screenshot" className="h-16 w-16 rounded-lg border border-border object-cover" />
                                  <div className="flex-1">
                                    <p className="text-xs font-black text-content">Screenshot added</p>
                                    <p className="text-[11px] font-semibold text-content-faint">Confirming your payment manually.</p>
                                  </div>
                                  <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>Replace</Button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => fileRef.current?.click()}
                                  className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border px-4 py-6 text-content-faint transition hover:border-accent hover:text-accent"
                                >
                                  <Upload className="h-6 w-6" />
                                  <span className="text-xs font-bold">Upload payment screenshot (PNG / JPG)</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-accent-dark dark:text-accent" />
                          <h3 className="text-sm font-black text-content">Promo code</h3>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="e.g. WELCOME10" value={code} onChange={(e) => setCode(e.target.value)} className="uppercase" disabled={!!applied} />
                          <Button variant="outline" size="md" onClick={apply} disabled={!!applied || !code}>
                            {applied ? 'Applied' : 'Apply'}
                          </Button>
                        </div>
                        {applied && (
                          <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-success">
                            <Ticket className="h-3.5 w-3.5" /> {applied.code} · {applied.pct}% off applied
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
                      <h2 className="mb-4 font-black text-content">Review your order</h2>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between text-content-muted">
                          <dt>Program</dt>
                          <dd className="font-black text-content">{orderProgram}</dd>
                        </div>
                        <div className="flex justify-between text-content-muted">
                          <dt>Plan</dt>
                          <dd className="font-black text-content">{orderPlanLabel}</dd>
                        </div>
                        <div className="flex justify-between text-content-muted">
                          <dt>Payment method</dt>
                          <dd className="font-black text-content">{method}</dd>
                        </div>
                        {isTransferLike && (
                          <div className="flex justify-between text-content-muted">
                            <dt>Reference</dt>
                            <dd className="font-black text-content">{ref.value || '—'}</dd>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-border pt-3 text-content-muted">
                          <dt>Subtotal</dt>
                          <dd className="font-black text-content">{formatCurrency(subtotal)}</dd>
                        </div>
                        {applied && (
                          <div className="flex justify-between text-success">
                            <dt>Coupon ({applied.code})</dt>
                            <dd className="font-black">−{formatCurrency(discount)}</dd>
                          </div>
                        )}
                        <div className="flex justify-between text-base">
                          <dt className="font-black text-content">Total today</dt>
                          <dd className="font-black text-accent-dark dark:text-accent">{formatCurrency(total)}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5">
                      <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
                      <p className="text-xs leading-relaxed text-content-muted">
                        <span className="font-black text-content">14-day money-back guarantee.</span> If you're not satisfied with your first
                        month, request a full refund. No questions asked.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Wizard nav */}
            <div className="flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="opacity-80">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button variant="accent" size="lg" onClick={next} disabled={!canNext()} className="group">
                {step === STEPS.length - 1
                  ? processing
                    ? 'Processing…'
                    : isTransferLike
                      ? 'Submit for confirmation'
                      : 'Pay securely'
                  : 'Continue'}
                {step === STEPS.length - 1 && !processing && <Lock className="h-4 w-4" />}
                {step < STEPS.length - 1 && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
              </Button>
            </div>
          </motion.div>

          {/* Right — summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="rounded-2xl border border-border bg-primary p-6 text-white lg:sticky lg:top-28">
              <h2 className="font-black text-white">Order summary</h2>

              <div className="mt-5 flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/20 text-xl text-accent">◆</div>
                <div>
                  <p className="font-black text-white">{orderProgram}</p>
                  <p className="text-xs text-white/50">{orderPlanLabel}</p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <dt>{orderPlanLabel}</dt>
                  <dd className="font-bold text-white">{formatCurrency(subtotal)}</dd>
                </div>
                {applied && (
                  <div className="flex justify-between text-success">
                    <dt>Coupon ({applied.code})</dt>
                    <dd className="font-bold">−{formatCurrency(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                  <dt className="font-black text-white">Total today</dt>
                  <dd className="font-black text-accent">{formatCurrency(total)}</dd>
                </div>
              </dl>

              <p className="mt-2 text-[11px] font-semibold text-white/40">
                {isOffer ? `One-time payment for your ${orderProgram} plan.` : `Billed ${cycle}. Cancel anytime. Auto-renew for yearly is off by default.`}
              </p>

              <div className="mt-5 flex items-center justify-center gap-5 text-[11px] font-bold text-white/40">
                <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> SSL secured</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Guarantee</span>
                <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> Instant access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function SummaryCheck({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-content">
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-success/15 text-success"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
          {i}
        </li>
      ))}
    </ul>
  )
}
