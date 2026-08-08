import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserCheck, Check, X, ChevronRight, Users, Clock } from 'lucide-react'
import { useDB, approveMemberRequest, rejectMemberRequest } from '@/lib/store'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui'
import { PageHeader, Glass, SearchInput, Segmented, ImgAvatar, EmptyState } from '@/components/trainer'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

type Filter = 'all' | 'pending' | 'approved' | 'rejected'

export default function AdminRequests() {
  const db = useDB()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('pending')
  const toast = useToast()

  const list = db.memberRequests
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.email.toLowerCase().includes(q.toLowerCase()))
    .filter((r) => (filter === 'all' ? true : r.status === filter))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const counts = (f: Filter) => (f === 'all' ? db.memberRequests.length : db.memberRequests.filter((r) => r.status === f).length)
  const pending = db.memberRequests.filter((r) => r.status === 'pending').length

  const approve = (id: string) => {
    approveMemberRequest(id)
    toast?.success('Request approved', 'The member has been approved and added to your members list.')
  }

  const reject = (id: string) => {
    rejectMemberRequest(id)
    toast?.error('Request rejected', 'The member request was rejected.')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Member requests"
        sub={`${pending} pending · ${counts('approved')} approved · ${counts('rejected')} rejected`}
        icon={<UserCheck className="h-5 w-5" />}
        actions={
          pending > 0 ? (
            <span className="flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black text-accent-dark dark:text-accent">
              <Clock className="h-3.5 w-3.5" /> {pending} waiting for your approval
            </span>
          ) : undefined
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={q} onChange={setQ} placeholder="Search by name or email…" className="flex-1" />
        <Segmented<Filter>
          value={filter}
          onChange={setFilter}
          options={(['all', 'pending', 'approved', 'rejected'] as Filter[]).map((f) => ({ id: f, label: `${f[0].toUpperCase() + f.slice(1)} (${counts(f)})` }))}
        />
      </div>

      <Glass className="overflow-hidden !p-0">
        {list.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title={filter === 'pending' ? 'No pending requests' : 'No requests found'}
              sub={filter === 'pending' ? 'When a new member checks out, their request will show up here for approval.' : 'Try a different search or filter.'}
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Program / Plan</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Requested</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/60 last:border-0 hover:bg-surface-subtle/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ImgAvatar name={r.name} src={db.clients.find((c) => c.id === r.clientId)?.avatar} size="md" />
                        <div>
                          <p className="font-black text-content">{r.name}</p>
                          <p className="text-xs text-content-muted">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-content">{r.program}</p>
                      <p className="text-[11px] text-content-muted">{r.plan}</p>
                    </td>
                    <td className="px-6 py-4 text-content-muted">
                      <p className="font-bold text-content">{r.method}</p>
                      {r.reference && <p className="text-[11px] text-content-faint">Ref: {r.reference}</p>}
                    </td>
                    <td className="px-6 py-4 font-black text-content">{formatCurrency(r.amount)}</td>
                    <td className="px-6 py-4 text-content-muted">
                      <p>{formatDate(r.createdAt)}</p>
                      {r.decidedAt && <p className="text-[11px] text-content-faint">Decided {formatDate(r.decidedAt)}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[10px] font-black capitalize',
                          r.status === 'approved' ? 'bg-success/10 text-success' :
                          r.status === 'rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning',
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {r.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="accent" size="sm" onClick={() => approve(r.id)}>
                            <Check className="h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => reject(r.id)}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : r.status === 'approved' && db.clients.find((c) => c.id === r.clientId) ? (
                        <div className="flex justify-end">
                          <Link to={`/admin/members/${r.clientId}`} className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">
                            View member <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      ) : (
                        <span className="block text-right text-[11px] font-black text-content-faint">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Glass>
    </div>
  )
}
