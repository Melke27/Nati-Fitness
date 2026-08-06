import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, ArrowRight, Users, CalendarClock, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui'
import { MEDIA } from '@/lib/media'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 120])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -bottom-32">
        <motion.img
          src={MEDIA.hero}
          alt="Coach Nati — professional male personal trainer in a premium gym"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-[65%_20%]"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
      <div className="grid-pattern absolute inset-0 opacity-15 [mask-image:radial-gradient(75%_70%_at_30%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />

      <div className="container-shell relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-surface-card/60 px-4 py-2 text-caption font-semibold text-white backdrop-blur-sm">
                <span className="flex items-center gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                Trusted Fitness Coach
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-8 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Transform
              <br />
              Your <span className="text-gradient-accent">Body</span>
              <br />
              <span className="relative inline-block">
                Your Life
                <svg className="absolute -bottom-2 left-0 w-full text-accent" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 9 C 30 3, 90 3, 118 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-body text-white/70">
              Personalized training, nutrition guidance and accountability to help you achieve your strongest version.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/programs">
                <Button variant="accent" size="lg" className="group rounded-full">
                  Start Training
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/#pricing">
                <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 text-white hover:border-accent/50 hover:bg-accent/10 hover:text-accent">
                  Book Consultation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <FloatingCard className="right-[6%] top-[20%] hidden lg:block" delay={0.5} duration={6}>
        <StatCard icon={Users} value="500+" label="Clients" />
      </FloatingCard>
      <FloatingCard className="right-[2%] top-[40%] hidden md:block" delay={0.8} duration={7}>
        <StatCard icon={HeartHandshake} value="98%" label="Success Rate" />
      </FloatingCard>
      <FloatingCard className="right-[10%] top-[64%] hidden lg:block" delay={1.1} duration={8}>
        <StatCard icon={CalendarClock} value="10+" label="Years Experience" />
      </FloatingCard>
    </section>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-lg font-bold leading-none text-white">{value}</p>
        <p className="mt-1 text-caption text-white/60">{label}</p>
      </div>
    </div>
  )
}

function FloatingCard({
  children,
  className,
  delay,
  duration,
}: {
  children: React.ReactNode
  className?: string
  delay: number
  duration: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${className ?? ''}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="glass rounded-2xl border border-border/60 px-5 py-4 shadow-card"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
