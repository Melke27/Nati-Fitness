import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Eye, EyeOff, Star } from 'lucide-react'
import { loginUser, setSession, getClientByUser } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { Button, Input } from '@/components/ui'
import { AuthShell } from './AuthShell'

export default function Login() {
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = loginUser(email, password)
      setSession({ userId: user.id, name: user.name, email: user.email, role: user.role })
      success(`Welcome back, ${user.name.split(' ')[0]}!`)
      if (user.role === 'admin') navigate('/admin')
      else {
        const client = getClientByUser(user.id)
        navigate(client?.status === 'onboarding' ? '/onboarding' : '/dashboard')
      }
    } catch (err) {
      error('Login failed', (err as Error).message)
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-8">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-[11px] font-black text-warning">
            <Star className="h-3 w-3" fill="currentColor" /> 5.0 rated coaching
          </span>
          <h1 className="text-3xl font-black tracking-tight text-content">Welcome back 👋</h1>
          <p className="mt-2 text-sm text-content-muted">Log in to continue your transformation.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" required autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[13px] font-bold text-content">Password</label>
            <div className="relative">
              <input
                id="password"
                type={show ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm text-content placeholder:text-content-faint transition-colors focus:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 dark:bg-surface-subtle"
              />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-content-faint transition hover:text-content">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <label className="flex items-center gap-2 text-content-muted">
              <input type="checkbox" className="h-4 w-4 rounded accent-[#7CFF4F]" defaultChecked /> Remember me
            </label>
            <Link to="/contact" className="text-accent-dark underline-offset-4 hover:underline dark:text-accent">Forgot password?</Link>
          </div>

          <Button type="submit" variant="accent" size="lg" className="group w-full" loading={loading}>
            Sign in <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </form>

        <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/5 p-4 text-center text-xs font-semibold text-content-muted">
          Demo accounts — <button onClick={() => { setEmail('sarah@demo.com'); setPassword('demo123') }} className="font-black text-accent-dark underline-offset-2 hover:underline dark:text-accent">client</button> ·{' '}
          <button onClick={() => { setEmail('admin@coachnati.com'); setPassword('admin123') }} className="font-black text-accent-dark underline-offset-2 hover:underline dark:text-accent">coach (admin)</button>
        </div>

        <p className="mt-6 text-center text-sm text-content-muted">
          New here?{' '}
          <Link to="/register" className="font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent">Create your free account</Link>
        </p>

        <Link to="/" className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-content-faint transition hover:text-content">
          <Zap className="h-3.5 w-3.5" /> Back to Coach Nati
        </Link>
      </motion.div>
    </AuthShell>
  )
}
