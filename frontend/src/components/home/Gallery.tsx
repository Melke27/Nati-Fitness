import { motion } from 'framer-motion'
import { Play, Plus } from 'lucide-react'
import { GALLERY_ITEMS } from '@/lib/constants'
import { SectionHeading } from '@/components/ui'
import { GALLERY_MEDIA } from '@/lib/media'

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Workout gallery"
          title={<>Inside the <span className="text-gradient-accent">training life</span></>}
          description="Gym, home, outdoors — this is what coaching with Coach Nati actually looks like."
        />

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY_ITEMS.map((g, i) => {
            const photo = GALLERY_MEDIA[i % GALLERY_MEDIA.length]
            return (
              <motion.div
                key={g.img}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 4) * 0.07 }}
                className={`group relative break-inside-avoid overflow-hidden rounded-2xl ${g.span === 'tall' ? 'aspect-[3/4]' : g.span === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}
              >
                <img
                  src={photo.url}
                  alt={photo.tag}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <span className="text-sm font-black text-white">{g.tag}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
