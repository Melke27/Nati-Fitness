import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { registerUser, setSession } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { Button, Input } from '@/components/ui'
import { PROGRAMS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { AuthShell } from './AuthShell'

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { success, error } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) return error('Password too short', 'Use at least 6 characters.')
    if (form.password !== form.confirm) return error('Passwords do not match')
    setLoading(true)
    try {
      const userId = registerUser({ name: form.name, email: form.email, password: form.password, phone: form.phone })
      setSession({ userId, name: form.name, email: form.email, role: 'client' })
      success('Account created!', 'Let’s build your coaching profile — 2 minutes.')
      const goal = searchParams.get('goal')
      navigate(goal ? `/onboarding?goal=${encodeURIComponent(goal)}` : '/onboarding')
    } catch (err) {
      error('Registration failed', (err as Error).message)
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-content">Create your account</h1>
          <p className="mt-2 text-sm text-content-muted">2-minute signup. Free assessment. No card required.</p>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-surface-subtle/70 p-4 dark:bg-surface-subtle">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">Explore programs</p>
          <h2 className="mt-2 text-lg font-black text-content">Choose a path before you create your account</h2>
          <div className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {PROGRAMS.map((program) => (
              <div key={program.id} className="rounded-xl border border-border/70 bg-surface-card/80 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-content">{program.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-content-muted">{program.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                    {program.goal}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-content-muted">
                  <span>{program.duration}</span>
                  <span>{formatCurrency(program.price)}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input label="Full name" required autoComplete="name" placeholder="John Doe" value={form.name} onChange={set('name')} />
          <Input label="Email" type="email" required autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
          <Input label="Phone / WhatsApp (optional)" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set('phone')} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Password" type="password" required placeholder="Min. 6 chars" value={form.password} onChange={set('password')} />
            <Input label="Confirm" type="password" required placeholder="Repeat" value={form.confirm} onChange={set('confirm')} />
          </div>

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-content-muted">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded accent-[#E11D48]" />
            I agree to the <Link to="/contact" className="font-black text-accent-dark hover:underline dark:text-accent">Terms</Link> and <Link to="/contact" className="font-black text-accent-dark hover:underline dark:text-accent">Privacy Policy</Link>
          </label>

          <Button type="submit" variant="accent" size="lg" className="group w-full" loading={loading}>
            Create account <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </form>

        <div className="mt-6 space-y-2 rounded-2xl border border-border bg-surface-subtle/60 p-4 dark:bg-surface-subtle">
          {['Free body & health assessment', 'Personalized coaching profile', 'No card required to start'].map((b) => (
            <p key={b} className="flex items-center gap-2 text-xs font-bold text-content-muted">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-success/15 text-success"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
              {b}
            </p>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-content-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent">Sign in</Link>
        </p>

        <Link to="/" className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-content-faint transition hover:text-content">
          <Zap className="h-3.5 w-3.5" /> Back to Coach Nati
        </Link>
      </motion.div>
    </AuthShell>
  )
}
