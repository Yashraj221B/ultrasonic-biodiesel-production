import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaFlask } from 'react-icons/fa'
import FloatingBubbles from '../FloatingBubbles'

const ingredients = [
  { icon: '🌾', name: 'Castor Oil', quantity: '50 mL', temperature: '50°C', description: 'Non-edible vegetable oil used as the primary feedstock. Rich in ricinoleic acid, ideal for transesterification to produce FAME (biodiesel).', color: 'from-amber-500 to-yellow-500' },
  { icon: '🧪', name: 'Methanol', quantity: '12 mL', temperature: 'Room Temp', description: 'Short-chain alcohol that reacts with triglycerides in castor oil during transesterification to form fatty acid methyl esters (biodiesel).', color: 'from-blue-500 to-cyan-500' },
  { icon: '⚗️', name: 'NaOH Catalyst', quantity: '5 gm', temperature: 'Room Temp', description: 'Sodium hydroxide acts as a base catalyst, dissolved in methanol to form sodium methoxide, which initiates the transesterification reaction.', color: 'from-violet-500 to-purple-500' },
]

const params = [
  { label: 'Reaction Temperature', value: '50°C', color: 'text-orange-400' },
  { label: 'Reaction Time', value: '20–30 min', color: 'text-blue-400' },
  { label: 'Settling Time', value: '30–60 min', color: 'text-purple-400' },
  { label: 'Castor Oil', value: '50 mL', color: 'text-amber-400' },
  { label: 'Methanol', value: '12 mL', color: 'text-cyan-400' },
  { label: 'NaOH Catalyst', value: '5 gm', color: 'text-violet-400' },
  { label: 'Biodiesel Yield', value: '~90–95%', color: 'text-green-400' },
  { label: 'Purity (FAME)', value: '~95–99%', color: 'text-pink-400' },
]

export default function IngredientsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <FloatingBubbles count={6} />
      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="section-tag"><FaFlask className="w-3 h-3" />Chemical Composition</span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">Key Ingredients</h2>
          <p className="font-inter text-base sm:text-lg text-white/50">Essential components for biodiesel production</p>
          <div className="h-px w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-6" />
        </motion.div>

        {/* Ingredient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {ingredients.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="glass-card rounded-2xl p-8 glow-border group relative overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${ing.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-2xl`} />
              {/* Glow dot */}
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${ing.color} animate-pulse-slow`} />

              <motion.div
                className="text-5xl mb-5"
                whileHover={{ scale: 1.25, rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {ing.icon}
              </motion.div>

              <h3 className={`font-orbitron text-xl font-bold mb-3 bg-gradient-to-r ${ing.color} bg-clip-text text-transparent`}>{ing.name}</h3>
              <p className="font-inter text-white/60 text-sm mb-5 leading-relaxed">{ing.description}</p>

              <div className="border-t border-white/8 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-white/40 text-xs uppercase tracking-wider">Quantity</span>
                  <span className={`font-orbitron text-sm font-bold bg-gradient-to-r ${ing.color} bg-clip-text text-transparent`}>{ing.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-inter text-white/40 text-xs uppercase tracking-wider">Temperature</span>
                  <span className="font-orbitron text-sm font-bold text-cyan-400">{ing.temperature}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Parameters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card rounded-3xl p-8 glow-border"
        >
          <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-glow-sm">Optimal Process Parameters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {params.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.06 }}
                className="glass rounded-xl p-4 glow-border text-center"
              >
                <p className="font-inter text-white/40 text-xs mb-2 uppercase tracking-wider">{p.label}</p>
                <p className={`font-orbitron text-base font-bold ${p.color}`}>{p.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
