import { useState } from 'react'
import { Settings, Shield, CreditCard, Palette, Trash2, Check } from 'lucide-react'
import { resetDB } from '@/lib/store'
import { PageHeader, Glass } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('relative h-6 w-11 shrink-0 rounded-full transition', on ? 'bg-accent' : 'bg-surface-solid/20')}>
      <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-primary transition-all', on ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )
}

export default function AdminSettings() {
  const toast = useToast()
  const [toggles, setToggles] = useState<Record<string, boolean>>({ bookings: true, payments: true, email: false, sms: true })

  const input = 'h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle'
  const label = 'mb-1.5 block text-xs font-black text-content-muted'

  const save = () => toast?.success('Settings saved')

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader title="Settings" sub="Studio, billing & preferences" icon={<Settings className="h-5 w-5" />} actions={<Button variant="accent" size="md" onClick={save}><Check className="h-4 w-4" /> Save changes</Button>} />

      <Glass className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><Palette className="h-4 w-4 text-accent-dark dark:text-accent" /> Studio details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Studio name</label>
            <input defaultValue="Coach Nati Fitness" className={input} />
          </div>
          <div>
            <label className={label}>Time zone</label>
            <select className={input} defaultValue="Africa/Addis_Ababa (EAT)">
              <option>Africa/Addis_Ababa (EAT)</option>
              <option>Europe/London (GMT)</option>
              <option>America/New_York (EST)</option>
            </select>
          </div>
          <div>
            <label className={label}>Currency</label>
            <select className={input} defaultValue="ETB (Br)">
              <option>ETB (Br)</option>
            </select>
          </div>
          <div>
            <label className={label}>Contact email</label>
            <input defaultValue="coach@coachnati.com" className={input} />
          </div>
        </div>
      </Glass>

      <Glass className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><CreditCard className="h-4 w-4 text-success" /> Billing</h2>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface-subtle/40 p-4 dark:bg-surface-subtle">
          <div>
            <p className="text-sm font-black text-content">Coach Nati Studio</p>
            <p className="text-xs text-content-muted">Pro plan · ETB 850/mo · renews Aug 24, 2026</p>
          </div>
          <Button variant="accent" size="md" onClick={() => toast?.success('Billing portal opened')}>Manage billing</Button>
        </div>
      </Glass>

      <Glass className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-content"><Shield className="h-4 w-4 text-warning" /> Notifications & security</h2>
        <div className="divide-y divide-border">
          {[
            { key: 'bookings', label: 'Booking confirmations', sub: 'Email + in-app when a member books' },
            { key: 'payments', label: 'Payment alerts', sub: 'When a payment succeeds or fails' },
            { key: 'email', label: 'Email digests', sub: 'Weekly summary of activity' },
            { key: 'sms', label: 'SMS alerts', sub: 'Critical alerts to your phone' },
          ].map((r) => (
            <div key={r.key} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-black text-content">{r.label}</p>
                <p className="text-xs text-content-muted">{r.sub}</p>
              </div>
              <Toggle on={toggles[r.key]} onClick={() => setToggles((t) => ({ ...t, [r.key]: !t[r.key] }))} />
            </div>
          ))}
        </div>
      </Glass>

      <Glass className="border-error/20 p-6">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-black text-error"><Trash2 className="h-4 w-4" /> Danger zone</h2>
        <p className="mb-4 text-xs text-content-muted">Reset all demo data back to the original seed. This cannot be undone.</p>
        <Button variant="outline" onClick={() => { resetDB(); toast?.success('Demo data reset') }}>Reset demo data</Button>
      </Glass>
    </div>
  )
}
