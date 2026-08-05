import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, ShieldCheck } from 'lucide-react'
import { useDB, getSession, sendMessage, markMessagesRead } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Avatar, Button } from '@/components/ui'

export default function ClientMessages() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = db.messages.filter((m) => m.clientId === client.id)

  useEffect(() => {
    markMessagesRead(client.id)
  }, [client.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const send = () => {
    if (!text.trim()) return
    sendMessage(client.id, 'client', session.name, text.trim())
    setText('')
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar name="Coach Nati" size="lg" />
          <div>
            <h1 className="flex items-center gap-2 text-lg font-black text-content">Coach Nati <span className="grid h-5 w-5 place-items-center rounded-full bg-success text-white"><Check className="h-3 w-3" strokeWidth={3} /></span></h1>
            <p className="flex items-center gap-2 text-xs font-semibold text-success"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-success" /></span> Online now — replies within the hour</p>
          </div>
        </div>
        <ShieldCheck className="h-6 w-6 text-content-faint" />
      </div>

      <div className="mb-4 flex items-center justify-center">
        <button className="rounded-full border border-dashed border-border px-4 py-2 text-xs font-bold text-content-faint transition hover:border-accent hover:text-content">
          📞 Schedule a video call
        </button>
      </div>

      <div className="flex h-[52vh] min-h-[380px] flex-col gap-3 overflow-y-auto rounded-3xl border border-border bg-surface-subtle/50 p-5 dark:bg-surface-subtle" role="log" aria-label="Messages with Coach Nati">
        <div className="mx-auto rounded-full bg-surface-subtle px-4 py-1.5 text-[10px] font-bold text-content-faint dark:bg-surface-subtle">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex', m.sender === 'client' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                m.sender === 'client'
                  ? 'rounded-br-sm bg-cta-gradient font-semibold text-primary'
                  : 'rounded-bl-sm border border-border bg-surface',
              )}
            >
              {m.sender === 'coach' && <p className="mb-0.5 text-[10px] font-black uppercase tracking-wide text-accent-dark dark:text-accent">{m.senderName}</p>}
              {m.text}
              <p className={cn('mt-1 text-right text-[9px] font-bold', m.sender === 'client' ? 'text-primary/60' : 'text-content-faint')}>
                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-3">
        <div className="relative flex-1">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Type your message to Coach Nati…"
            aria-label="Message Coach Nati"
            className="h-14 w-full rounded-full border border-border bg-surface px-5 pr-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 dark:bg-surface-subtle"
          />
        </div>
        <ButtonSend onClick={send} disabled={!text.trim()} />
      </div>
      <p className="mt-3 text-center text-[11px] font-semibold text-content-faint">
        This chat is private between you and Coach Nati · Messages are encrypted in transit
      </p>
    </div>
  )
}

function ButtonSend({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button variant="accent" size="lg" className="!h-14 !w-14 !p-0" onClick={onClick} disabled={disabled} aria-label="Send message">
      <Send className="h-5 w-5" />
    </Button>
  )
}
