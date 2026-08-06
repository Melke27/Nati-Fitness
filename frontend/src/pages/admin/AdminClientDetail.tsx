import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageSquare, Flame, Send, Phone, BadgeCheck, Check, Target } from 'lucide-react'
import { useDB, sendMessage } from '@/lib/store'
import { cn, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Badge, Card, Button, Input } from '@/components/ui'
import { ImgAvatar, Ring } from '@/components/trainer'
import { LineChart } from '@/components/charts'

export default function AdminClientDetail() {
  const { id } = useParams()
  const db = useDB()
  const { success } = useToast()
  const client = db.clients.find((c) => c.id === id)
  const [msg, setMsg] = useState('')

  if (!client) return <p className="text-content-muted">Client not found.</p>

  const program = db.programs.find((p) => p.id === client.programId)
  const plan = db.plans.find((p) => p.id === client.planId)
  const workouts = db.workouts.filter((w) => w.clientId === client.id)
  const goals = db.goals.filter((g) => g.clientId === client.id)
  const history = client.progress.filter((p) => p.weightKg).slice(-10)
  const first = history[0]?.weightKg ?? client.profile?.weightKg
  const last = history[history.length - 1]?.weightKg ?? client.profile?.weightKg
  const delta = first && last ? last - first : 0

  const send = () => {
    if (!msg.trim()) return
    sendMessage(client.id, 'coach', 'Coach Nati', msg.trim())
    success('Message sent to ' + client.name)
    setMsg('')
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link to="/admin/members" className="inline-flex items-center gap-2 text-sm font-bold text-content-muted transition hover:text-content">
        <ArrowLeft className="h-4 w-4" /> All members
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-white">
        <img src={client.avatar} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-[90px]" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ImgAvatar name={client.name} src={client.avatar} size="xl" />
            <div>
              <p className="flex items-center gap-2 text-lg font-black text-white">{client.name} <BadgeCheck className="h-4 w-4 text-success" /></p>
              <p className="text-sm text-white/60">{client.email} · {client.phone ?? 'no phone'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="accent">{program?.name ?? 'No program'}</Badge>
            <Badge variant="success">{plan?.name ?? '—'} plan</Badge>
            <a href={`https://wa.me/${client.phone?.replace(/\D/g, '') || ''}`} className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white" aria-label="Message on WhatsApp">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Joined', value: formatDate(client.joinedAt), accent: 'text-content' },
          { label: 'Current weight', value: last ? `${last.toFixed(1)} kg` : '—', accent: 'text-content' },
          { label: 'Total change', value: delta ? `${delta > 0 ? '+' : ''}${delta.toFixed(1)} kg` : '—', accent: delta < 0 ? 'text-success' : delta > 0 ? 'text-warning' : 'text-content' },
          { label: 'Workouts completed', value: String(workouts.length), accent: 'text-accent-dark dark:text-accent' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card hover>
              <p className="text-xs font-bold text-content-muted">{k.label}</p>
              <p className={cn('mt-1 text-xl font-black', k.accent)}>{k.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weight trend */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-black text-content">Weight trend</h2>
          {history.length >= 2 ? (
            <LineChart data={history.map((p) => ({ label: p.date.slice(5), value: p.weightKg ?? 0 }))} height={180} />
          ) : (
            <div className="grid h-40 place-items-center rounded-xl border border-dashed border-border text-sm text-content-faint">Not enough data yet</div>
          )}

          <h2 className="mb-3 mt-8 text-sm font-black text-content">Health profile</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {client.profile
              ? [
                  ['Age / Gender', `${client.profile.age} · ${client.profile.gender}`],
                  ['Height', `${client.profile.heightCm} cm`],
                  ['Level', client.profile.fitnessLevel],
                  ['Goal', client.profile.goal],
                  ['Training days', client.profile.trainingDays.join(', ')],
                  ['Equipment', client.profile.equipment.join(', ')],
                  ['Medical', client.profile.medicalConditions.join(', ')],
                  ['Target', client.profile.targetWeightKg ? `${client.profile.targetWeightKg} kg by ${formatDate(client.profile.targetDate ?? '')}` : '—'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-surface-subtle/60 p-4 dark:bg-surface-subtle">
                    <p className="text-[10px] font-black uppercase tracking-wider text-content-faint">{k}</p>
                    <p className="mt-0.5 text-sm font-bold text-content">{v}</p>
                  </div>
                ))
              : <p className="text-sm text-content-faint">Onboarding not completed yet.</p>}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-6">
          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-content"><MessageSquare className="h-4 w-4 text-accent-dark dark:text-accent" /> Send a message</h2>
            <div className="space-y-3">
              <div className="max-h-40 space-y-2 overflow-y-auto">
                {db.messages.filter((m) => m.clientId === client.id).slice(-4).map((m) => (
                  <div key={m.id} className={cn('rounded-xl border p-3 text-xs', m.sender === 'coach' ? 'border-accent/30 bg-accent/5' : 'border-border bg-surface-subtle/50 dark:bg-surface-subtle')}>
                    <p className="font-black text-content">{m.senderName}</p>
                    <p className="mt-0.5 text-content-muted">{m.text}</p>
                  </div>
                ))}
              </div>
              <Input placeholder="Type a message…" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
              <Button variant="accent" className="w-full" onClick={send} disabled={!msg.trim()}><Send className="h-4 w-4" /> Send</Button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-black text-content">Quick actions</h2>
            <div className="space-y-2">
              <Link to="/admin/assign" className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-black text-content transition hover:border-accent/50">
                Assign new workout <Check className="h-4 w-4 text-accent-dark dark:text-accent" />
              </Link>
              <Link to="/admin/assign" className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-black text-content transition hover:border-accent/50">
                Update meal plan <Check className="h-4 w-4 text-accent-dark dark:text-accent" />
              </Link>
              <button className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-black text-content transition hover:border-accent/50">
                Schedule check-in <Flame className="h-4 w-4 text-warning" />
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-content"><Target className="h-4 w-4 text-warning" /> Active goals</h2>
            <div className="space-y-3">
              {goals.length === 0 && <p className="py-2 text-center text-xs text-content-faint">No goals assigned yet</p>}
              {goals.slice(0, 3).map((g) => (
                <div key={g.id} className="flex items-center gap-3 rounded-xl bg-surface-subtle/60 p-3 dark:bg-surface-subtle">
                  <Ring value={g.progress} size={40} stroke={4} color={g.status === 'achieved' ? '#22C55E' : g.status === 'at-risk' ? '#EF4444' : '#E11D48'} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black text-content">{g.title}</p>
                    <p className="text-[10px] text-content-muted">{g.target} · {formatDate(g.deadline)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-black text-content">Recent activity</h2>
            <div className="space-y-2 text-xs">
              {workouts.slice(-4).reverse().map((w) => (
                <div key={w.id} className="flex items-center justify-between rounded-xl bg-surface-subtle/60 px-3 py-2.5 dark:bg-surface-subtle">
                  <span className="font-bold text-content">{w.name}</span>
                  <span className="text-content-faint">{w.date}</span>
                </div>
              ))}
              {workouts.length === 0 && <p className="py-4 text-center text-content-faint">No workouts yet</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
