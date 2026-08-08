import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Check, X, UserPlus } from 'lucide-react'
import { useDB, approvePayment, rejectPayment } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { Avatar, Badge, Card, Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const METHOD_STYLE: Record<string, string> = {
  Card: 'bg-accent/15 text-primary border-accent/30 dark:text-accent',
  'Bank Transfer': 'bg-success/10 text-success border-success/25',
  'Mobile Money': 'bg-warning/10 text-warning border-warning/25',
}

export default function AdminPayments() {
  const db = useDB()
  const [status, setStatus] = useState('all')
  const toast = useToast()

  const list = db.payments.filter((p) => (status === 'all' ? true : p.status === status))
  const total = list.filter((p) => p.status === 'paid').reduce((a, p) => a + p.amount, 0)
  const pendingCount = db.payments.filter((p) => p.status === 'pending').length

  const confirmPayment = (id: string) => {
    approvePayment(id)
    toast?.success('Payment approved', 'The member request has been approved and the member activated.')
  }

  const declinePayment = (id: string) => {
    rejectPayment(id)
    toast?.error('Payment declined', 'The payment was refunded and the request rejected.')
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Payments</h1>
          <p className="text-sm text-content-muted">{list.length} transactions · {formatCurrency(total)} collected · {pendingCount} pending approval</p>
        </div>
        <Button variant="outline" size="md"><Download className="h-4 w-4" /> Export CSV</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'paid', 'pending', 'refunded'].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              'rounded-full border px-4 py-2.5 text-xs font-black capitalize transition',
              status === s ? 'border-accent bg-accent/15 text-primary dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Program / Plan</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/60 last:border-0 hover:bg-surface-subtle/40">
                  <td className="px-6 py-4 font-black text-content">{p.reference}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={p.clientName} size="sm" />
                      <span className="font-bold text-content">{p.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-content-muted">{p.program} · <span className="text-content">{p.plan}</span></td>
                  <td className="px-6 py-4"><Badge className={METHOD_STYLE[p.method]}>{p.method}</Badge></td>
                  <td className="px-6 py-4">
                    <Badge variant={p.status === 'paid' ? 'success' : p.status === 'pending' ? 'warning' : 'outline'}>{p.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-black text-content">{formatCurrency(p.amount)}</span>
                    <span className="ml-2 text-[10px] text-content-faint">{new Date(p.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    {p.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="accent" size="sm" onClick={() => confirmPayment(p.id)}>
                          <Check className="h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => declinePayment(p.id)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : p.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-success"><UserPlus className="h-3.5 w-3.5" /> Member approved</span>
                    ) : (
                      <span className="text-[11px] font-black text-content-faint">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-content-faint">No transactions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
