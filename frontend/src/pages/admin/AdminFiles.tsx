import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderOpen, Upload, Download, FileText, X, FileSpreadsheet } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, EmptyState, SearchInput, Segmented } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { formatDate } from '@/lib/utils'

type Kind = 'All' | 'Program' | 'Nutrition' | 'Progress Report' | 'Contract' | 'Assessment'

const KIND_STYLE: Record<string, string> = {
  Program: 'bg-accent/15 text-accent-dark dark:text-accent',
  Nutrition: 'bg-success/15 text-success',
  'Progress Report': 'bg-sky-500/15 text-sky-500',
  Contract: 'bg-warning/15 text-warning',
  Assessment: 'bg-pink-500/15 text-pink-500',
}

export default function AdminFiles() {
  const db = useDB()
  const toast = useToast()
  const [filter, setFilter] = useState<Kind>('All')
  const [q, setQ] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [name, setName] = useState('')
  const [kind, setKind] = useState('Program')

  const client = (id: string) => db.clients.find((c) => c.id === id)
  const files = useMemo(() => db.files.filter((f) => (filter === 'All' || f.kind === filter) && f.name.toLowerCase().includes(q.toLowerCase())), [db, filter, q])

  const upload = () => {
    if (!name.trim()) return toast?.error('Give the file a name')
    toast?.success(`“${name}” uploaded`)
    setUploadOpen(false)
    setName('')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Files"
        sub={`${db.files.length} documents shared across members`}
        icon={<FolderOpen className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={() => setUploadOpen(true)}><Upload className="h-4 w-4" /> Upload file</Button>}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={q} onChange={setQ} placeholder="Search files…" className="w-full sm:w-72" />
        <Segmented<Kind> value={filter} onChange={setFilter} options={(['All', 'Program', 'Nutrition', 'Progress Report', 'Contract', 'Assessment'] as Kind[]).map((k) => ({ id: k, label: k === 'All' ? 'All' : k.replace(' Report', '') }))} />
      </div>

      <Glass className="overflow-hidden !p-0">
        {files.length === 0 ? (
          <div className="p-6"><EmptyState title="No files" sub="Upload programs, meal plans and reports to share with members." action={<Button variant="accent" onClick={() => setUploadOpen(true)}><Upload className="h-4 w-4" /> Upload file</Button>} /></div>
        ) : (
          <div className="divide-y divide-border">
            {files.map((f, i) => {
              const c = client(f.clientId)
              return (
                <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 px-5 py-4 transition hover:bg-surface-subtle/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-subtle text-content-muted dark:bg-surface-subtle">
                    {f.kind === 'Progress Report' ? <FileSpreadsheet className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-content">{f.name}</p>
                    <p className="text-[11px] text-content-muted">Shared with {c?.name ?? '—'} · {formatDate(f.uploadedAt)} · {f.size}</p>
                  </div>
                  <span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-black sm:inline ${KIND_STYLE[f.kind]}`}>{f.kind}</span>
                  <button onClick={() => toast?.success(`Downloading ${f.name}`)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-content-muted transition hover:border-accent hover:text-content" aria-label="Download"><Download className="h-4 w-4" /></button>
                </motion.div>
              )
            })}
          </div>
        )}
      </Glass>

      {/* Upload modal */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setUploadOpen(false)}>
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface-solid shadow-lift dark:bg-surface">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="text-base font-black text-content">Upload file</h3>
                <button onClick={() => setUploadOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-content-muted hover:text-content" aria-label="Close"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4 px-6 py-5">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface-subtle/40 py-10 text-center transition hover:border-accent/50">
                  <Upload className="h-6 w-6 text-content-faint" />
                  <span className="text-xs font-black text-content">Drop a file here</span>
                  <span className="text-[10px] text-content-faint">PDF, DOCX, JPG up to 10MB</span>
                  <input type="file" className="hidden" onChange={() => toast?.success('File attached')} />
                </label>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">File name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Week-3-Workout.pdf" className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-content-muted">Category</label>
                  <select value={kind} onChange={(e) => setKind(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-content focus:border-accent-dark focus:outline-none dark:bg-surface-subtle">
                    {['Program', 'Nutrition', 'Progress Report', 'Contract', 'Assessment'].map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 border-t border-border px-6 py-4">
                <Button variant="ghost" className="flex-1" onClick={() => setUploadOpen(false)}>Cancel</Button>
                <Button variant="accent" className="flex-1" onClick={upload}><Upload className="h-4 w-4" /> Upload</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
