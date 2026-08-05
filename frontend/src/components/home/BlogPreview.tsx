import { Link } from 'react-router-dom'
import { ArrowRight, Clock3 } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/constants'
import { SectionHeading, Badge } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { BLOG_COVERS } from '@/lib/media'

const CATEGORY_COLOR: Record<string, string> = {
  Workout: 'bg-accent/15 text-primary dark:text-accent border-accent/30',
  Nutrition: 'bg-success/10 text-success border-success/25',
  Lifestyle: 'bg-warning/10 text-warning border-warning/25',
  Fitness: 'bg-error/10 text-error border-error/25',
}

export function BlogPreview({ limit = 3 }: { limit?: number }) {
  const posts = BLOG_POSTS.slice(0, limit)
  return (
    <section id="blog" className="relative bg-surface-subtle/50 py-24 lg:py-32">
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Blog"
            title={<>Train smart, <span className="text-gradient-accent">learn more</span></>}
            description="Evidence-based training, nutrition and lifestyle content from the coaching desk."
          />
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-black text-content transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
            >
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id} className="h-full">
              <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-solid/60">
                  <img src={BLOG_COVERS[post.cover]} alt={post.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-4 top-4"><Badge className={CATEGORY_COLOR[post.category]}>{post.category}</Badge></span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold text-content-faint">{post.date} · {post.readMinutes} min read</p>
                  <h3 className="mt-2 text-lg font-black leading-snug text-content transition-colors group-hover:text-accent-dark dark:group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-content-muted line-clamp-3">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-content transition-colors group-hover:text-accent-dark dark:group-hover:text-accent">
                    Read article <Clock3 className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
