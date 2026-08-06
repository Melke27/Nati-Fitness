import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Video, VideoOff, Mic, MicOff, MonitorUp, MonitorOff, Square, Phone,
  Users, Clock, CalendarPlus, Settings, MessageSquare, Maximize2, Hand,
  Camera, Volume2, Circle, ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader, Glass, ImgAvatar, EmptyState } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useDB } from '@/lib/store'
import { MEDIA } from '@/lib/media'
import { cn } from '@/lib/utils'

type Session = {
  id: string
  client: string
  avatar: string
  date: string
  time: string
  duration: string
  type: '1:1' | 'group'
  status: 'upcoming' | 'completed' | 'recording'
}

const SESSIONS: Session[] = [
  { id: 'ls1', client: 'Sarah M.', avatar: MEDIA.womanFit, date: 'Today', time: '10:00', duration: '45 min', type: '1:1', status: 'upcoming' },
  { id: 'ls2', client: 'David K.', avatar: MEDIA.trainer, date: 'Today', time: '14:30', duration: '30 min', type: '1:1', status: 'upcoming' },
  { id: 'ls3', client: 'Group — Strength', avatar: MEDIA.group, date: 'Today', time: '18:00', duration: '60 min', type: 'group', status: 'upcoming' },
  { id: 'ls4', client: 'Hanna T.', avatar: MEDIA.womanFit2, date: 'Yesterday', time: '09:00', duration: '45 min', type: '1:1', status: 'recording' },
  { id: 'ls5', client: 'Michael R.', avatar: MEDIA.deadlift, date: 'Yesterday', time: '11:00', duration: '30 min', type: '1:1', status: 'completed' },
  { id: 'ls6', client: 'Lily A.', avatar: MEDIA.runWoman, date: 'Mon', time: '10:00', duration: '45 min', type: '1:1', status: 'completed' },
]

const RECORDINGS = [
  { id: 'r1', title: 'Upper Body Strength — Sarah', date: 'Aug 5', duration: '42:18', size: '1.2 GB' },
  { id: 'r2', title: 'HIIT Cardio — Group Class', date: 'Aug 4', duration: '58:30', size: '2.1 GB' },
  { id: 'r3', title: 'Mobility Flow — Hanna', date: 'Aug 3', duration: '35:05', size: '890 MB' },
]

export default function AdminLiveCoaching() {
  const [active, setActive] = useState<'sessions' | 'recordings' | 'live'>('sessions')

  return (
    <div>
      <PageHeader
        title="Live Coaching"
        sub="Host video sessions, share your screen, and record for your clients."
        icon={<Video className="h-6 w-6" />}
        actions={
          <Button variant="accent" size="sm" className="group" onClick={() => setActive('live')}>
            <Video className="h-4 w-4" /> New Session
          </Button>
        }
      />

      <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
        {(['sessions', 'recordings', 'live'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              'relative rounded-full px-5 py-2 text-xs font-black capitalize transition-colors',
              active === t ? 'text-primary' : 'text-content-muted hover:text-content',
            )}
          >
            {active === t && <motion.span layoutId="lc-pill" className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{t === 'live' ? 'Start Live' : t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active === 'live' && <LiveStudio key="live" onClose={() => setActive('sessions')} />}
        {active === 'sessions' && <SessionsList key="sessions" />}
        {active === 'recordings' && <RecordingsList key="recordings" />}
      </AnimatePresence>
    </div>
  )
}

function LiveStudio({ onClose }: { onClose: () => void }) {
  const db = useDB()
  const [mic, setMic] = useState(true)
  const [cam, setCam] = useState(true)
  const [screen, setScreen] = useState(false)
  const [rec, setRec] = useState(false)
  const [hand, setHand] = useState(false)
  const client = db.clients[0]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Stage */}
        <Glass className="overflow-hidden">
          <div className="relative aspect-video bg-[#0a0a0a]">
            {cam ? (
              <img src={MEDIA.gym} alt="Live session" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center">
                <VideoOff className="h-16 w-16 text-content-faint" />
              </div>
            )}

            {/* Recording indicator */}
            {rec && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-error/90 px-3 py-1.5 text-xs font-black text-white">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-white" />
                REC
              </motion.div>
            )}

            {/* Client PIP */}
            <div className="absolute bottom-5 right-5 h-28 w-40 overflow-hidden rounded-xl border-2 border-white/20 shadow-lift">
              <img src={client?.avatar ?? MEDIA.womanFit} alt={client?.name} className="h-full w-full object-cover" />
              <span className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white drop-shadow">{client?.name ?? 'Client'}</span>
            </div>

            {/* Hand raised */}
            {hand && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-warning/90 px-3 py-1.5 text-xs font-black text-white">
                <Hand className="h-3.5 w-3.5" /> Hand raised
              </motion.div>
            )}

            {/* Screen share badge */}
            {screen && (
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-accent/90 px-3 py-1.5 text-xs font-black text-primary">
                <MonitorUp className="h-3.5 w-3.5" /> Sharing screen
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-2">
              <CtrlBtn icon={mic ? Mic : MicOff} active={mic} onClick={() => setMic(!mic)} />
              <CtrlBtn icon={cam ? Video : VideoOff} active={cam} onClick={() => setCam(!cam)} />
              <CtrlBtn icon={screen ? MonitorOff : MonitorUp} active={screen} onClick={() => setScreen(!screen)} />
              <CtrlBtn icon={hand ? Hand : Hand} active={hand} onClick={() => setHand(!hand)} variant="warning" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setRec(!rec)} className={cn('flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition', rec ? 'bg-error text-white' : 'border border-border text-content-muted hover:text-content')}>
                {rec ? <Square className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                {rec ? 'Stop' : 'Record'}
              </button>
              <button onClick={onClose} className="flex items-center gap-2 rounded-full bg-error px-5 py-2.5 text-xs font-black text-white transition hover:bg-error/80">
                <Phone className="h-3.5 w-3.5 rotate-[135deg]" /> End
              </button>
            </div>
          </div>
        </Glass>

        {/* Side panel */}
        <div className="space-y-4">
          <Glass className="p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-content-faint">Session info</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-content-muted"><Users className="h-4 w-4 text-accent" /> <span className="text-content">1:1 with {client?.name ?? 'Client'}</span></div>
              <div className="flex items-center gap-3 text-content-muted"><Clock className="h-4 w-4 text-accent" /> <span className="text-content">45 min session</span></div>
              <div className="flex items-center gap-3 text-content-muted"><Video className="h-4 w-4 text-accent" /> <span className="text-content">HD 1080p</span></div>
              <div className="flex items-center gap-3 text-content-muted"><Volume2 className="h-4 w-4 text-accent" /> <span className="text-content">Audio active</span></div>
            </div>
          </Glass>

          <Glass className="p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-content-faint">Quick tools</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Camera, label: 'Snapshot' },
                { icon: Maximize2, label: 'Fullscreen' },
                { icon: MessageSquare, label: 'Chat' },
                { icon: Settings, label: 'Settings' },
              ].map((t) => (
                <button key={t.label} className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-bold text-content-muted transition hover:border-accent/40 hover:text-content">
                  <t.icon className="h-4 w-4 text-accent" /> {t.label}
                </button>
              ))}
            </div>
          </Glass>
        </div>
      </div>
    </motion.div>
  )
}

