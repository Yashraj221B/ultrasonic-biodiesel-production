import { motion, useScroll, useTransform } from 'framer-motion'
import { FaChevronDown, FaFlask, FaAtom } from 'react-icons/fa'
import AnimatedObject from '../AnimatedObject'
import RippleButton from '../RippleButton'
import FloatingBubbles from '../FloatingBubbles'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const orbY1 = useTransform(scrollY, [0, 600], [0, -80])
  const orbY2 = useTransform(scrollY, [0, 600], [0, -50])
  const textY  = useTransform(scrollY, [0, 400], [0, -30])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pb-24 pt-8">
      {/* Parallax ambient orbs */}
      <motion.div style={{ y: orbY1 }}
        className="absolute -top-20 -left-20 w-64 h-64 md:w-[400px] md:h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <motion.div style={{ y: orbY2 }}
        className="absolute -bottom-20 -right-20 w-64 h-64 md:w-[350px] md:h-[350px] bg-violet-600/10 rounded-full blur-[70px] pointer-events-none" />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[200px] bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <FloatingBubbles count={6} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-4 sm:px-6 w-full max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <span className="section-tag text-[10px] sm:text-xs">
            <FaAtom className="w-3 h-3 shrink-0" />
            <span className="truncate">MIT Academy of Engineering, Alandi, Pune</span>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 gradient-text text-glow leading-tight">
            Preparation of Biodiesel
          </h1>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-5 sm:mb-7 text-white/90 leading-tight">
            using Ultrasonic Technique
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-inter text-sm sm:text-base md:text-lg text-white/60 mb-3 sm:mb-4 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
        >
          Lab-scale production of biodiesel from castor oil using{' '}
          <span className="text-neon-blue font-semibold text-glow-sm">ultrasonic-assisted transesterification</span>
          {' '}process.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-inter text-xs sm:text-sm text-white/35 mb-6 sm:mb-8 tracking-wide"
        >
          Faster reaction
          <span className="mx-2 text-cyan-500/50">•</span>
          Improved yield
          <span className="mx-2 text-cyan-500/50">•</span>
          Energy-efficient process
        </motion.p>

        {/* 3D Object — constrained size on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 80 }}
          className="mb-6 sm:mb-8 w-full max-w-[220px] sm:max-w-[300px] md:max-w-[360px] mx-auto"
        >
          <AnimatedObject />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 px-4"
        >
          <RippleButton
            variant="primary"
            className="w-full sm:w-auto min-h-[48px]"
            onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="flex items-center justify-center gap-2">
              <FaFlask className="w-4 h-4 shrink-0" /> Explore Process
            </span>
          </RippleButton>
          <RippleButton
            variant="neon"
            className="w-full sm:w-auto min-h-[48px]"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn Technology
          </RippleButton>
        </motion.div>

        {/* Stats row — 2×2 on mobile, 4 across on sm+ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xs sm:max-w-none mx-auto"
        >
          {[
            { val: '~92%', label: 'Yield' },
            { val: '50°C', label: 'Reaction Temp' },
            { val: '20–30 min', label: 'Reaction Time' },
            { val: '95–99%', label: 'Purity' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold gradient-text-cyan leading-tight">{s.val}</p>
              <p className="font-inter text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — fixed at bottom, never overlaps content */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neon-blue/50 pointer-events-none"
      >
        <span className="font-orbitron text-[9px] tracking-widest uppercase">Scroll</span>
        <FaChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  )
}
