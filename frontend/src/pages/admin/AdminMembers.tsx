import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, ChevronRight, Flame, Users } from 'lucide-react'
import { useDB } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui'
import { PageHeader, Glass, SearchInput, Segmented, ImgAvatar, MiniBar, EmptyState } from '@/components/trainer'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

type Filter = 'all' | 'active' | 'onboarding' | 'paused' | 'inactive'

export default function AdminMembers() {
  const db = useDB()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const toast = useToast()

  const list = db.clients
    .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()))
    .filter((c) => (filter === 'all' ? true : c.status === filter))
    .sort((a, b) => (a.status === 'active' ? -1 : 1) || b.streak - a.streak)

  const counts = (f: Filter) => (f === 'all' ? db.clients.length : db.clients.filter((c) => c.status === f).length)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Members"
        sub={`${db.clients.length} total · ${db.clients.filter((c) => c.status === 'active').length} active · ${db.clients.filter((c) => c.status === 'onboarding').length} onboarding`}
        icon={<Users className="h-5 w-5" />}
        actions={
          <Button variant="accent" size="md" onClick={() => toast?.success('Member invitation sent')}>
            <UserPlus className="h-4 w-4" /> Invite member
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={q} onChange={setQ} placeholder="Search by name or email…" className="flex-1" />
        <Segmented<Filter>
          value={filter}
          onChange={setFilter}
          options={(['all', 'active', 'onboarding', 'paused', 'inactive'] as Filter[]).map((f) => ({ id: f, label: `${f[0].toUpperCase() + f.slice(1)} (${counts(f)})` }))}
        />
      </div>

      <Glass className="overflow-hidden !p-0">
        {list.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No members found" sub="Try a different search or filter." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Program</th>
                  <th className="px-6 py-4">Goal progress</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c, i) => {
                  const program = db.programs.find((p) => p.id === c.programId)
                  const goal = db.goals.find((g) => g.clientId === c.id)
                  return (
                    <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/60 last:border-0 hover:bg-surface-subtle/40">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <ImgAvatar name={c.name} src={c.avatar} size="md" />
                          <div>
                            <p className="flex items-center gap-2 font-black text-content">
                              {c.name}
                              {c.streak > 0 && <span className="flex items-center gap-0.5 rounded-full bg-warning/10 px-2 py-0.5 text-[9px] font-black text-warning"><Flame className="h-3 w-3" />{c.streak}</span>}
                            </p>
                            <p className="text-xs text-content-muted">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-black capitalize',
                          c.status === 'active' ? 'bg-success/10 text-success' :
                          c.status === 'onboarding' ? 'bg-warning/10 text-warning' :
                          c.status === 'paused' ? 'bg-content-faint/10 text-content-muted' : 'bg-surface-subtle text-content-faint')}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-content">{program?.name ?? '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <MiniBar value={goal?.progress ?? 0} className="w-28" />
                          <span className="text-[11px] font-bold text-content-muted">{goal ? `${goal.progress}%` : '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-content-muted">{formatDate(c.joinedAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <Link to={`/admin/members/${c.id}`} className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">
                            Manage <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Glass>
    </div>
  )
}
