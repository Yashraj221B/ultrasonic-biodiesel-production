import { useMemo } from 'react'

interface BubbleConfig {
  size: number
  left: string
  duration: number
  delay: number
  opacity: number
}

export default function FloatingBubbles({ count = 12 }: { count?: number }) {
  const bubbles = useMemo<BubbleConfig[]>(() =>
    Array.from({ length: count }, () => ({
      size: 8 + Math.random() * 28,
      left: `${5 + Math.random() * 90}%`,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.35,
    })), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: `${10 + Math.random() * 60}%`,
            '--duration': `${b.duration}s`,
            '--delay': `${b.delay}s`,
            opacity: b.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
