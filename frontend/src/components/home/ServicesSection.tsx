import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { DynamicIcon } from '@/lib/icons'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading } from '@/components/ui'

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-surface-subtle/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Services"
          title={<>Everything you need, <span className="text-gradient-accent">nothing you don't</span></>}
          description="From 1:1 personal training to fully remote coaching — choose how you want to be coached."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-subtle/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lift dark:bg-surface-subtle">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-cta-gradient transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent dark:text-accent dark:group-hover:text-primary">
                    <DynamicIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-content-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-dark dark:group-hover:text-accent" />
                </div>
                <h3 className="text-base font-black text-content">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal dir="up" className="mt-12 text-center">
          <p className="text-sm font-semibold text-content-muted">
            Need something custom?{' '}
            <a href="/contact" className="font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent">
              Talk to me directly →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
