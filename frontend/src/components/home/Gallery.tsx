import { useState } from 'react'
import { GALLERY_MEDIA } from '@/lib/media'
import { SectionHeading } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export function Gallery() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-surface">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Inside the <span className="text-gradient-accent">training experience</span></>}
          description="A look inside Coach Nati's coaching — focused sessions, strength work and the nutrition behind every transformation."
        />

        <Stagger className="columns-2 gap-4 sm:columns-3 lg:gap-6" amount={0.05}>
          {GALLERY_MEDIA.map((item, i) => (
            <StaggerItem key={item.key} className="mb-4 break-inside-avoid lg:mb-6">
              <Reveal dir="up" delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() => setActive(active === item.key ? null : item.key)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label={`View ${item.tag} photo`}
                >
                  <img
                    src={item.url}
                    alt={`${item.tag} training session`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-auto sm:min-h-[200px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 rounded-lg bg-accent/90 px-3 py-1 text-caption font-semibold text-white">
                    {item.tag}
                  </span>
                </button>
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
