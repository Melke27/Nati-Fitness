import { cn } from '@/lib/utils'

/* Stylized athletic figure — pure SVG, no photos needed. */
export function AthleteFigure({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 320 560" className={className} role="img" aria-label="Stylized athlete silhouette">
      <defs>
        <linearGradient id="ath-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CFF4F" />
          <stop offset="100%" stopColor="#3FBF1E" />
        </linearGradient>
        <linearGradient id="ath-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CFF4F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7CFF4F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={flip ? 'translate(320 0) scale(-1 1)' : undefined}>
        {/* legs */}
        <path
          d="M150 300 L146 340 L132 500 L112 502 L96 496 L128 402 L132 372 L122 372 L104 486 L84 484 L76 474 L106 360 L116 344 L120 304 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M172 300 L176 340 L190 500 L210 502 L226 496 L194 402 L190 372 L200 372 L218 486 L238 484 L246 474 L216 360 L206 344 L202 304 Z"
          fill="url(#ath-body)"
        />
        {/* torso */}
        <path
          d="M120 150 C 120 196, 118 230, 124 282 L 198 282 C 204 230, 202 196, 202 150 C 202 96, 190 72, 161 70 C 132 72, 120 96, 120 150 Z"
          fill="url(#ath-body)"
        />
        {/* shoulders + arms */}
        <path
          d="M120 118 C 96 122, 78 136, 68 162 L 44 194 L 52 208 L 84 176 C 92 166, 100 152, 110 142 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M202 118 C 226 122, 244 136, 254 162 L 278 194 L 270 208 L 238 176 C 230 166, 222 152, 212 142 Z"
          fill="url(#ath-body)"
        />
        {/* head */}
        <circle cx="161" cy="42" r="26" fill="url(#ath-body)" />
      </g>
    </svg>
  )
}

/* Parametric body silhouette for before/after comparisons */
export function BodyShape({
  className,
  variant = 'before',
  accent = '#7CFF4F',
}: {
  className?: string
  variant?: 'before' | 'after'
  accent?: string
}) {
  const isAfter = variant === 'after'
  return (
    <svg viewBox="0 0 200 420" className={className} aria-hidden>
      <defs>
        <linearGradient id={`body-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="100" cy="36" r={isAfter ? 21 : 24} fill={`url(#body-${variant})`} />
      {/* torso */}
      <path
        d={
          isAfter
            ? 'M 64 70 C 62 150, 62 190, 70 250 L 130 250 C 138 190, 138 150, 136 70 C 136 44, 128 40, 100 40 C 72 40, 64 44, 64 70 Z'
            : 'M 58 66 C 54 150, 54 196, 62 252 L 138 252 C 146 196, 146 150, 142 66 C 142 48, 134 42, 100 42 C 66 42, 58 48, 58 66 Z'
        }
        fill={`url(#body-${variant})`}
      />
      {/* arms */}
      <path
        d={
          isAfter
            ? 'M 64 80 C 46 92, 34 108, 28 130 L 16 168 L 28 176 L 42 140 C 48 124, 54 106, 62 92 Z M 136 80 C 154 92, 166 108, 172 130 L 184 168 L 172 176 L 158 140 C 152 124, 146 106, 138 92 Z'
            : 'M 60 74 C 40 90, 28 108, 22 134 L 10 174 L 24 182 L 38 144 C 44 126, 50 106, 60 88 Z M 140 74 C 160 90, 172 108, 178 134 L 190 174 L 176 182 L 162 144 C 156 126, 150 106, 140 88 Z'
        }
        fill={`url(#body-${variant})`}
      />
      {/* legs */}
      <path
        d={
          isAfter
            ? 'M 78 250 L 74 300 L 62 396 L 80 402 L 96 302 L 96 250 Z M 122 250 L 126 300 L 138 396 L 120 402 L 104 302 L 104 250 Z'
            : 'M 74 252 L 68 306 L 54 398 L 74 404 L 92 308 L 92 252 Z M 126 252 L 132 306 L 146 398 L 126 404 L 108 308 L 108 252 Z'
        }
        fill={`url(#body-${variant})`}
      />
    </svg>
  )
}

/* Abstract coil / dumbbell ornament */
export function CoilOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <linearGradient id="coil-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CFF4F" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#59E62A" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {[12, 20, 28].map((r, i) => (
        <path
          key={r}
          d={`M ${100 - r * 3} ${100} a ${r} ${r} 0 1 0 ${r * 6} 0 a ${r} ${r} 0 1 0 -${r * 6} 0`}
          fill="none"
          stroke="url(#coil-g)"
          strokeWidth={6 - i}
          strokeLinecap="round"
          opacity={0.5 + i * 0.16}
        />
      ))}
    </svg>
  )
}

export function Rings({ className, speed = 'animate-spin-slow' }: { className?: string; speed?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn(speed, className)} aria-hidden>
      <defs>
        <linearGradient id="rings-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CFF4F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#59E62A" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {[60, 95, 130, 165, 200].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="url(#rings-g)"
          strokeWidth={r === 200 ? 1 : 2}
          strokeDasharray={`${(r * Math.PI) / 3} ${(r * Math.PI) / 1.5}`}
          opacity={0.25 + i * 0.14}
          transform={`rotate(${i * 18} 200 200)`}
        />
      ))}
    </svg>
  )
}
