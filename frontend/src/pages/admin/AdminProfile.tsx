import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRound, BadgeCheck, Star, Globe, Mail, Phone, MapPin, Instagram, Youtube, Twitter, Pencil, Check } from 'lucide-react'
import { PageHeader, Glass, MiniBar } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { AVATARS, MEDIA } from '@/lib/media'

const STATS = [
  { label: 'Members coached', value: '120+' },
  { label: 'Years experience', value: '7' },
  { label: 'Avg. rating', value: '4.9' },
  { label: 'Transformations', value: '300+' },
]

export default function AdminProfile() {
  const toast = useToast()
  const [about, setAbout] = useState('Strength & nutrition coach on a mission to help ambitious people build unbreakable physiques and habits. I blend progressive programming with accountability so results actually stick.')

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader title="Trainer Profile" sub="Your public coach identity" icon={<UserRound className="h-5 w-5" />} actions={<Button variant="accent" size="md" onClick={() => toast?.success('Profile saved')}><Check className="h-4 w-4" /> Save changes</Button>} />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-white">
        <img src={MEDIA.coach} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative flex flex-wrap items-center gap-6">
          <img src={AVATARS.coach} alt="Coach Nati" className="h-24 w-24 rounded-3xl object-cover ring-4 ring-accent/50" />
          <div className="flex-1">
            <p className="flex items-center gap-2 text-lg font-black text-white">Coach Nati <BadgeCheck className="h-5 w-5 text-accent" /></p>
            <p className="text-sm text-white/60">Certified Strength & Conditioning Coach · Online coach</p>
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 text-accent" fill="currentColor" />)}
              <span className="ml-1 text-xs font-black text-accent">4.9</span>
              <span className="ml-1 text-xs text-white/50">· 87 reviews</span>
            </div>
          </div>
          <div className="flex gap-2">
            {[Instagram, Youtube, Twitter, Globe].map((Icon, i) => (
              <span key={i} className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-accent hover:text-accent" onClick={() => toast?.success('Link copied')}>
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Glass className="p-4 text-center">
              <p className="text-2xl font-black text-content">{s.value}</p>
              <p className="text-xs font-bold text-content-muted">{s.label}</p>
            </Glass>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Glass className="p-6">
          <h2 className="mb-3 flex items-center justify-between text-sm font-black text-content">
            About
            <button onClick={() => toast?.success('Editing enabled')} className="grid h-8 w-8 place-items-center rounded-full border border-border text-content-muted hover:text-content" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
          </h2>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
          <div className="mt-4 space-y-2.5 text-sm">
            {[
              { icon: Mail, text: 'coach@coachnati.com' },
              { icon: Phone, text: '+1 555 010 2030' },
              { icon: MapPin, text: 'Addis Ababa · Worldwide (online)' },
              { icon: Globe, text: 'coachnati.com' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-content-muted">
                <row.icon className="h-4 w-4 text-accent-dark dark:text-accent" />
                <span className="font-bold">{row.text}</span>
              </div>
            ))}
          </div>
        </Glass>

        <div className="space-y-6">
          <Glass className="p-6">
            <h2 className="mb-4 text-sm font-black text-content">Credentials & skills</h2>
            <div className="mb-5 flex flex-wrap gap-2">
              {['CSCS', 'NSCA-CPT', 'Precision Nutrition L1', 'NASM Certified'].map((c) => (
                <span key={c} className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-black text-accent-dark dark:text-accent">
                  <BadgeCheck className="h-3.5 w-3.5" /> {c}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {[{ label: 'Strength programming', v: 95 }, { label: 'Nutrition coaching', v: 90 }, { label: 'Mobility & recovery', v: 80 }, { label: 'Cardio conditioning', v: 85 }].map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex justify-between text-xs font-bold"><span className="text-content">{s.label}</span><span className="text-content-faint">{s.v}%</span></div>
                  <MiniBar value={s.v} />
                </div>
              ))}
            </div>
          </Glass>

          <Glass className="p-6">
            <h2 className="mb-4 text-sm font-black text-content">Specialty programs</h2>
            <div className="space-y-2">
              {['Summer Shred 12-week', 'Lean Muscle Blueprint', 'Online Coaching — 1:1', 'Corporate Wellness'].map((p) => (
                <div key={p} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                  <span className="text-sm font-black text-content">{p}</span>
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-[9px] font-black text-success">ACTIVE</span>
                </div>
              ))}
            </div>
          </Glass>
        </div>
      </div>
    </div>
  )
}
