import { PLATFORM_WHY } from '@/lib/constants'
import { DynamicIcon } from '@/lib/icons'
import { SectionHeading } from '@/components/ui'
import { Stagger, StaggerItem } from '@/components/motion'

export function WhyPlatform() {
  return (
    <section id="why" className="section-padding relative bg-surface-subtle">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Why Coach Nati"
          title={<>Why train with <span className="text-gradient-accent">Coach Nati?</span></>}
          description="The future of fitness is digital. Your bridge to proven programs, personal coaching, and a clear path to real results."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_WHY.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-2xl border border-border bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <DynamicIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-card-title font-semibold text-content">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-content-muted">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