function CtrlBtn({ icon: Icon, active, onClick, variant = 'default' }: { icon: typeof Mic; active: boolean; onClick: () => void; variant?: 'default' | 'warning' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'grid h-11 w-11 place-items-center rounded-full border transition',
        active
          ? variant === 'warning' ? 'border-warning/40 bg-warning/15 text-warning' : 'border-accent/40 bg-accent/15 text-accent'
          : 'border-border bg-surface text-content-muted hover:text-content',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function SessionsList() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')
  const list = filter === 'all' ? SESSIONS : SESSIONS.filter((s) => s.status === filter || (filter === 'upcoming' && s.status === 'recording'))

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          {(['all', 'upcoming', 'completed'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full px-4 py-1.5 text-xs font-black capitalize transition', filter === f ? 'bg-cta-gradient text-primary' : 'text-content-muted hover:text-content')}>{f}</button>
          ))}
        </div>
        <Link to="/admin/schedule" className="flex items-center gap-1 text-xs font-black text-accent-dark hover:underline dark:text-accent">
          <CalendarPlus className="h-3.5 w-3.5" /> Schedule new
        </Link>
      </div>

      {list.length === 0 ? (
        <EmptyState title="No sessions" sub="Schedule a live coaching session to get started." icon={<Video className="h-6 w-6" />} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Glass key={s.id} hover className="p-5">
              <div className="flex items-center gap-3">
                <ImgAvatar name={s.client} src={s.avatar} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-content">{s.client}</p>
                  <p className="text-[11px] font-semibold text-content-muted">{s.type === 'group' ? 'Group class' : '1:1 session'}</p>
                </div>
                <span className={cn('ml-auto rounded-full px-2.5 py-1 text-[10px] font-black', s.status === 'upcoming' ? 'bg-accent/15 text-primary dark:text-accent' : s.status === 'recording' ? 'bg-error/15 text-error' : 'bg-surface-subtle text-content-faint')}>
                  {s.status}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs font-bold text-content-muted">
                <span className="flex items-center gap-1.5"><CalendarPlus className="h-3.5 w-3.5 text-accent" /> {s.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent" /> {s.time}</span>
                <span className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5 text-accent" /> {s.duration}</span>
              </div>
              {s.status === 'upcoming' && (
                <button className="mt-4 w-full rounded-full bg-cta-gradient py-2.5 text-xs font-black text-primary shadow-glow transition hover:-translate-y-0.5">
                  Join session
                </button>
              )}
            </Glass>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function RecordingsList() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
      {RECORDINGS.length === 0 ? (
        <EmptyState title="No recordings" sub="Record a session and it will appear here." icon={<Circle className="h-6 w-6" />} />
      ) : (
        <Glass className="divide-y divide-border overflow-hidden">
          {RECORDINGS.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-5 py-4 transition hover:bg-surface-subtle/40">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-primary dark:text-accent">
                <Circle className="h-5 w-5" fill="currentColor" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-content">{r.title}</p>
                <p className="text-[11px] font-semibold text-content-muted">{r.date} · {r.duration} · {r.size}</p>
              </div>
              <button className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-xs font-bold text-content-muted transition hover:border-accent/40 hover:text-content">
                Play <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </Glass>
      )}
    </motion.div>
  )
}
