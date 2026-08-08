import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui'
import { openPlanFinder } from '@/lib/planFinderBus'
import { track } from '@/lib/analytics'

const STEPS = [
  {
    title: 'Answer 3 quick questions',
    desc: 'Your goal, your experience & your body profile.',
    icon: '01',
  },
  {
    title: 'Instant plan match',
    desc: 'We match you to the Coach Nati program built for you.',
    icon: '02',
  },
  {
    title: 'Start your transformation',
    desc: 'Enroll in your personalized plan in minutes.',
    icon: '03',
  },
]

export function PlanFinder() {
  const launch = () => {
    track('questionnaire_opened')
    openPlanFinder()
  }

  return (
    <section id="plan-finder" className="section-padding relative overflow-hidden bg-surface-subtle">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Free Assessment"
          title={<>Find your <span className="text-gradient-accent">perfect plan</span></>}
          description="Answer 3 quick questions to get started — it takes under 30 seconds and your plan is matched instantly."
        />

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface-card p-5 text-center shadow-card"
            >
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-base font-black text-accent">
                {s.icon}
              </span>
              <h3 className="mt-3 text-sm font-black text-content">{s.title}</h3>
              <p className="mt-1 text-[13px] text-content-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={launch}
            className="group inline-flex items-center gap-2 rounded-full bg-cta-gradient px-7 py-3.5 text-sm font-black text-primary shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            FIND YOUR PERFECT PLAN
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-2.5 text-xs font-semibold text-content-faint">Free · No card required · Takes under 30 seconds</p>
        </div>
      </div>
    </section>
  )
}