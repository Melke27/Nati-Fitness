import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, ArrowRight, Users, CalendarClock, HeartHandshake, Headphones } from 'lucide-react'
import { Button } from '@/components/ui'
import { MEDIA } from '@/lib/media'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 160])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-16">
      {/* Cinematic background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -bottom-40">
        <motion.img
          src={MEDIA.hero}
          alt="Coach Nati — professional male personal trainer in a premium gym"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-[65%_20%]"
          loading="eager"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/20" />
      <div className="grid-pattern absolute inset-0 opacity-20 [mask-image:radial-gradient(75%_70%_at_30%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-shell relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-black/40 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
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
              className="mt-7 text-6xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Transform
              <br />
              Your <span className="text-gradient-accent">Body</span>
              <br />
              <span className="relative inline-block">
                Your Life
                <svg className="absolute -bottom-3 left-0 w-full text-accent" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9 C 30 3, 90 3, 118 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Personalized training, nutrition guidance and accountability to help you achieve your strongest version.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/programs">
                <Button variant="accent" size="lg" className="group text-base">
                  Start Training
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </Link>
              <Link to="/#pricing">
                <Button variant="outline" size="lg" className="group border-white/25 bg-white/5 text-white hover:border-accent hover:text-accent">
                  Book Consultation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating trust cards */}
      <FloatingCard className="right-[6%] top-[18%] hidden lg:block" delay={0.6} duration={6}>
        <StatCard icon={Users} value="500+" label="Successful Transformations" />
      </FloatingCard>
      <FloatingCard className="right-[2%] top-[38%] hidden md:block" delay={1} duration={7}>
        <StatCard icon={CalendarClock} value="10+" label="Years Experience" />
      </FloatingCard>
      <FloatingCard className="right-[10%] top-[58%] hidden lg:block" delay={1.4} duration={8}>
        <StatCard icon={HeartHandshake} value="98%" label="Client Satisfaction" />
      </FloatingCard>
      <FloatingCard className="right-[4%] top-[80%] hidden md:block" delay={1.8} duration={6.5}>
        <StatCard icon={Headphones} value="24/7" label="Coach Support" />
      </FloatingCard>
    </section>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-lg font-black leading-none text-white">{value}</p>
        <p className="mt-1 text-[11px] font-semibold text-white/60">{label}</p>
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
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${className ?? ''}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="glass rounded-2xl border border-white/15 bg-black/40 px-5 py-4 shadow-lift backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
