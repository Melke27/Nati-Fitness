import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Dir = 'up' | 'down' | 'left' | 'right' | 'none' | 'blur' | 'scale'

const offsets: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
  blur: { x: 0, y: 24 },
  scale: { x: 0, y: 0 },
}

export function Reveal({
  children,
  dir = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode
  dir?: Dir
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
}) {
  const { x, y } = offsets[dir]
  const isBlur = dir === 'blur'
  const isScale = dir === 'scale'
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: isScale ? 0.9 : 1, filter: isBlur ? 'blur(14px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function Stagger({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}
