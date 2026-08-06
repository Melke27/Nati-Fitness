import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, GraduationCap } from 'lucide-react'

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-[65] grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-card text-content shadow-card transition-all duration-300 hover:border-accent/30 hover:text-accent"
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
              <p className="truncate text-sm font-semibold text-content">Train with the best, anytime, anywhere</p>
              <p className="text-caption text-content-muted">Browse programs, courses, and personalized plans.</p>
            </div>
            <Link
              to="/courses"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-accent-hover active:scale-[0.98]"
            >
              <GraduationCap className="h-4 w-4" />
              Browse Courses
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-[99] grid place-items-center bg-primary"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid h-16 w-16 place-items-center"
        >
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-accent/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-2 rounded-xl border-2 border-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
          <span className="text-xl font-bold text-accent">N</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-caption font-semibold uppercase tracking-[0.25em] text-content-muted"
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
      className="fixed inset-x-0 top-0 z-[75] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
