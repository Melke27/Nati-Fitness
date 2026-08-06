import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { addAppointment } from '@/lib/store'
import { useToast } from '@/context/ToastContext'
import { SectionHeading, Input, Textarea, Select, Button } from '@/components/ui'
import { Reveal } from '@/components/motion'

export function ContactSection() {
  const { success } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', type: 'Free Consultation', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    addAppointment(form)
    success('Request received!', 'Coach Nati will confirm your consultation within 24 hours.')
    setSent(true)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-surface-subtle">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's start your <span className="text-gradient-accent">transformation</span> today</>}
          description="Book a free 15-minute consultation. No pressure, no obligation — just a plan for your goals."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <Reveal dir="right">
            <div className="rounded-2xl border border-border bg-surface-card p-8 shadow-card">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-cta-gradient text-4xl text-primary shadow-glow"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-2xl font-black text-content">You're booked in!</h3>
                  <p className="mt-2 max-w-sm text-sm text-content-muted">
                    Check your email for confirmation. Coach Nati will reach out shortly to finalize your consultation slot.
                  </p>
                  <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
                    Book another
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" required placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Input label="Email" type="email" required placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input label="Phone / WhatsApp" required placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Select label="Service" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {['Free Consultation', 'Personal Training', 'Online Coaching', 'Meal Plan', 'Strength Coaching', 'Women’s Fitness'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                  <Input label="Preferred date" type="date" min={today} required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <Select label="Preferred time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                    {['Morning (8–12)', 'Afternoon (12–16)', 'Evening (16–20)', 'Anytime'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                  <div className="sm:col-span-2">
                    <Textarea label="Your goal" rows={4} placeholder="Tell me where you are and where you want to be…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      Book my free consultation
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: MessageCircle, title: 'WhatsApp', value: SITE.phone, sub: 'Fastest response — within minutes', href: `https://wa.me/${SITE.whatsapp}` },
              { icon: Mail, title: 'Email', value: SITE.email, sub: 'For documents & detailed questions', href: `mailto:${SITE.email}` },
              { icon: Phone, title: 'Phone', value: SITE.phone, sub: 'Mon–Fri, 9am–6pm', href: `tel:${SITE.phone}` },
              { icon: MapPin, title: 'Studio', value: SITE.address, sub: 'In-person training by appointment' },
            ].map((c, i) => (
              <Reveal key={c.title} dir="left" delay={i * 0.07}>
                <a
                  href={c.href}
                  target={c.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-content">{c.title}</p>
                    <p className="truncate text-sm font-semibold text-content-muted">{c.value}</p>
                    <p className="truncate text-xs text-content-faint">{c.sub}</p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal dir="left" delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-card p-6">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="relative flex items-center gap-3">
                  <span className="relative grid h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
                  </span>
                  <p className="text-sm font-black text-content">Currently accepting new clients</p>
                </div>
                <p className="relative mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-content-muted">
                  <Clock className="h-3.5 w-3.5" /> Only 3 coaching spots left this month
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
