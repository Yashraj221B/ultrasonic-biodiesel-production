import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function LiquidTank({ fill, color, label }: { fill: number; color: string; label: string }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-48 glass rounded-b-3xl rounded-t-lg glow-border overflow-hidden">
        {/* Liquid fill */}
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: `${fill}%` } : { height: 0 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 ${color} rounded-b-3xl`}
        />
        {/* Wave effect */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className={`absolute bottom-[${fill}%] left-0 right-0 h-3 ${color} opacity-60 blur-sm`}
          style={{ bottom: `${fill - 3}%` }}
        />
        {/* Percentage label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-lg drop-shadow-lg">{fill}%</span>
        </div>
        {/* Tick marks */}
        {[25, 50, 75].map(tick => (
          <div key={tick} className="absolute right-0 w-3 h-px bg-white/30" style={{ bottom: `${tick}%` }} />
        ))}
      </div>
      <p className="text-sm font-semibold text-white/80 text-center">{label}</p>
    </div>
  )
}

export default function FinalOutputSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const outputs = [
    { label: 'Biodiesel (FAME)', fill: 92, color: 'bg-gradient-to-t from-amber-500 to-yellow-400', desc: 'Primary fuel product (~45–47 mL from 50 mL oil)', icon: '⛽' },
    { label: 'Glycerol', fill: 15, color: 'bg-gradient-to-t from-purple-600 to-purple-400', desc: 'Valuable byproduct (soap/cosmetics)', icon: '🧴' },
    { label: 'Wastewater', fill: 8, color: 'bg-gradient-to-t from-gray-600 to-gray-400', desc: 'Wash water (to be treated)', icon: '🚰' },
  ]

  const specs = [
    { label: 'Color', value: 'Golden Yellow', icon: '🎨' },
    { label: 'Odor', value: 'Mild, Oily', icon: '👃' },
    { label: 'Purity (FAME)', value: '~95–99%', icon: '✨' },
    { label: 'Yield', value: '~90–95%', icon: '⚗️' },
    { label: 'Blend Ratio', value: 'B20–B100', icon: '⛽' },
    { label: 'Feedstock', value: 'Castor Oil', icon: '🌾' },
  ]

  return (
    <section ref={ref} className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">Final Product — Biodiesel (FAME)</h2>
          <p className="font-inter text-sm sm:text-base md:text-lg text-white/50">Fatty Acid Methyl Ester obtained from castor oil transesterification</p>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
          {/* Tank Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 glow-border"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 text-center">Approximate Product Distribution</h3>
            <div className="flex justify-around items-end gap-3 sm:gap-6">
              {outputs.map((out, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="text-3xl">{out.icon}</div>
                  <LiquidTank fill={out.fill} color={out.color} label={out.label} />
                  <p className="text-xs text-white/50 text-center max-w-[80px]">{out.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Observed Product Properties</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass rounded-xl p-4 glow-border"
                >
                  <div className="text-2xl mb-2">{spec.icon}</div>
                  <p className="text-white/50 text-xs mb-1">{spec.label}</p>
                  <p className="font-bold text-blue-400">{spec.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Environmental Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-3xl p-10 glow-border text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-green-500/5"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="relative">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Significance of the Experiment</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              This lab-scale study at MIT-AOE demonstrates that ultrasonic-assisted transesterification of castor oil
              produces biodiesel (FAME) with approximately 90–95% yield in 20–30 minutes, which is significantly
              faster than conventional mechanical stirring methods.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'CO₂ Reduction', value: '78%', color: 'text-green-400' },
                { label: 'Renewable Source', value: '100%', color: 'text-blue-400' },
                { label: 'Biodegradable', value: 'Yes', color: 'text-cyan-400' },
                { label: 'Sulfur Content', value: '<15 ppm', color: 'text-purple-400' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-white/50 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
