import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useDB } from '@/lib/store'
import { Reveal } from '@/components/motion'
import { SectionHeading, Button } from '@/components/ui'
import { DynamicIcon } from '@/lib/icons'

export function ServicesSection() {
  const db = useDB()
  const featuredServices = db.services.slice(0, 3)

  return (
    <section id="services" className="section-padding relative">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Services"
          title={<>Support that fits your <span className="text-gradient-accent">lifestyle</span></>}
          description="Choose the service that matches your current needs — from personalized coaching to remote accountability and ongoing support."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-card-hover"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary dark:text-accent dark:group-hover:text-primary">
                <DynamicIcon name={service.icon} className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-black text-content">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">{service.description}</p>

              <ul className="mt-5 space-y-2.5">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-content-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="md" className="mt-7 w-full group/btn">
                <Link to="/services">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <Reveal dir="up" className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-black text-content transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
          >
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
