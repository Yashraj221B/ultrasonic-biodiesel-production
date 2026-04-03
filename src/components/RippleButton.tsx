import { useRef, MouseEvent, ReactNode } from 'react'

interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'neon' | 'ghost'
}

export default function RippleButton({ children, className = '', onClick, variant = 'primary' }: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const ripple = document.createElement('span')
    ripple.className = 'ripple-wave'
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
    onClick?.()
  }

  const base = 'ripple-btn font-orbitron tracking-wider transition-all duration-300'
  const variants = {
    primary: 'btn-primary',
    neon:    'btn-neon',
    ghost:   'glass glow-border glow-border-hover text-white/80 hover:text-white px-8 py-4 rounded-lg text-sm',
  }

  return (
    <button ref={btnRef} onClick={handleClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
