import { cn } from '@/lib/utils'

/* Stylized athletic figure — pure SVG */
export function AthleteFigure({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 320 560" className={className} role="img" aria-label="Stylized athlete silhouette">
      <defs>
        <linearGradient id="ath-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
      <g transform={flip ? 'translate(320 0) scale(-1 1)' : undefined}>
        <path
          d="M150 300 L146 340 L132 500 L112 502 L96 496 L128 402 L132 372 L122 372 L104 486 L84 484 L76 474 L106 360 L116 344 L120 304 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M172 300 L176 340 L190 500 L210 502 L226 496 L194 402 L190 372 L200 372 L218 486 L238 484 L246 474 L216 360 L206 344 L202 304 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M120 150 C 120 196, 118 230, 124 282 L 198 282 C 204 230, 202 196, 202 150 C 202 96, 190 72, 161 70 C 132 72, 120 96, 120 150 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M120 118 C 96 122, 78 136, 68 162 L 44 194 L 52 208 L 84 176 C 92 166, 100 152, 110 142 Z"
          fill="url(#ath-body)"
        />
        <path
          d="M202 118 C 226 122, 244 136, 254 162 L 278 194 L 270 208 L 238 176 C 230 166, 222 152, 212 142 Z"
          fill="url(#ath-body)"
        />
        <circle cx="161" cy="42" r="26" fill="url(#ath-body)" />
      </g>
    </svg>
  )
}

export function Rings({ className, speed = 'animate-spin-slow' }: { className?: string; speed?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn(speed, className)} aria-hidden>
      <defs>
        <linearGradient id="rings-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E11D48" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.15" />
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
