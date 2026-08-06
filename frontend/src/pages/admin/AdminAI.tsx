import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Wand2, Dumbbell, Apple, MessageSquareText, BarChart3, Zap } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader } from '@/components/trainer'
import { cn } from '@/lib/utils'

interface ChatMsg {
  id: string
  role: 'ai' | 'user'
  text: string
}

const SUGGESTIONS = [
  { icon: Dumbbell, label: 'Suggest a leg day for Sarah', prompt: 'Create a 45-minute lower body workout for Sarah focused on glutes with dumbbells at home.' },
  { icon: Apple, label: 'Build a 1800-calorie day', prompt: 'Build a full 1800 calorie meal day for a weight loss client, high protein.' },
  { icon: MessageSquareText, label: 'Draft a check-in message', prompt: 'Draft a friendly weekly check-in message for my members asking about their week.' },
  { icon: BarChart3, label: 'Summarize this month', prompt: 'Summarize my coaching business performance this month with key stats.' },
]

const GREETING = 'Hey Coach Nati 👋 I’m your AI coaching assistant. I can draft workouts, meal plans, check-in messages and business summaries. What do you need?'
const INTRO: ChatMsg = { id: 'ai-0', role: 'ai', text: GREETING }

export default function AdminAI() {
  const db = useDB()
  const [messages, setMessages] = useState<ChatMsg[]>([INTRO])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const members = db.clients.map((c) => c.name.split(' ')[0]).join(', ')

  const respond = (prompt: string): string => {
    const p = prompt.toLowerCase()
    if (p.includes('leg') || p.includes('workout') || p.includes('lower body')) {
      return `Here’s a glute-focused leg day for Sarah 🔥
Warm-up — 5 min band walks
1) Goblet Squat — 4×10 @ 16kg
2) Romanian Deadlift — 4×12 @ 20kg
3) Walking Lunges — 3×14 each
4) Hip Thrust — 4×12 @ 30kg
5) Glute Bridge hold — 3×45s
Cool down — pigeon stretch 2 min/side
Push herself on sets 3–4. Let me know if you want it saved to her plan.`
    }
    if (p.includes('meal') || p.includes('1800') || p.includes('calorie') || p.includes('nutrition')) {
      return `1800 kcal · high-protein day 🥗
Breakfast (420) — Protein oats with berries
Snack (240) — Greek yogurt parfait
Lunch (540) — Grilled chicken bowl
Snack (180) — Apple + almonds
Dinner (420) — Salmon & quinoa
Total: 1800 kcal · 145g protein · 165g carbs · 55g fat
Shall I assign this plan to a member?`
    }
    if (p.includes('check-in') || p.includes('message')) {
      return `Draft check-in message 💬
"Hey {name}! Hope your week is going well 🔥 How are the new workouts feeling? Send over your morning weight and 1 photo from yesterday's meal, then we’ll review your progress together. Keep crushing it! 💪"`
    }
    if (p.includes('summar') || p.includes('month') || p.includes('business')) {
      return `Business snapshot 📊
• Active members: ${db.clients.filter((c) => c.status === 'active').length}
• Revenue this month: ETB ${db.payments.filter((p) => p.status === 'paid' && new Date(p.createdAt).getMonth() === new Date().getMonth()).reduce((a, p) => a + p.amount, 0).toLocaleString()}
• New leads: ${db.leads.length}
• Unread messages: ${db.messages.filter((m) => m.sender === 'client' && !m.read).length}
• Members on-track: ${db.goals.filter((g) => g.status === 'on-track').length}
Focus area: send check-ins to members you haven’t heard from this week.`
    }
    return `Got it 👍 Here’s a quick suggestion for: "${prompt.slice(0, 60)}…"

I’d recommend keeping it simple — start with 2 focused habits this week, then build. Want me to turn this into a concrete plan, workout, or message for your members (${members || 'none yet'})?`
  }

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg) return
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: msg }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'ai', text: respond(msg) }])
      setThinking(false)
    }, 900)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="AI Assistant" sub="Your 24/7 coaching copilot" icon={<Sparkles className="h-5 w-5" />} />

      <div className="flex h-[68vh] flex-col overflow-hidden rounded-3xl border border-border bg-surface-subtle/40 dark:bg-surface-subtle">
        <div className="flex items-center gap-3 border-b border-border bg-surface-solid px-5 py-4 dark:bg-surface-solid">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cta-gradient text-primary shadow-glow"><Wand2 className="h-5 w-5" /></span>
          <div>
            <p className="flex items-center gap-2 text-sm font-black text-content">Nati AI <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-black text-accent-dark dark:text-accent">GPT-POWERED</span></p>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Online · trained on your studio</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              {m.role === 'ai' && <span className="mr-2 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cta-gradient text-primary"><Zap className="h-3.5 w-3.5" fill="currentColor" /></span>}
              <div className={cn('max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm font-bold', m.role === 'user' ? 'rounded-br-md bg-cta-gradient text-primary' : 'rounded-bl-md border border-border bg-surface-solid text-content dark:bg-surface')}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {thinking && (
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-cta-gradient text-primary"><Zap className="h-3.5 w-3.5" fill="currentColor" /></span>
              <span className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-surface-solid px-4 py-3 dark:bg-surface">
                {[0, 1, 2].map((i) => <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.2 }} />)}
              </span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-1 gap-2 border-t border-border px-5 py-4 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button key={s.label} onClick={() => send(s.prompt)} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-left text-xs font-black text-content transition hover:border-accent/50 hover:bg-accent/5">
                <s.icon className="h-4 w-4 shrink-0 text-accent-dark dark:text-accent" />
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 border-t border-border bg-surface-solid p-3 dark:bg-surface-solid">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask Nati AI anything…" className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-content placeholder:text-content-faint focus:border-accent-dark focus:outline-none dark:bg-surface-subtle" />
          <button onClick={() => send()} disabled={!input.trim() || thinking} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cta-gradient text-primary shadow-glow transition hover:-translate-y-0.5 disabled:opacity-40" aria-label="Send"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  )
}
