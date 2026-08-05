import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Instagram, Youtube, Send, Twitter, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { addSubscriber } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui'

const QUICK_LINKS = [
  { label: 'About Coach Nati', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Programs', to: '/programs' },
  { label: 'Transformations', to: '/#transformations' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '/contact' },
]

const PROGRAM_LINKS = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Training',
  'Fat Burning',
  'Online Coaching',
  'Personal Training',
]

export function Footer() {
  const [email, setEmail] = useState('')
  const { success } = useToast()

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    addSubscriber(email)
    success('Subscribed!', 'You will get the weekly training & nutrition digest.')
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-shell relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <Zap className="h-6 w-6" fill="currentColor" />
              </span>
              <span className="text-xl font-black tracking-tight">
                Coach<span className="text-accent">Nati</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Train smart. Live strong. Become your best. Premium 1:1 coaching, online and in-person.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Send, label: 'Telegram' },
                { icon: Twitter, label: 'X / Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={SITE.socials.instagram}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  {l.to.includes('#') ? (
                    <a href={`/${l.to}`} className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-accent">
                      <ArrowRight className="h-3.5 w-3.5 text-accent/50 transition group-hover:translate-x-1 group-hover:text-accent" />
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-accent">
                      <ArrowRight className="h-3.5 w-3.5 text-accent/50 transition group-hover:translate-x-1 group-hover:text-accent" />
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">Programs</h3>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((p) => (
                <li key={p}>
                  <Link to="/programs" className="text-sm text-white/70 transition hover:text-accent">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Stay in the loop</h3>
            <p className="text-sm text-white/60">Weekly training tips, nutrition science and exclusive offers. No spam.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  className="h-12 w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                />
              </div>
              <Button type="submit" variant="accent" size="md" className="shrink-0">
                Join
              </Button>
            </form>
            <div className="space-y-2.5 text-sm text-white/60">
              <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-accent" /> {SITE.email}</p>
              <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent" /> {SITE.phone}</p>
              <p className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {SITE.address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Coach Nati. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link to="/" className="transition hover:text-accent">Privacy Policy</Link>
            <Link to="/" className="transition hover:text-accent">Terms of Service</Link>
            <Link to="/" className="transition hover:text-accent">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
