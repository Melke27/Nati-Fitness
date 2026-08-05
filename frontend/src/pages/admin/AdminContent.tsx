import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Plus, Trash2, Tag, MessageSquare } from 'lucide-react'
import { useDB } from '@/lib/store'
import { Badge, Card, Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

type Tab = 'testimonials' | 'coupons' | 'faqs' | 'announcements'

export default function AdminContent() {
  const db = useDB()
  const { success } = useToast()
  const [tab, setTab] = useState<Tab>('testimonials')
  const [couponForm, setCouponForm] = useState({ code: '', percentOff: 15 })

  const addCoupon = () => {
    success('Coupon created', `${couponForm.code} — ${couponForm.percentOff}% off`)
    setCouponForm({ code: '', percentOff: 15 })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-content">Content & marketing</h1>
        <p className="text-sm text-content-muted">Manage testimonials, coupons, FAQs and announcements</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {([['testimonials', 'Testimonials'], ['coupons', 'Coupons'], ['faqs', 'FAQs'], ['announcements', 'Announcements']] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'rounded-full border px-5 py-2.5 text-xs font-black capitalize transition',
              tab === id ? 'border-accent bg-accent/15 text-primary dark:text-accent' : 'border-border text-content-muted hover:border-accent/40',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'testimonials' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {db.testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Card className="h-full">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <button className="text-content-faint transition hover:text-error" aria-label="Delete testimonial"><Trash2 className="h-4 w-4" /></button>
                </div>
                <p className="line-clamp-3 text-sm font-semibold text-content-muted">“{t.quote}”</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-sm font-black text-content">{t.name}</p>
                  <Badge variant="success">{t.result}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'coupons' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-sm font-black text-content">Active coupons</h2>
            <div className="space-y-3">
              {db.coupons.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-primary dark:text-accent"><Tag className="h-5 w-5" /></span>
                  <div className="flex-1">
                    <p className="font-black text-content">{c.code}</p>
                    <p className="text-xs text-content-muted">{c.percentOff}% off · {c.expiresAt ? `expires ${new Date(c.expiresAt).toLocaleDateString()}` : 'no expiry'}</p>
                  </div>
                  <Badge variant={c.active ? 'success' : 'outline'}>{c.active ? 'Active' : 'Off'}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-sm font-black text-content">Create coupon</h2>
            <div className="space-y-4">
              <Input label="Code" placeholder="SUMMER30" value={couponForm.code} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })} />
              <Input label="Discount %" type="number" min={1} max={90} value={couponForm.percentOff} onChange={(e) => setCouponForm({ ...couponForm, percentOff: Number(e.target.value) })} />
              <Button variant="accent" className="w-full" onClick={addCoupon} disabled={!couponForm.code}><Plus className="h-4 w-4" /> Create coupon</Button>
            </div>
          </Card>
        </div>
      )}

      {tab === 'faqs' && (
        <Card>
          <h2 className="mb-4 text-sm font-black text-content">FAQs ({db.faqs.length})</h2>
          <div className="space-y-3">
            {db.faqs.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-xl border border-border p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-subtle text-xs font-black text-content-faint dark:bg-surface-subtle">Q</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-content">{f.question}</p>
                  <p className="truncate text-xs text-content-muted">{f.answer}</p>
                </div>
                <Badge variant="outline">{f.category}</Badge>
                <button className="text-content-faint transition hover:text-error" aria-label="Delete FAQ"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'announcements' && (
        <Card>
          <h2 className="mb-4 text-sm font-black text-content">Announcements</h2>
          <div className="space-y-3">
            {db.announcements.map((a) => (
              <div key={a.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-black text-content"><MessageSquare className="h-4 w-4 text-accent-dark dark:text-accent" /> {a.title}</p>
                  <span className="text-xs text-content-faint">{new Date(a.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-1 text-sm text-content-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
