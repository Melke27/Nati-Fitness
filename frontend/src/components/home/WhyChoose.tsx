import { WHY_CHOOSE } from '@/lib/constants'
import { DynamicIcon } from '@/lib/icons'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading } from '@/components/ui'

export function WhyChoose() {
  return (
    <section id="why" className="relative overflow-hidden bg-surface-subtle/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Why Coach Nati"
          title={<>Coaching that works <span className="text-gradient-accent">around your life</span>, not against it</>}
          description="Every element of the system is designed for one thing: making sure you show up, stay consistent and see results you can measure."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-subtle/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/15" />
                <div className="relative">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary dark:text-accent dark:group-hover:text-primary">
                    <DynamicIcon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-black text-content">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted">{f.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal dir="up" className="mt-12 text-center">
          <p className="text-sm font-semibold text-content-muted">
            Not sure which program fits?{' '}
            <a href="/#pricing" className="font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent">
              Take the free assessment →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
