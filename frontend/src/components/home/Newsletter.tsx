import { useState } from 'react'
import { Send, Mail, Check } from 'lucide-react'
import { addSubscriber } from '@/lib/store'
import { useToast } from '@/context/ToastContext'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const { success } = useToast()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    addSubscriber(email)
    success('Subscribed!', 'Check your inbox for a welcome gift.')
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-3xl border border-success/30 bg-success/10 px-8 py-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-success text-white"><Check className="h-5 w-5" /></span>
        <div>
          <p className="font-black text-content">You're in! 🎉</p>
          <p className="text-sm text-content-muted">Your free workout guide is on its way.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-card p-8 sm:p-10">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-[80px]" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h3 className="text-2xl font-black text-content">Get the free <span className="text-gradient-accent">Transformation Starter Kit</span></h3>
          <p className="mt-2 text-sm leading-relaxed text-content-muted">
            Join 5,000+ subscribers. Weekly training science, nutrition hacks and a free 4-week starter workout guide on signup.
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="input-base h-14 rounded-xl pl-11"
            />
          </div>
          <button
            type="submit"
            className="group flex shrink-0 items-center gap-2 rounded-xl bg-cta-gradient px-6 py-4 text-sm font-semibold text-primary shadow-glow transition-all duration-300 hover:bg-cta-gradient-hover active:scale-[0.98]"
          >
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Send me it
          </button>
        </form>
      </div>
    </div>
  )
}
