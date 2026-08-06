import { Link } from 'react-router-dom'
import { Play, Star, ChevronRight } from 'lucide-react'
import { useDB } from '@/lib/store'
import { SectionHeading, Badge, Button } from '@/components/ui'
import { Reveal } from '@/components/motion'

export function HomeCourses() {
  const db = useDB()
  const courses = db.courses.slice(0, 3)

  return (
    <section id="courses" className="section-padding relative">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Courses"
          title={<>Learn from the <span className="text-gradient-accent">pros</span></>}
          description="In-depth video courses led by our certified coaches. Go at your own pace."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => {
            const author = db.partners.find((p) => p.slug === c.partnerSlug)
            return (
              <Reveal key={c.id} dir="up" delay={i * 0.06}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white opacity-0 transition-all group-hover:opacity-100">
                      <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                    </span>
                    {c.badge && <Badge className="absolute left-4 top-4" variant="accent">{c.badge}</Badge>}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-caption font-semibold uppercase tracking-wider text-content-faint">{c.level} · {c.hours}h</p>
                    <h3 className="mt-2 text-lg font-bold text-content">{c.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-content-muted">{c.description}</p>
                    {author && (
                      <div className="mt-3 flex items-center gap-2">
                        <img src={author.avatar} alt={author.name} className="h-6 w-6 rounded-full object-cover" />
                        <span className="text-caption font-semibold text-content-muted">{author.name}</span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-content">{c.price === 0 ? 'Free' : `ETB ${c.price.toLocaleString()}`}</span>
                        <span className="flex items-center gap-1 text-caption text-content-faint"><Star className="h-3 w-3 text-warning" fill="currentColor" /> {c.rating}</span>
                      </div>
                      <Button variant="accent" size="sm">Enroll</Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            View all courses <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
