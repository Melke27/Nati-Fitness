import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui'

export function PlatformCTA() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface-card px-8 py-16 text-center sm:px-16 lg:py-24"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">#GetYourCourses</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to start your transformation?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-content-muted">
              Browse courses or start your transformation with Coach Nati today.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="accent" size="lg" className="group">
                <Link to="/courses">
                  <GraduationCap className="h-5 w-5" />
                  Browse Courses
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">Try For 14 Days</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
