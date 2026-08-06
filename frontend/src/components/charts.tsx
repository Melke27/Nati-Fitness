import { useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Point {
  label: string
  value: number
}

export function LineChart({
  data,
  className,
  stroke = '#E11D48',
  height = 180,
}: {
  data: Point[]
  className?: string
  stroke?: string
  height?: number
}) {
  const id = useId().replace(/:/g, '')
  const W = 600
  const H = height
  const PAD = 24

  if (data.length === 0) return null
  const min = Math.min(...data.map((d) => d.value))
  const max = Math.max(...data.map((d) => d.value))
  const range = max - min || 1
  const stepX = (W - PAD * 2) / Math.max(1, data.length - 1)

  const coords = data.map((d, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - ((d.value - min) / range) * (H - PAD * 2),
    ...d,
  }))

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${H - PAD} L ${coords[0].x} ${H - PAD} Z`

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Progress chart">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={PAD} x2={W - PAD} y1={H * g} y2={H * g} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 6" />
        ))}
        <motion.path
          d={areaPath}
          fill={`url(#area-${id})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {coords.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.x}
            cy={c.y}
            r="4"
            fill={stroke}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between px-2 text-[10px] font-bold text-content-faint">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

export function BarChart({ data, className, height = 180, color = '#E11D48' }: { data: Point[]; className?: string; height?: number; color?: string }) {
  const W = 600
  const H = height
  const PAD = 24
  if (data.length === 0) return null
  const max = Math.max(...data.map((d) => d.value)) || 1
  const stepX = (W - PAD * 2) / data.length
  const bw = Math.min(48, stepX * 0.55)
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Bar chart">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={PAD} x2={W - PAD} y1={H * g} y2={H * g} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 6" />
        ))}
        {data.map((d, i) => {
          const x = PAD + i * stepX + (stepX - bw) / 2
          const y = H - PAD - (d.value / max) * (H - PAD * 2)
          const h = (d.value / max) * (H - PAD * 2)
          const grad = `bar-${i}`
          return (
            <g key={i}>
              <defs>
                <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="1" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <motion.rect
                x={x}
                y={H - PAD}
                width={bw}
                rx="8"
                fill={`url(#${grad})`}
                initial={{ height: 0, y: H - PAD }}
                whileInView={{ height: h, y }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              />
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex justify-between px-2 text-[10px] font-bold text-content-faint">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

export function RingChart({
  value,
  size = 140,
  stroke = 10,
  color = '#E11D48',
  label,
  sublabel,
  className,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  label?: string
  sublabel?: string
  className?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('relative inline-grid place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={sublabel ?? label}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * clamped) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-black leading-none">{label ?? `${Math.round(clamped)}%`}</p>
        {sublabel && <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-content-faint">{sublabel}</p>}
      </div>
    </div>
  )
}
