import { Link } from 'react-router-dom'
import { Flame, Drumstick, Wheat, Droplets, ArrowRight } from 'lucide-react'
import { NUTRITION_TIPS, MEAL_IDEAS } from '@/lib/constants'
import { DynamicIcon } from '@/lib/icons'
import { SectionHeading, Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { MEDIA } from '@/lib/media'

const MEAL_IMG = [MEDIA.salad, MEDIA.mealPrep, MEDIA.nutrition, MEDIA.supplements]

export function Nutrition() {
  return (
    <section id="nutrition" className="relative py-24 lg:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Nutrition"
          title={<>Eat well. <span className="text-gradient-accent">Get results.</span></>}
          description="Flexible meal plans, macro guidance and habits that fit real life — because sustainability is the secret."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Stagger className="grid content-start gap-4 sm:grid-cols-2">
            {NUTRITION_TIPS.map((tip) => (
              <StaggerItem key={tip.title}>
                <div className="group h-full rounded-2xl border border-border bg-surface-subtle/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card dark:bg-surface-subtle">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-primary transition group-hover:bg-accent dark:text-accent dark:group-hover:text-primary">
                    <DynamicIcon name={tip.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-content">{tip.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-content-muted">{tip.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div>
            <Reveal dir="left">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-black text-content">Sample meals from the plan</h3>
                <Badge variant="accent">Macro-balanced</Badge>
              </div>
            </Reveal>
            <div className="space-y-3">
              {MEAL_IDEAS.map((meal, i) => (
                <Reveal key={meal.name} dir="left" delay={i * 0.06}>
                  <div className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card dark:bg-surface-subtle">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                      <img src={MEAL_IMG[i % MEAL_IMG.length]} alt={meal.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute inset-0 grid place-items-center text-xl drop-shadow">{meal.emoji}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-content">{meal.name}</p>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] font-bold text-content-muted">
                        <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-warning" /> {meal.kcal} kcal</span>
                        <span className="flex items-center gap-1"><Drumstick className="h-3 w-3 text-accent-dark dark:text-accent" /> {meal.p}g P</span>
                        <span className="flex items-center gap-1"><Wheat className="h-3 w-3 text-warning" /> {meal.c}g C</span>
                        <span className="flex items-center gap-1"><Droplets className="h-3 w-3 text-error" /> {meal.f}g F</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-content-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-dark dark:group-hover:text-accent" />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal dir="up" className="mt-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent"
              >
                Get your full personalized meal plan <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
