import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Plus, Users } from 'lucide-react'
import { useDB } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { DynamicIcon } from '@/lib/icons'
import { Badge, Button, Modal, Input, Select, Textarea } from '@/components/ui'
import { useToast } from '@/context/ToastContext'

export default function AdminPrograms() {
  const db = useDB()
  const { success } = useToast()
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', tagline: '', price: 149, level: 'Beginner', duration: '12 weeks' })

  const editing = db.programs.find((p) => p.id === editId)

  const save = () => {
    success('Program updated', `${form.name} saved.`)
    setEditId(null)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Programs</h1>
          <p className="text-sm text-content-muted">{db.programs.length} programs live · {db.clients.filter((c) => c.programId).length} clients assigned</p>
        </div>
        <Button variant="accent" size="md"><Plus className="h-4 w-4" /> New program</Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {db.programs.map((p, i) => {
          const assigned = db.clients.filter((c) => c.programId === p.id).length
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card dark:bg-surface-subtle"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${p.color}1f`, color: p.color }}>
                  <DynamicIcon name={p.icon} className="h-6 w-6" />
                </div>
                <Badge variant={p.popular ? 'accent' : 'outline'}>{p.popular ? 'Popular' : p.level}</Badge>
              </div>
              <h3 className="text-lg font-black text-content">{p.name}</h3>
              <p className="mt-1 text-xs text-content-muted">{p.duration} · {formatCurrency(p.price)}/mo</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-content-muted">
                  <Users className="h-3.5 w-3.5" /> {assigned} clients
                </span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditId(p.id); setForm({ name: p.name, tagline: p.tagline, price: p.price, level: p.level, duration: p.duration }) }} className="grid h-8 w-8 place-items-center rounded-full border border-border text-content-muted transition hover:border-accent hover:text-content" aria-label={`Edit ${p.name}`}>
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-full border border-border text-content-faint transition hover:border-error/50 hover:text-error" aria-label={`Delete ${p.name}`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <Modal open={!!editing} onClose={() => setEditId(null)} title={editing ? `Edit ${editing.name}` : 'New program'}>
        <div className="space-y-4">
          <Input label="Program name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price (USD/mo)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            <Select label="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              {['Beginner', 'Intermediate', 'Advanced'].map((l) => <option key={l}>{l}</option>)}
            </Select>
          </div>
          <Input label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <Textarea label="Description" rows={3} placeholder="Describe this program…" />
          <Button variant="accent" className="w-full" onClick={save}>Save program</Button>
        </div>
      </Modal>
    </div>
  )
}
