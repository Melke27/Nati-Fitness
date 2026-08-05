import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, BarChart3 } from 'lucide-react'
import { PROGRAMS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { DynamicIcon } from '@/lib/icons'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading, Badge } from '@/components/ui'
import { MEDIA } from '@/lib/media'

const levelColor: Record<string, string> = {
  Beginner: 'bg-success/10 text-success border-success/25',
  Intermediate: 'bg-warning/10 text-warning border-warning/25',
  Advanced: 'bg-error/10 text-error border-error/25',
  'All levels': 'bg-accent/10 text-primary border-accent/30 dark:text-accent',
}

const PROGRAM_IMG: Record<string, string> = {
  'weight-loss': MEDIA.runWoman,
  'muscle-gain': MEDIA.barbell,
  'strength-training': MEDIA.deadlift,
  'fat-burning': MEDIA.running,
  'online-coaching': MEDIA.coachAlt,
  'personal-training': MEDIA.trainer,
  'body-recomposition': MEDIA.womanFit,
  'womens-fitness': MEDIA.womanFit2,
  'mens-fitness': MEDIA.trainer,
  'home-workout': MEDIA.home,
  'athlete-program': MEDIA.plyo,
  'beginner-program': MEDIA.outdoor,
}

export function ProgramsSection({ limit }: { limit?: number }) {
  const list = limit ? PROGRAMS.slice(0, limit) : PROGRAMS
  return (
    <section id="programs" className="relative py-24 lg:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Programs"
          title={<>Pick your <span className="text-gradient-accent">transformation</span> plan</>}
          description="Every program is fully personalized after your onboarding assessment — workouts, nutrition and weekly coaching included."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
          {list.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <Link
                to={`/programs/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-lift dark:bg-surface-subtle"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={PROGRAM_IMG[p.slug] ?? MEDIA.gym}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div
                    className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl backdrop-blur-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: `${p.color}33`, color: '#fff' }}
                  >
                    <DynamicIcon name={p.icon} className="h-6 w-6" />
                  </div>
                  <Badge className={`absolute right-5 top-5 ${levelColor[p.level]}`}>{p.level}</Badge>
                  <div className="absolute inset-x-5 bottom-4">
                    <p className="text-sm font-semibold text-white/70">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-black text-content">{p.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">{p.description}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-bold text-content-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent-dark dark:text-accent" />
                      {p.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-accent-dark dark:text-accent" />
                      {p.goal}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {p.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-content-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <div>
                      <span className="text-2xl font-black text-content">{formatCurrency(p.price)}</span>
                      <span className="text-xs font-semibold text-content-faint">/mo</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-black text-content transition-all duration-300 group-hover:gap-3 group-hover:text-accent-dark dark:group-hover:text-accent">
                      View program <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal dir="up" className="mt-12 text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-black text-content transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
          >
            Explore all 12 programs <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
