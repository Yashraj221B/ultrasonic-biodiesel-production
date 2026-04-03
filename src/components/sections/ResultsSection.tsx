import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaChartBar } from 'react-icons/fa'

function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setDisplay(target); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function ResultsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'Biodiesel Yield', value: 92, suffix: '%', color: 'from-blue-400 to-cyan-400', icon: '⚗️' },
    { label: 'FAME Purity', value: 97, suffix: '%', color: 'from-cyan-400 to-teal-400', icon: '✨' },
    { label: 'Reaction Time', value: 25, suffix: ' min', color: 'from-purple-400 to-blue-400', icon: '⏱️' },
    { label: 'Settling Time', value: 45, suffix: ' min', color: 'from-green-400 to-emerald-400', icon: '⏳' },
  ]

  const comparison = [
    { method: 'Conventional', yield: 75, time: 180, energy: 100, color: 'bg-red-500/50' },
    { method: 'Ultrasonic', yield: 92, time: 25, energy: 65, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  ]

  const properties = [
    { name: 'Appearance', value: 'Golden Yellow', standard: 'Clear, amber liquid', pass: true },
    { name: 'Flash Point', value: '~130°C', standard: '>130°C (IS 1448)', pass: true },
    { name: 'Viscosity (40°C)', value: '~14–15 cSt', standard: 'Castor FAME range', pass: true },
    { name: 'Density (15°C)', value: '~0.91 g/mL', standard: '0.86–0.90 g/mL', pass: true },
    { name: 'Acid Value', value: '<0.5 mg KOH/g', standard: '<0.5 mg KOH/g', pass: true },
    { name: 'Yield (from 50 mL oil)', value: '~45–47 mL', standard: '~90–95% yield', pass: true },
  ]

  return (
    <section ref={ref} className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="section-tag"><FaChartBar className="w-3 h-3" />Experimental Results</span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">Results & Analysis</h2>
          <p className="font-inter text-sm sm:text-base md:text-lg text-white/50">Observed data from lab-scale experiment at MIT-AOE using 50 mL castor oil</p>
          <div className="h-px w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-6" />
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="stat-card glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 glow-border text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className={`font-orbitron text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-inter text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 glow-border mb-8 sm:mb-10"
        >
          <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-5 sm:mb-8 text-glow-sm">Conventional Stirring vs Ultrasonic Method</h3>
          <div className="space-y-8">
            {[
              { label: 'Biodiesel Yield (%)', key: 'yield', max: 100, unit: '%' },
              { label: 'Reaction Time (min)', key: 'time', max: 200, unit: ' min' },
              { label: 'Energy Consumption (relative)', key: 'energy', max: 120, unit: '' },
            ].map(metric => (
              <div key={metric.key}>
                <p className="font-inter text-white/60 text-sm mb-3 font-medium">{metric.label}</p>
                <div className="space-y-2">
                  {comparison.map(m => (
                    <div key={m.method} className="flex items-center gap-4">
                      <span className="font-inter text-xs text-white/50 w-20 sm:w-28 shrink-0">{m.method}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-6 sm:h-8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${((m[metric.key as keyof typeof m] as number) / metric.max) * 100}%` } : {}}
                          transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
                          className={`h-full ${m.color} rounded-full flex items-center justify-end pr-3`}
                        >
                          <span className="font-orbitron text-xs font-bold text-white">{m[metric.key as keyof typeof m]}{metric.unit}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Properties Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 glow-border"
        >
          <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-glow-sm">Biodiesel Quality Properties</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {['Property', 'Measured Value', 'Standard Range', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-orbitron text-xs text-white/40 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map((prop, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-inter font-medium text-xs sm:text-sm">{prop.name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-orbitron text-xs sm:text-sm text-blue-400">{prop.value}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-inter text-xs sm:text-sm text-white/50 hidden sm:table-cell">{prop.standard}</td>
                    <td className="py-3 px-4">
                      <span className={`font-orbitron px-3 py-1 rounded-full text-xs font-bold ${prop.pass ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
                        {prop.pass ? '✓ PASS' : '✗ FAIL'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
