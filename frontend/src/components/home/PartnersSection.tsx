import { Link } from 'react-router-dom'
import { BadgeCheck, Star, ChevronRight } from 'lucide-react'
import { useDB } from '@/lib/store'
import { SectionHeading } from '@/components/ui'
import { Reveal } from '@/components/motion'

export function PartnersSection() {
  const { partners } = useDB()

  return (
    <section id="trainers" className="section-padding relative bg-surface">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Our Trainers"
          title={<>Train with <span className="text-gradient-accent">verified experts</span></>}
          description="Top-rated coaches and specialists. Every trainer is certified, reviewed, and ready to help you transform."
        />

        {/* Marquee */}
        <div className="relative mb-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...partners, ...partners].map((p, i) => (
              <span key={`${p.id}-${i}`} className="whitespace-nowrap text-2xl font-bold tracking-tight text-content/30">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.id} dir="up" delay={i * 0.05}>
              <Link
                to={`/trainers/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <div className="relative h-56 overflow-hidden sm:h-60">
                  <img src={p.cover} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {p.rating && (
                    <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-caption font-semibold text-white backdrop-blur-md">
                      <Star className="h-3 w-3 text-warning" fill="currentColor" /> {p.rating}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5">
                    <img src={p.avatar} alt={p.name} className="h-16 w-16 shrink-0 rounded-2xl border-2 border-accent object-cover shadow-glow" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-base font-black leading-tight text-white">
                        {p.name}
                        {p.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />}
                      </p>
                      <p className="truncate text-caption font-semibold text-white/70">{p.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-content-muted">{p.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.specialties.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-lg bg-accent/10 px-2.5 py-1 text-caption font-semibold text-accent">{s}</span>
                    ))}
                  </div>
                  <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent">
                    View profile <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/trainers" className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-sm font-semibold text-content transition-all hover:border-accent hover:bg-accent/10">
            View all trainers <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
