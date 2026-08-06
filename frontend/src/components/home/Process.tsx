import { PROCESS_STEPS } from '@/lib/constants'
import { SectionHeading } from '@/components/ui'
import { Reveal } from '@/components/motion'

export function Process() {
  return (
    <section id="process" className="section-padding relative">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Coaching process"
          title={<>From assessment to <span className="text-gradient-accent">transformation</span> in 5 steps</>}
          description="A proven, structured journey. You always know exactly what's happening and what's next."
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-[27px] top-2 h-[calc(100%-8px)] w-px bg-gradient-to-b from-accent via-border to-transparent sm:left-1/2 sm:-translate-x-px" aria-hidden />

          <div className="space-y-10">
            {PROCESS_STEPS.map((step, i) => {
              const left = i % 2 === 0
              return (
                <div key={step.title} className="relative">
                  {/* Dot */}
                  <span className="absolute left-[27px] top-2 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center sm:left-1/2">
                    <span className="h-4 w-4 rounded-full border-2 border-accent bg-surface shadow-glow" />
                  </span>

                  <div className={`pl-16 sm:w-1/2 sm:pl-0 ${left ? 'sm:pr-14' : 'sm:ml-auto sm:pl-14'}`}>
                    <Reveal dir={left ? 'left' : 'right'}>
                      <div className="group relative rounded-2xl border border-border bg-surface-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-lg font-bold text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-lg font-black text-content">{step.title}</h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-content-muted">{step.desc}</p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
