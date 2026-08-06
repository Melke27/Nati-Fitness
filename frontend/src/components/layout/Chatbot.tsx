import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type Msg = { role: 'user' | 'bot'; text: string; to?: string; cta?: string }

const QUICK = ['Programs & pricing', 'Start my transformation', 'Trainer help', 'Payment options', 'Free trial']

const GREETING: Msg = {
  role: 'bot',
  text: "Hi, I'm Coach Nati's assistant! 👋 I can help with programs, pricing, trainers, payments, and starting your transformation.",
}

function ruleReply(input: string): Msg {
  const q = input.toLowerCase()

  if (/(hi|hello|hey|help)\b/.test(q))
    return { role: 'bot', text: 'Hey there! Ask me anything about our programs, plans, trainers, or how to get started. I\u2019m here to help.' }
  if (/(free trial|trial|start|transformation|begin|signup|sign up|register)/.test(q))
    return {
      role: 'bot',
      text: 'Great decision! Start your free trial by creating an account, then the smart onboarding asks about your goals, age and level to match you with the perfect program and coach.',
      to: '/register',
      cta: 'Get Started',
    }
  if (/(program|workout|training|plan)/.test(q))
    return {
      role: 'bot',
      text: 'We offer science-based programs for weight loss, muscle gain, strength and conditioning — plans sit at ETB 3,200–12,000/mo. Browse programs or use our Plan Finder to get matched.',
      to: '/programs',
      cta: 'View Programs',
    }
  if (/(price|pricing|cost|plan|package|membership|payment|pay|cbe|telebirr|birr|etb)/.test(q))
    return {
      role: 'bot',
      text: 'Plans start from ETB 3,200/mo. We accept CBE, Telebirr, mobile money, bank transfer and card — CBE/Telebirr need a reference number and a payment screenshot during checkout.',
      to: '/pricing',
      cta: 'See Pricing',
    }
  if (/(trainer|coach|online|personal)/.test(q))
    return {
      role: 'bot',
      text: 'Browse our team of certified coaches — or open any trainer page to hit \u201cStart Your Transformation\u201d and get a fully personalized training + nutrition plan.',
      to: '/trainers',
      cta: 'Meet Trainers',
    }
  if (/(course|lesson|learn|video)/.test(q))
    return {
      role: 'bot',
      text: 'Check out our structured video courses with lesson plans and reviews — from Fat-Burn HIIT to Strength Foundations.',
      to: '/courses',
      cta: 'Browse Courses',
    }
  if (/(contact|call|book|reach|support|human)/.test(q))
    return {
      role: 'bot',
      text: 'You can reach the team anytime from the Contact page to book a free call — or your coach messages you directly inside your dashboard.',
      to: '/contact',
      cta: 'Contact Us',
    }
  if (/(goal|lose|weight|fat|muscle|gain|build|tone|fit)/.test(q))
    return {
      role: 'bot',
      text: 'Whatever your goal — lose fat, build muscle or get stronger — we build a sustainable plan around your body and schedule. Start a free trial and get matched to a coach today!',
      to: '/onboarding',
      cta: 'Start Transform',
    }
  return {
    role: 'bot',
    text: 'I\u2019d love to help! Try asking about programs, pricing, trainers, payments, or how to start your free trial. For anything else, the team is always a message away.',
  }
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setTimeout(() => setMessages((m) => [...m, ruleReply(text)]), 450)
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="group fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-glow transition-all duration-300 hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-4 z-[70] flex h-[560px] max-h-[80vh] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-[#13090c] px-5 py-4">
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
                <Zap className="h-5 w-5" fill="currentColor" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-bold text-white">
                  Coach Nati Assistant <Sparkles className="h-3.5 w-3.5 text-accent" />
                </p>
                <p className="text-[11px] text-white/60">Online · replies instantly</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-surface-subtle/40 p-4">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[85%]', m.role === 'user' && 'max-w-[80%]')}>
                    <p
                      className={cn(
                        'px-4 py-2.5 text-sm leading-relaxed',
                        m.role === 'user'
                          ? 'rounded-2xl rounded-br-sm bg-accent text-white shadow-glow'
                          : 'rounded-2xl rounded-bl-sm border border-border bg-surface-card text-content-soft',
                      )}
                    >
                      {m.text}
                    </p>
                    {m.role === 'bot' && m.to && (
                      <button
                        onClick={() => navigate(m.to!)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white transition hover:bg-accent-hover"
                      >
                        {m.cta} <Send className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-content-muted transition hover:border-accent/40 hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="h-11 flex-1 rounded-xl border border-border bg-surface px-4 text-sm text-content outline-none placeholder:text-content-faint focus:border-accent/50"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white transition hover:bg-accent-hover"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}