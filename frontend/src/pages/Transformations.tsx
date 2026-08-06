import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Transformations as TransformationsSection } from '@/components/home/Transformations'
import { TESTIMONIALS } from '@/lib/constants'
import { Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export default function Transformations() {
  return (
    <>
      <PageHero
        eyebrow="Transformations"
        crumb="Transformations"
        title={<>Proof beats <span className="text-gradient-accent">promises</span></>}
        description="Drag the sliders, read the stories, and see exactly what consistent coaching delivers."
      />
      <TransformationsSection />

      <section className="pb-24">
        <div className="container-shell">
          <h3 className="mb-8 text-center text-2xl font-black text-content">All client stories</h3>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface-subtle/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lift dark:bg-surface-subtle">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-1 text-warning">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 1l2.5 6.5H19l-5 4 1.8 7L10 14l-5.8 4.5L6 11.5l-5-4h6.5z" /></svg>
                      ))}
                    </div>
                    <Badge variant="accent">{t.result}</Badge>
                  </div>
                  <p className="flex-1 text-[15px] font-semibold leading-relaxed text-content">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-cta-gradient text-sm font-black text-primary">
                      {t.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-content">{t.name}</p>
                      <p className="text-xs text-content-muted">{t.program} · {t.months} months · {t.before} → {t.after}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal dir="up" className="mt-12 text-center">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-cta-gradient px-8 py-4 text-sm font-black text-primary shadow-glow transition-all duration-300 hover:-translate-y-1">
              Your story could be next — start today <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
