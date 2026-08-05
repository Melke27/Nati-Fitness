import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Star } from 'lucide-react'
import { AthleteFigure } from '@/components/visuals'

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-accent/15 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <Zap className="h-6 w-6" fill="currentColor" />
            </span>
            <span className="text-xl font-black text-white">Coach<span className="text-accent">Nati</span></span>
          </Link>

          <div className="relative mx-auto w-full max-w-sm">
            <AthleteFigure className="mx-auto h-[380px] opacity-90 drop-shadow-[0_30px_50px_rgba(124,255,79,0.25)]" />
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1 text-warning"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </motion.div>
            <p className="mt-3 text-lg font-black leading-snug text-white">
              “Best decision I made for my body. The coaching system is on another level.”
            </p>
            <p className="mt-2 text-sm text-white/50">— Sarah M., lost 14 kg</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
