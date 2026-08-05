import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUp, MessageCircle, CalendarClock } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { getSession } from '@/lib/store'
import { cn } from '@/lib/utils'

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi Coach Nati! I want to transform my body. Can we talk? 💪')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-[#25D366]/40" />
      <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
    </a>
  )
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-[65] grid h-12 w-12 place-items-center rounded-full border border-border bg-surface-solid text-content-inverse shadow-lift transition hover:-translate-y-1"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()
  const session = getSession()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-border glass px-4 py-3"
        >
          <div className="container-shell flex items-center justify-between gap-4">
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-black text-content">Only 3 coaching spots left this month</p>
              <p className="text-xs text-content-muted">Book a free consultation before they're gone.</p>
            </div>
            <Link
              to={session ? (session.role === 'admin' ? '/admin' : '/dashboard') : '/#pricing'}
              className="flex shrink-0 items-center gap-2 rounded-full bg-cta-gradient px-6 py-3 text-sm font-black text-primary shadow-glow transition hover:-translate-y-0.5"
            >
              <CalendarClock className="h-4 w-4" />
              Book Free Consultation
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MouseFollower() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const dotX = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.4 })
  const dotY = useSpring(my, { stiffness: 900, damping: 60, mass: 0.4 })
  const ringX = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.6 })
  const ringY = useSpring(my, { stiffness: 180, damping: 24, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a,button,[role="button"],input,select,textarea,summary'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-2.5 w-2.5 rounded-full bg-accent-dark md:block"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[94] hidden h-9 w-9 rounded-full border border-accent-dark/50 transition-colors duration-200 md:block',
          hovering && 'border-accent bg-accent/10',
        )}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[99] grid place-items-center bg-primary"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid h-20 w-20 place-items-center"
        >
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-accent/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-2 rounded-xl border-2 border-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <span className="text-2xl font-black text-accent">N</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-bold uppercase tracking-[0.3em] text-white/60"
        >
          Coach Nati
        </motion.p>
      </div>
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[75] h-1 origin-left bg-cta-gradient"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
