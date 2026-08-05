import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareText, Send, Paperclip } from 'lucide-react'
import { useDB, sendMessage, markMessagesRead } from '@/lib/store'
import { PageHeader, SearchInput, ImgAvatar, EmptyState } from '@/components/trainer'
import { cn } from '@/lib/utils'

export default function AdminMessaging() {
  const db = useDB()
  const [selected, setSelected] = useState(db.clients[0]?.id ?? '')
  const [q, setQ] = useState('')
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const threads = db.clients
    .map((c) => {
      const msgs = db.messages.filter((m) => m.clientId === c.id).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      return { client: c, last: msgs[msgs.length - 1], unread: msgs.filter((m) => m.sender === 'client' && !m.read).length }
    })
    .filter((t) => t.client.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => ((b.last?.createdAt ?? '') < (a.last?.createdAt ?? '') ? -1 : 1))

  const current = db.clients.find((c) => c.id === selected)
  const threadMsgs = db.messages.filter((m) => m.clientId === selected).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [threadMsgs.length])

  useEffect(() => {
    if (selected) markMessagesRead(selected)
  }, [selected])

  const send = () => {
    if (!text.trim() || !current) return
    sendMessage(current.id, 'coach', 'Coach Nati', text.trim())
    setText('')
  }

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Messaging" sub="Chat with your members in real time" icon={<MessageSquareText className="h-5 w-5" />} />

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* Threads */}
        <div className="space-y-3">
          <SearchInput value={q} onChange={setQ} placeholder="Search conversations…" />
          <div className="space-y-2">
            {threads.map((t) => (
              <button key={t.client.id} onClick={() => setSelected(t.client.id)}
                className={cn('flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition', selected === t.client.id ? 'border-accent bg-accent/10' : 'border-border bg-surface-subtle/40 hover:border-accent/40 dark:bg-surface-subtle')}>
                <div className="relative">
                  <ImgAvatar name={t.client.name} src={t.client.avatar} size="md" />
                  {t.unread > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-error text-[9px] font-black text-white ring-2 ring-surface-solid">{t.unread}</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-black text-content">{t.client.name}</p>
                    {t.last && <span className="shrink-0 text-[9px] font-bold text-content-faint">{t.last.createdAt.slice(5, 10)}</span>}
                  </div>
                  <p className={cn('truncate text-xs', t.unread > 0 ? 'font-black text-content' : 'text-content-muted')}>{t.last?.text ?? 'No messages yet'}</p>
                </div>
              </button>
            ))}
            {threads.length === 0 && <p className="py-6 text-center text-xs font-bold text-content-faint">No conversations</p>}
          </div>
        </div>

        {/* Chat */}
        {current ? (
          <div className="flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-border bg-surface-subtle/40 dark:bg-surface-subtle">
            <div className="flex items-center gap-3 border-b border-border bg-surface-solid px-5 py-4 dark:bg-surface-solid">
              <ImgAvatar name={current.name} src={current.avatar} size="md" />
              <div>
                <p className="text-sm font-black text-content">{current.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Online · replies in minutes</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {threadMsgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={cn('flex', m.sender === 'coach' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[75%] rounded-2xl px-4 py-3 text-sm font-bold', m.sender === 'coach' ? 'rounded-br-md bg-cta-gradient text-primary' : 'rounded-bl-md border border-border bg-surface-solid text-content dark:bg-surface')}>
                    <p>{m.text}</p>
                    <p className={cn('mt-1 text-[9px] font-bold', m.sender === 'coach' ? 'text-primary/60' : 'text-content-faint')}>
                      {new Date(m.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-border bg-surface-solid p-3 dark:bg-surface-solid">
              <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-content-muted transition hover:text-content" aria-label="Attach"><Paperclip className="h-4 w-4" /></button>
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a message…" className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
              <button onClick={send} disabled={!text.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cta-gradient text-primary shadow-glow transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0" aria-label="Send"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        ) : (
          <EmptyState title="Select a conversation" sub="Choose a member from the list to start chatting." />
        )}
      </div>
    </div>
  )
}
