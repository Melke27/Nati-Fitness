import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, CalendarCheck, MessageSquare, Dumbbell, Clock, AlertCircle } from 'lucide-react'
import { getSession, useDB } from '@/lib/store'
import { Button } from '@/components/ui'

export default function CheckoutSuccess() {
  const [params] = useSearchParams()
  const db = useDB()
  const session = getSession()
  const [name, setName] = useState('champion')

  useEffect(() => {
    if (session) setName(session.name.split(' ')[0])
  }, [session])

  const ref = params.get('ref')
  const pending = params.get('pending') === '1'
  const client = session ? db.clients.find((c) => c.userId === session.userId) : undefined
  const program = db.programs.find((p) => p.id === client?.programId)

  return (
    <div className="relative flex min-h-screen items-center bg-surface pt-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="container-shell relative max-w-2xl py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className={`mx-auto grid h-24 w-24 place-items-center rounded-full shadow-glow ${pending ? 'bg-accent/15' : 'bg-cta-gradient'}`}
        >
          {pending ? <Clock className="h-12 w-12 text-primary" /> : <Check className="h-12 w-12 text-primary" strokeWidth={3} />}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="mt-8 text-4xl font-black tracking-tight text-content">
            {pending ? `Thanks, ${name}!` : `You're in, ${name}! 🎉`}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-content-muted">
            {pending ? (
              <>Your payment is <span className="font-black text-content">pending confirmation</span>. Once Coach Nati verifies your transfer, your plan activates — usually within 4 business hours.</>
            ) : (
              <>Your <span className="font-black text-content">{program?.name ?? 'coaching'} plan</span> is active.</>
            )}
            {ref && <span className="block text-xs font-bold text-content-faint">Reference {ref}</span>}
          </p>
        </motion.div>

        {pending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 flex max-w-md items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-5 text-left"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div className="text-xs leading-relaxed text-content-muted">
              <p className="font-black text-content">Order received — awaiting confirmation.</p>
              <p>You'll get a notification and your dashboard access the moment your payment is confirmed. Nothing is charged twice.</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 space-y-3 text-left"
        >
          {[
            { icon: CalendarCheck, title: 'Your onboarding profile is ready', desc: 'Your personalized workout & meal plan is being generated for your goal.' },
            { icon: MessageSquare, title: 'Welcome message sent', desc: 'Coach Nati will message you within 24 hours to get started.' },
            { icon: Dumbbell, title: 'Start your first workout today', desc: 'Open your dashboard — your week one plan is waiting.' },
          ].map((s) => (
            <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-subtle/60 p-5 dark:bg-surface-subtle">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-primary dark:text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-content">{s.title}</p>
                <p className="text-sm text-content-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/dashboard">
            <Button variant="accent" size="lg" className="group">
              <Sparkles className="h-5 w-5" /> Go to my dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">Back to home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
