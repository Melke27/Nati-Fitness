import { Link } from 'react-router-dom'
import { Zap, Instagram, Youtube, Send, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '@/lib/constants'

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const PROGRAM_LINKS = [
  { label: 'All Programs', to: '/programs' },
  { label: 'Courses', to: '/courses' },
  { label: 'Templates', to: '/templates' },
  { label: 'Pricing', to: '/pricing' },
]

const SUPPORT_LINKS = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Services', to: '/services' },
  { label: 'Transformations', to: '/transformations' },
  { label: 'Become a Trainer', to: '/contact' },
]

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Send, label: 'Telegram' },
  { icon: Twitter, label: 'X / Twitter' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-white">
      <div className="container-shell">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Company */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-white">
                <Zap className="h-6 w-6" fill="currentColor" />
              </span>
              <span className="text-xl font-bold tracking-tight">
                Coach<span className="text-accent">Nati</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-content-muted">
              {SITE.tagline} Discover trainers, programs, and courses.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={SITE.socials.instagram}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border text-content-muted transition-all hover:border-accent hover:bg-accent hover:text-white"
                >
                  <s.icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-5 text-caption font-semibold uppercase tracking-widest text-content-faint">Programs</h3>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-content-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-caption font-semibold uppercase tracking-widest text-content-faint">Support</h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-content-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-content-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-caption font-semibold uppercase tracking-widest text-content-faint">Contact</h3>
            <div className="space-y-4 text-sm text-content-muted">
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phone}</a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                {SITE.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <p className="text-caption text-content-faint">© {new Date().getFullYear()} Coach Nati. All rights reserved.</p>
          <div className="flex items-center gap-6 text-caption text-content-faint">
            <Link to="/" className="transition-colors hover:text-accent">Privacy Policy</Link>
            <Link to="/" className="transition-colors hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
