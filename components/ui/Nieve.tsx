'use client'

import { useEffect, useState } from 'react'

const NAVIDAD_DATE = new Date('2026-12-25T00:00:00-03:00')

interface Flake {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  drift: number
  char: string
}

// alternamos 4 colores que se ven bien sobre el fondo crema #FFFAF7
const FLAKE_COLORS = ['#5B9DD9', '#8BC4E8', '#5B9DD9', '#C47090', '#7BADD4', '#8BC4E8']
const CHARS        = ['❄',       '❅',       '❆',       '·',       '❄',       '❅'      ]

export default function Nieve() {
  const [flakes, setFlakes] = useState<Flake[]>([])

  useEffect(() => {
    if (new Date() >= NAVIDAD_DATE) return

    const generated: Flake[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left:     (i * 4.31 + 1.3)   % 100,
      size:     7  + (i * 2.9)      % 11,
      duration: 11 + (i * 3.7)      % 14,
      delay:    (i * 2.13)          % 18,
      opacity:  0.45 + (i * 0.021)  % 0.40,
      drift:    ((i % 2 === 0) ? 1 : -1) * (8 + (i * 3.1) % 22),
      char:     CHARS[i % CHARS.length],
    }))
    setFlakes(generated)
  }, [])

  if (!flakes.length) return null

  return (
    <>
      <style>{`
        @keyframes mk-snowfall {
          0%   { transform: translateY(-30px) translateX(0px);             opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.9; }
          100% { transform: translateY(105vh) translateX(var(--mk-drift)); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-snowflake { display: none !important; }
        }
      `}</style>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 9 }}
        aria-hidden="true"
      >
        {flakes.map((f) => (
          <span
            key={f.id}
            className="mk-snowflake absolute top-0 select-none"
            style={{
              left:      `${f.left}%`,
              fontSize:  `${f.size}px`,
              opacity:   f.opacity,
              color:     FLAKE_COLORS[f.id % FLAKE_COLORS.length],
              animation: `mk-snowfall ${f.duration}s ${f.delay}s linear infinite`,
              '--mk-drift': `${f.drift}px`,
              textShadow: `0 0 6px ${FLAKE_COLORS[f.id % FLAKE_COLORS.length]}66`,
            } as React.CSSProperties}
          >
            {f.char}
          </span>
        ))}
      </div>
    </>
  )
}
