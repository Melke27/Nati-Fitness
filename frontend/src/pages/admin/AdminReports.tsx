import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download, FileBarChart, TrendingUp, Users, Wallet, Trophy } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, StatCard, Segmented } from '@/components/trainer'
import { Button, Badge } from '@/components/ui'
import { LineChart, BarChart } from '@/components/charts'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'

type Range = '30d' | '90d' | 'year'

export default function AdminReports() {
  const db = useDB()
  const toast = useToast()
  const [range, setRange] = useState<Range>('90d')

  const monthlyRevenue = useMemo(() => Array.from({ length: 6 }, (_, i) => {
    const m = new Date()
    m.setMonth(m.getMonth() - (5 - i))
    const total = db.payments.filter((p) => p.status === 'paid' && new Date(p.createdAt).getMonth() === m.getMonth() && new Date(p.createdAt).getFullYear() === m.getFullYear()).reduce((a, p) => a + p.amount, 0)
    return { label: m.toLocaleString('en-US', { month: 'short' }), value: total }
  }), [db])

  const memberGrowth = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ label: monthlyRevenue[i].label, value: 2 + i * 1 + (i % 2) })), [monthlyRevenue])

  const programPerf = db.programs.map((p) => ({ name: p.name, clients: db.clients.filter((c) => c.programId === p.id).length, revenue: db.payments.filter((pay) => pay.program === p.name).reduce((a, x) => a + x.amount, 0) })).filter((p) => p.clients > 0)

  const totalRevenue = db.payments.filter((p) => p.status === 'paid').reduce((a, p) => a + p.amount, 0)
  const activeMembers = db.clients.filter((c) => c.status === 'active').length
  const avgPerClient = activeMembers ? Math.round(totalRevenue / activeMembers) : 0
  const churn = 9

  const exportReport = () => toast?.success('Report generated — check your downloads')

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Reports"
        sub="Business performance & coaching analytics"
        icon={<BarChart3 className="h-5 w-5" />}
        actions={
          <>
            <Segmented<Range> value={range} onChange={setRange} options={[{ id: '30d', label: '30 days' }, { id: '90d', label: '90 days' }, { id: 'year', label: 'Year' }]} />
            <Button variant="accent" size="md" onClick={exportReport}><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} trend={18} icon={<Wallet className="h-5 w-5" />} iconBg="bg-success/15 text-success" spark={[30, 45, 40, 60, 55, 75, 80, 95]} />
        <StatCard label="Active members" value={activeMembers} trend={12} icon={<Users className="h-5 w-5" />} spark={[2, 3, 3, 4, 4, 5, 5, 6]} />
        <StatCard label="Avg. revenue / client" value={formatCurrency(avgPerClient)} icon={<TrendingUp className="h-5 w-5" />} iconBg="bg-accent/15 text-accent-dark dark:text-accent" />
        <StatCard label="Churn (90d)" value={`${churn}%`} trend={-churn} icon={<Trophy className="h-5 w-5" />} iconBg="bg-warning/15 text-warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Glass className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-content">Revenue trend</h2>
              <p className="text-xs text-content-muted">Monthly, last 6 months</p>
            </div>
            <Badge variant="accent">{formatCurrency(monthlyRevenue.reduce((a, b) => a + b.value, 0))}</Badge>
          </div>
          <LineChart data={monthlyRevenue} height={210} />
        </Glass>

        <Glass className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-content">Member growth</h2>
              <p className="text-xs text-content-muted">Active memberships</p>
            </div>
            <Badge variant="success">+{memberGrowth[memberGrowth.length - 1].value - memberGrowth[0].value} this period</Badge>
          </div>
          <BarChart data={memberGrowth} height={210} />
        </Glass>
      </div>

      <Glass className="overflow-hidden !p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-black text-content">Program performance</h2>
          <FileBarChart className="h-4 w-4 text-content-faint" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle/60 text-[11px] font-black uppercase tracking-wider text-content-faint dark:bg-surface-subtle">
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4">Share</th>
              </tr>
            </thead>
            <tbody>
              {programPerf.map((p, i) => {
                const share = Math.round((p.revenue / Math.max(1, totalRevenue)) * 100)
                return (
                  <motion.tr key={p.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-4 font-black text-content">{p.name}</td>
                    <td className="px-6 py-4 text-content-muted">{p.clients}</td>
                    <td className="px-6 py-4 font-black text-success">{formatCurrency(p.revenue)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-solid/10">
                          <motion.div className={cn('h-full rounded-full bg-cta-gradient')} initial={{ width: 0 }} whileInView={{ width: `${share}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                        </div>
                        <span className="text-[11px] font-bold text-content-muted">{share}%</span>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
              {programPerf.length === 0 && <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-content-faint">No program data yet</td></tr>}
            </tbody>
          </table>
        </div>
      </Glass>
    </div>
  )
}
