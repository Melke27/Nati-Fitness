import { Link } from 'react-router-dom'
import { Clock3 } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/constants'
import { PageHero } from '@/components/PageHero'
import { Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Newsletter } from '@/components/home/Newsletter'
import { BLOG_COVERS } from '@/lib/media'

const CATEGORY_COLOR: Record<string, string> = {
  Workout: 'bg-accent/15 text-primary dark:text-accent border-accent/30',
  Nutrition: 'bg-success/10 text-success border-success/25',
  Lifestyle: 'bg-warning/10 text-warning border-warning/25',
  Fitness: 'bg-error/10 text-error border-error/25',
}

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        crumb="Blog"
        title={<>Training & nutrition <span className="text-gradient-accent">insights</span></>}
        description="Evidence-based articles to help you train smarter, eat better and live stronger."
      />

      <section className="pb-24">
        <div className="container-shell">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
            {BLOG_POSTS.map((post) => (
              <StaggerItem key={post.id}>
                <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                  <div className={`relative aspect-[16/10] overflow-hidden bg-surface-solid/60`}>
                    <img src={BLOG_COVERS[post.cover]} alt={post.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-4 top-4"><Badge className={CATEGORY_COLOR[post.category]}>{post.category}</Badge></span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold text-content-faint">{post.date} · {post.readMinutes} min read</p>
                    <h2 className="mt-2 text-lg font-black leading-snug text-content transition-colors group-hover:text-accent-dark dark:group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-content-muted line-clamp-3">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-accent-dark dark:text-accent">
                      Read article <Clock3 className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal dir="up" className="mt-16">
            <Newsletter />
          </Reveal>
        </div>
      </section>
    </>
  )
}
