import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaAtom } from 'react-icons/fa'

export default function AboutSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cards = [
    { icon: '🌍', title: 'The Problem', color: 'from-red-500 to-orange-500', text: 'Conventional biodiesel production via mechanical stirring requires 2–3 hours at high temperatures, consumes more energy, and often yields inconsistent product quality.' },
    { icon: '⚡', title: 'Our Approach', color: 'from-blue-500 to-cyan-500', text: 'This project prepares biodiesel from castor oil at lab scale using ultrasonic-assisted transesterification with methanol and NaOH catalyst, reducing reaction time significantly.' },
    { icon: '♻️', title: 'Observed Results', color: 'from-green-500 to-emerald-500', text: 'Reaction completed in 20–30 minutes at 50°C. Biodiesel yield of approximately 90–95% was observed, with glycerol recovered as a useful byproduct.' },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={item} className="mb-16 text-center">
            <span className="section-tag"><FaAtom className="w-3 h-3" />Project Overview</span>
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">About This Project</h2>
            <p className="font-inter text-white/50 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Preparation of Biodiesel using Ultrasonic Technique
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card rounded-2xl p-8 glow-border group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="text-4xl mb-5">{card.icon}</div>
                <h3 className={`font-orbitron text-xl font-bold mb-4 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>{card.title}</h3>
                <p className="font-inter text-white/65 leading-relaxed text-sm">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 glow-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-glow-sm">Why Ultrasonic Technique?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {[
                { title: 'Process Advantages', color: 'text-neon-blue', items: ['Reaction time reduced to 20–30 min vs 2–3 hrs', 'Observed biodiesel yield ~90–95% at lab scale', 'Lower NaOH catalyst quantity required', 'Reaction carried out at 50°C'] },
                { title: 'Feedstock & Sustainability', color: 'text-cyan-400', items: ['Castor oil — non-edible, locally available feedstock', 'Methanol used as transesterification alcohol', 'Glycerol recovered as a useful byproduct', 'Lab-scale study suitable for scale-up research'] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 className={`font-orbitron text-base font-semibold mb-4 ${col.color}`}>{col.title}</h4>
                  <ul className="space-y-3">
                    {col.items.map((it, j) => (
                      <li key={j} className="flex items-center gap-3 font-inter text-white/65 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
