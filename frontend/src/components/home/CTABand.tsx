import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarClock, Sparkles } from 'lucide-react'
import { Rings } from '@/components/visuals'

export function CTABand() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[36px] bg-primary px-8 py-16 text-center text-white sm:px-16 lg:py-24"
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />
          <Rings className="pointer-events-none absolute right-8 top-8 h-64 w-64 opacity-30" />

          <div className="relative mx-auto max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-accent"
            >
              <Sparkles className="h-3.5 w-3.5" /> Limited availability
            </motion.span>

            <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Your transformation
              <br />
              starts <span className="text-gradient-accent">today.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Only 3 coaching spots open this month. Book your free consultation now — and walk away with a clear,
              personalized plan regardless.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#pricing"
                className="group flex items-center gap-2 rounded-full bg-cta-gradient px-8 py-4 text-base font-black text-primary shadow-glow transition-all duration-300 hover:-translate-y-1"
              >
                <CalendarClock className="h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/programs"
                className="rounded-full border border-white/25 px-8 py-4 text-base font-black text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                Browse Programs
              </Link>
            </div>

            <p className="mt-6 text-xs font-semibold text-white/40">
              14-day money-back guarantee · Cancel anytime · Trusted by 500+ clients
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
