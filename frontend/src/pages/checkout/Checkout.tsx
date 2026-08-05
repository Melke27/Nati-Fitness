import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Lock, ShieldCheck, CreditCard, Landmark, Smartphone, Ticket, Sparkles } from 'lucide-react'
import { useDB, getSession, addPayment, applyCoupon, type PaymentMethod } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

const METHODS: { id: PaymentMethod; icon: typeof CreditCard }[] = [
  { id: 'Card', icon: CreditCard },
  { id: 'Bank Transfer', icon: Landmark },
  { id: 'Mobile Money', icon: Smartphone },
]

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

  const plan = db.plans.find((p) => p.id === planId) ?? db.plans[1]
  const program = db.programs.find((p) => p.id === programId)

  const [method, setMethod] = useState<PaymentMethod>('Card')
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<null | { code: string; pct: number }>(null)
  const [processing, setProcessing] = useState(false)

  const months = cycle === 'monthly' ? 1 : cycle === 'quarterly' ? 3 : 12
  const priceFor = plan[cycle]
  const subtotal = priceFor * months
  const discount = applied ? Math.round((subtotal * applied.pct) / 100) : 0
  const total = subtotal - discount

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
    setTimeout(() => {
      const payment = addPayment({
        clientId: `client_${session.userId}`,
        clientName: session.name,
        amount: total,
        plan: plan.name,
        program: program?.name ?? 'Coaching',
        method,
      })
      success('Payment successful! 🎉', 'Welcome to your coaching journey.')
      navigate(`/checkout/success?ref=${payment.reference}`)
    }, 1200)
  }

  return (
    <div className="relative min-h-screen bg-surface pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-5xl">
        <Link to="/#pricing" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-content-muted transition hover:text-content">
          ← Back to pricing
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left — form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-content">Checkout</h1>
              <p className="mt-1 text-sm text-content-muted">Secure checkout. Your plan activates immediately after payment.</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-sm font-black text-primary dark:text-accent">1</span>
                <h2 className="font-black text-content">Payment method</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border py-5 text-xs font-bold transition-all',
                      method === m.id ? 'border-accent bg-accent/10 text-content shadow-glow' : 'border-border text-content-muted hover:border-accent/40',
                    )}
                  >
                    <m.icon className="h-5 w-5" />
                    {m.id}
                  </button>
                ))}
              </div>

              {method === 'Card' && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Input label="Cardholder name" placeholder="John Doe" className="sm:col-span-2" />
                  <Input label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Expiry" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                </div>
              )}
              {method === 'Mobile Money' && <Input label="Mobile money number" placeholder="+1 555 000 0000" className="mt-4" />}
              {method === 'Bank Transfer' && (
                <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-semibold text-content-muted">
                  Transfer to <span className="font-black text-content">Coach Nati · Bank of Addis · #1234 5678 90</span>. Your plan
                  activates within 4 business hours.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-sm font-black text-primary dark:text-accent">2</span>
                <h2 className="font-black text-content">Promo code</h2>
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

            <div className="flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5">
              <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
              <p className="text-xs leading-relaxed text-content-muted">
                <span className="font-black text-content">14-day money-back guarantee.</span> If you're not satisfied with your first
                month, request a full refund. No questions asked.
              </p>
            </div>
          </motion.div>

          {/* Right — summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="rounded-2xl border border-border bg-primary p-6 text-white lg:sticky lg:top-28">
              <h2 className="font-black text-white">Order summary</h2>

              <div className="mt-5 flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-xl">{program?.icon ? <span className="text-accent">◆</span> : <span className="text-accent">◆</span>}</div>
                <div>
                  <p className="font-black text-white">{program?.name ?? 'Premium Coaching'}</p>
                  <p className="text-xs text-white/50">{plan.name} plan · {cycle} billing</p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <dt>{plan.name} · {months} month{months > 1 ? 's' : ''}</dt>
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
                Billed {cycle}. Cancel anytime. Auto-renew for yearly is off by default.
              </p>

              <Button variant="accent" size="lg" className="group mt-6 w-full" onClick={pay} loading={processing}>
                {processing ? 'Processing…' : 'Pay securely'}
                {!processing && <Lock className="h-4 w-4" />}
              </Button>

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
