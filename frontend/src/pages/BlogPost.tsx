import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, Tag, ChevronRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/constants'
import { PageHero } from '@/components/PageHero'
import { Badge } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { Newsletter } from '@/components/home/Newsletter'
import { CTABand } from '@/components/home/CTABand'
import { BLOG_COVERS } from '@/lib/media'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0]
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageHero crumb="Blog" eyebrow={post.category} title={post.title} description={`${post.date} · ${post.readMinutes} min read · by ${post.author}`} />

      <article className="pb-24">
        <div className="container-shell max-w-3xl">
          <Reveal dir="up">
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-surface-solid/60">
              <img src={BLOG_COVERS[post.cover]} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
          </Reveal>

          <Reveal dir="up">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Badge variant="accent">{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-sm font-bold text-content-muted"><Clock3 className="h-4 w-4" /> {post.readMinutes} min read</span>
              <span className="text-sm font-bold text-content-muted">{post.author}</span>
            </div>
          </Reveal>

          <div className="space-y-6">
            {post.content.map((para, i) => (
              <Reveal key={i} dir="up" delay={i * 0.04}>
                <p className="text-base leading-relaxed text-content-muted sm:text-lg" style={{ color: i === 0 ? undefined : undefined }}>
                  {i === 0 ? <span className="float-left mr-3 text-6xl font-black leading-[0.85] text-accent-dark dark:text-accent">{para.charAt(0)}</span> : null}
                  {i === 0 ? para.slice(1) : para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up">
            <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface-subtle/60 p-6 dark:bg-surface-subtle">
              <Tag className="h-5 w-5 text-accent-dark dark:text-accent" />
              {['Training', 'Nutrition', 'Recovery'].map((t) => (
                <span key={t} className="rounded-full border border-border px-4 py-1.5 text-xs font-bold text-content-muted">{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal dir="up" className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black text-accent-dark underline-offset-4 hover:underline dark:text-accent">
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </Reveal>

          <Reveal dir="up" className="mt-12">
            <Newsletter />
          </Reveal>
        </div>

        <div className="container-shell mt-20 max-w-5xl">
          <h3 className="mb-6 text-xl font-black text-content">Keep reading</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-surface-subtle/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card dark:bg-surface-subtle">
                <Badge variant="outline">{p.category}</Badge>
                <p className="mt-3 font-black leading-snug text-content transition-colors group-hover:text-accent-dark dark:group-hover:text-accent">{p.title}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-accent-dark dark:text-accent">
                  Read <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <CTABand />
    </>
  )
}
