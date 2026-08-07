import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Star, Trophy, Users, Dumbbell } from 'lucide-react'
import { useDB } from '@/lib/store'
import { SectionHeading, Button } from '@/components/ui'
import { Reveal } from '@/components/motion'

export function PartnersSection() {
  const { partners } = useDB()
  const coach = partners.find((p) => p.slug === 'coach-nati') ?? partners[0]

  if (!coach) return null

  const highlights = [
    { icon: Trophy, label: `${coach.experience}+ years` },
    { icon: Users, label: `${coach.clients}+ clients coached` },
    { icon: Dumbbell, label: `${coach.programs} signature programs` },
  ]

  return (
    <section id="trainers" className="section-padding relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[140px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Your Head Coach"
          title={<>Train with <span className="text-gradient-accent">Coach Nati</span></>}
          description="A single, certified, elite transformation coach — every program engineered by Coach Nati for measurable results."
        />

        <div className="mx-auto max-w-3xl">
          <Reveal dir="up">
            <div className="group overflow-hidden rounded-3xl border border-border bg-surface-card shadow-lift transition-all duration-300 hover:border-accent/40">
              <div className="grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[280px] overflow-hidden">
                  <img src={coach.cover} alt={coach.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-caption font-bold text-white backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" /> {coach.rating} rating
                  </div>
                </div>

                <div className="flex flex-col p-7 sm:p-8">
                  <p className="flex items-center gap-1 text-lg font-black text-content">
                    {coach.name} <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
                  </p>
                  <p className="text-caption font-semibold text-content-muted">{coach.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-content-muted">{coach.bio}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {highlights.map((h) => (
                      <span key={h.label} className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-accent">
                        <h.icon className="h-3.5 w-3.5" /> {h.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {coach.specialties.map((s) => (
                      <span key={s} className="rounded-lg bg-surface-subtle px-2.5 py-1 text-caption font-semibold text-content-muted">{s}</span>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Button asChild variant="accent" size="lg" className="group">
                      <Link to={`/trainers/${coach.slug}`}>
                        Meet Coach Nati
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}