import { Link, useParams } from 'react-router-dom'
import { Check, Clock, BarChart3, ArrowRight, ChevronRight, Star, ShieldCheck, Users, Target } from 'lucide-react'
import { PROGRAMS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { DynamicIcon } from '@/lib/icons'
import { PageHero } from '@/components/PageHero'
import { Button, Badge } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { MEDIA } from '@/lib/media'

const levelColor: Record<string, string> = {
  Beginner: 'bg-success/10 text-success border-success/25',
  Intermediate: 'bg-warning/10 text-warning border-warning/25',
  Advanced: 'bg-error/10 text-error border-error/25',
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

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = PROGRAMS.find((p) => p.slug === slug) ?? PROGRAMS[0]
  const related = PROGRAMS.filter((p) => p.id !== program.id).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Program"
        crumb={program.name}
        title={<>{program.name} <span className="text-gradient-accent">Program</span></>}
        description={program.description}
      />

      <section className="pb-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          {/* Left */}
          <div>
            <Reveal dir="up">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-primary">
                <img src={PROGRAM_IMG[program.slug] ?? MEDIA.gym} alt={program.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[90px]" />
                <div className="relative p-8 sm:p-10">
                <div className="flex items-center gap-6">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl backdrop-blur" style={{ background: `${program.color}33`, color: program.color }}>
                    <DynamicIcon name={program.icon} className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{program.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-accent">{program.tagline}</p>
                  </div>
                </div>

                <div className="relative mt-8 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/5 p-4 text-center backdrop-blur">
                    <Clock className="mx-auto mb-2 h-5 w-5 text-accent" />
                    <p className="text-sm font-black text-white">{program.duration}</p>
                    <p className="text-[11px] font-semibold text-white/50">Duration</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-center backdrop-blur">
                    <BarChart3 className="mx-auto mb-2 h-5 w-5 text-accent" />
                    <p className="text-sm font-black text-white">{program.level}</p>
                    <p className="text-[11px] font-semibold text-white/50">Level</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-center backdrop-blur">
                    <Target className="mx-auto mb-2 h-5 w-5 text-accent" />
                    <p className="text-sm font-black text-white">{program.goal}</p>
                    <p className="text-[11px] font-semibold text-white/50">Goal</p>
                  </div>
                </div>

                <div className="relative mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed text-white/70">
                    Backed by a <span className="font-black text-white">14-day money-back guarantee</span>. If you don't love the plan, you don't pay.
                  </p>
                </div>
              </div>
            </div>
            </Reveal>

            <Reveal dir="up" className="mt-10">
              <h3 className="mb-5 text-xl font-black text-content">What you get</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[...program.benefits, ...program.features].map((b) => (
                  <div key={b} className="flex items-start gap-3 rounded-xl border border-border bg-surface-subtle/60 px-4 py-3.5 dark:bg-surface-subtle">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-content">{b}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — sticky card */}
          <div>
            <Reveal dir="left" className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-border bg-surface-subtle/70 p-8 shadow-card dark:bg-surface-subtle">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-black text-content">{formatCurrency(program.price)}</span>
                    <span className="text-sm font-semibold text-content-faint">/month</span>
                  </div>
                  <Badge variant="accent">
                    <Star className="h-3 w-3" fill="currentColor" /> 5.0 rated
                  </Badge>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-content-muted">Free assessment · Cancel anytime · 14-day guarantee</p>

                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {program.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm font-semibold text-content">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-primary dark:text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link to={`/checkout?program=${program.id}&plan=pro`} className="mt-8 block">
                  <Button variant="accent" size="lg" className="group w-full">
                    Start {program.name} <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link to="/contact" className="mt-3 block">
                  <Button variant="outline" size="lg" className="w-full">
                    Book free consultation
                  </Button>
                </Link>

                <div className="mt-6 flex items-center justify-center gap-6 text-xs font-bold text-content-muted">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent-dark dark:text-accent" /> 500+ clients</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent-dark dark:text-accent" /> Guarantee</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        <div className="container-shell mt-20">
          <h3 className="mb-6 text-xl font-black text-content">Other programs you might like</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card dark:bg-surface-subtle"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={PROGRAM_IMG[p.slug] ?? MEDIA.gym} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl backdrop-blur" style={{ background: `${p.color}33`, color: '#fff' }}>
                    <DynamicIcon name={p.icon} className="h-4 w-4" />
                  </div>
                  <Badge className={`absolute right-4 top-4 ${levelColor[p.level]}`}>{p.level}</Badge>
                  <p className="absolute bottom-3 left-4 font-black text-white">{p.name}</p>
                </div>
                <div className="p-5">
                  <p className="text-xs text-content-muted">{p.duration} · {formatCurrency(p.price)}/mo</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-accent-dark dark:text-accent">
                    View <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
