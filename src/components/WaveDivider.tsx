interface WaveDividerProps {
  flip?: boolean
  color?: string
  opacity?: number
}

export default function WaveDivider({ flip = false, color = '#020408', opacity = 1 }: WaveDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none pointer-events-none ${flip ? 'rotate-180' : ''}`} style={{ height: 80 }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        style={{ opacity }}
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
        <path
          d="M0,55 C360,20 720,70 1080,30 C1260,10 1380,50 1440,55 L1440,80 L0,80 Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
