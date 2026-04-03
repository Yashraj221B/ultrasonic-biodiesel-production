/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        inter:    ['Inter', 'sans-serif'],
        poppins:  ['Poppins', 'sans-serif'],
      },
      colors: {
        dark:    '#020408',
        darker:  '#010204',
        'neon-blue':   '#00d4ff',
        'neon-violet': '#8b00ff',
        'neon-green':  '#00ff88',
        glow:    '#0066ff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(var(--tw-gradient-stops))',
        'gradient-main':   'linear-gradient(135deg, #020408 0%, #0a0a2e 50%, #020408 100%)',
        'gradient-hero':   'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,102,255,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float':       'float 7s ease-in-out infinite',
        'float-slow':  'float 12s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':     'shimmer 2.5s infinite',
        'spin-slow':   'spin 20s linear infinite',
        'orbit':       'orbit 12s linear infinite',
        'scan':        'scanDown 8s linear infinite',
        'hex-drift':   'hexDrift 30s linear infinite',
        'mesh-shift':  'meshShift 18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-22px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 8px rgba(0,180,255,0.4), 0 0 20px rgba(0,102,255,0.2)' },
          '50%':     { boxShadow: '0 0 25px rgba(0,180,255,0.8), 0 0 50px rgba(0,102,255,0.4)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
      },
      backdropBlur: { xl: '28px', '2xl': '40px' },
      borderRadius: { '3xl': '24px', '4xl': '32px' },
      boxShadow: {
        'neon-blue':   '0 0 20px rgba(0,180,255,0.5), 0 0 40px rgba(0,102,255,0.3)',
        'neon-violet': '0 0 20px rgba(139,0,255,0.5), 0 0 40px rgba(139,0,255,0.3)',
        'neon-green':  '0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.3)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,102,255,0.15)',
      },
    },
  },
  plugins: [],
}
