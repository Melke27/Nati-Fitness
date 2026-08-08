import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList, Target, Dumbbell, MessageSquareText, Trophy } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionHeading, Button } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { openPlanFinder } from '@/lib/planFinderBus'

const STEP_ICONS = [ClipboardList, Target, Dumbbell, MessageSquareText, Trophy]

export function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden bg-surface-subtle">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" aria-hidden />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Coaching process"
          title={<>From assessment to <span className="text-gradient-accent">transformation</span> in 5 steps</>}
          description="A proven, structured journey. You always know exactly what's happening and what's next."
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[60px] hidden h-px bg-gradient-to-r from-accent/0 via-accent/35 to-accent/0 lg:block" aria-hidden />

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Trophy
              return (
                <StaggerItem key={step.title} className="h-full">
                  <div className="group relative flex h-full flex-col items-center rounded-2xl border border-border bg-surface-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-card-hover">
                    <div className="relative mb-5">
                      <span className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary group-hover:shadow-glow">
                        <Icon className="h-8 w-8" />
                      </span>
                      <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-cta-gradient text-[11px] font-black text-primary shadow-glow">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-content">{step.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-content-muted">{step.desc}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>

        <Reveal dir="up" className="mt-12 text-center">
          <p className="text-sm font-semibold text-content-muted">Step one is free — no card required, takes under 30 seconds.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Button variant="accent" size="lg" onClick={openPlanFinder} className="group">
              Start Your Free Assessment
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-content transition-all duration-200 hover:border-accent/50 hover:bg-accent/5"
            >
              Explore Programs
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}