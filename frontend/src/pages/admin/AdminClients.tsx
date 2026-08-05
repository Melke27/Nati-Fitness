import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, UserPlus, MoreHorizontal, Wallet } from 'lucide-react'
import { useDB } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { Avatar, Badge, Card, Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const STATUS_STYLE: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/25',
  onboarding: 'bg-warning/10 text-warning border-warning/25',
  paused: 'bg-content-faint/10 text-content-muted border-border',
  inactive: 'bg-surface-subtle text-content-faint border-border',
}

export default function AdminClients() {
  const db = useDB()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')

  const list = db.clients
    .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()))
    .filter((c) => (filter === 'all' ? true : c.status === filter))
    .sort((a, _b) => (a.status === 'active' ? -1 : 1))

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Clients</h1>
          <p className="text-sm text-content-muted">{db.clients.length} total · {db.clients.filter((c) => c.status === 'active').length} active</p>
        </div>
        <Button variant="accent" size="md"><UserPlus className="h-4 w-4" /> Add client</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email…"
            className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 dark:bg-surface-subtle"
          />
        </div>
        {['all', 'active', 'onboarding', 'paused', 'inactive'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-4 py-2.5 text-xs font-bold capitalize transition',
              filter === f ? 'border-accent bg-accent/15 text-primary dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c, i) => {
                const program = db.programs.find((p) => p.id === c.programId)
                const plan = db.plans.find((p) => p.id === c.planId)
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/60 last:border-0 hover:bg-surface-subtle/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} size="sm" />
                        <div>
                          <p className="font-black text-content">{c.name}</p>
                          <p className="text-xs text-content-muted">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge className={STATUS_STYLE[c.status]}>{c.status}</Badge></td>
                    <td className="px-6 py-4 font-bold text-content">{program?.name ?? '—'}</td>
                    <td className="px-6 py-4 text-content-muted">
                      {plan ? (
                        <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5 text-accent-dark dark:text-accent" /> {plan.name}</span>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4 text-content-muted">{formatDate(c.joinedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/clients/${c.id}`} className="rounded-full border border-border px-4 py-1.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">
                          Manage
                        </Link>
                        <button className="grid h-8 w-8 place-items-center rounded-full border border-border text-content-faint hover:border-accent hover:text-content" aria-label="More options">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-content-faint">No clients match your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
