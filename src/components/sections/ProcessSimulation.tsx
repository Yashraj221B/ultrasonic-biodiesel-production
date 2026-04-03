import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaTimes,  FaAtom } from 'react-icons/fa'
import FloatingBubbles from '../FloatingBubbles'

// 🔬 Animations
import Reactor from '../animations/ReactorMixingTest'
import GravitySettling1 from '../animations/GravitySettling1'
import Separation from '../animations/Separation'
import WashingPhase from '../animations/WashingPhase'
import GravitySettling2 from '../animations/GravitySettling2'
import FinalBiodiesel from '../animations/FinalBiodiesel'
import StorageTank from '../animations/StorageTank'

interface ProcessStep {
  id: number
  name: string
  description: string
  details: string[]
  color: string
  icon: string
  param: { label: string; value: string }
}

const steps: ProcessStep[] = [
  // ❌ UNCHANGED
  // (keeping your steps exactly same)
  {
    id: 1,
    name: 'Reactor & Mixing',
    description: 'Ultrasonic-assisted transesterification',
    icon: '🧪',
    color: 'from-blue-500 to-blue-600',
    param: { label: 'Temperature', value: '50°C' },
    details: [
      'Add 50 mL Castor Oil to reactor vessel',
      'Add 12 mL Methanol + 5 gm NaOH',
      'Heat mixture to 50°C',
      'Apply ultrasonic cavitation',
    ],
  },
  {
    id: 2,
    name: 'Gravity Settling (1)',
    description: 'Phase separation after reaction',
    icon: '⏱️',
    color: 'from-cyan-500 to-blue-500',
    param: { label: 'Time', value: '30–60 min' },
    details: [
      'Allow mixture to settle',
      'Top layer: Biodiesel',
      'Bottom layer: Glycerol',
    ],
  },
  {
    id: 3,
    name: 'Separation',
    description: 'Remove glycerol',
    icon: '🔄',
    color: 'from-purple-500 to-blue-500',
    param: { label: 'Output', value: 'Glycerol Removed' },
    details: [
      'Drain bottom glycerol',
      'Retain biodiesel',
    ],
  },
  {
    id: 4,
    name: 'Washing Phase',
    description: 'Remove impurities',
    icon: '💧',
    color: 'from-yellow-500 to-orange-500',
    param: { label: 'Agent', value: 'Water' },
    details: [
      'Add water',
      'Mix gently',
      'Remove impurities',
    ],
  },
  {
    id: 5,
    name: 'Gravity Settling (2)',
    description: 'Final separation',
    icon: '⚖️',
    color: 'from-pink-500 to-purple-500',
    param: { label: 'Output', value: 'Pure Biodiesel' },
    details: [
      'Top: Biodiesel',
      'Bottom: Wastewater',
    ],
  },
  {
    id: 6,
    name: 'Final Biodiesel',
    description: 'Purified product',
    icon: '✅',
    color: 'from-green-500 to-emerald-500',
    param: { label: 'Purity', value: '95–99%' },
    details: [
      'Clear golden biodiesel',
      'Ready for use',
    ],
  },
  {
    id: 7,
    name: 'Storage Tank',
    description: 'Safe storage',
    icon: '🛢️',
    color: 'from-teal-500 to-cyan-500',
    param: { label: 'Storage', value: 'Airtight' },
    details: [
      'Transfer to tank',
      'Store safely',
    ],
  },
]

// 🎯 Animation mapping
const stepAnimations: Record<number, JSX.Element> = {
  1: <Reactor />,
  2: <GravitySettling1 />,
  3: <Separation />,
  4: <WashingPhase />,
  5: <GravitySettling2 />,
  6: <FinalBiodiesel />,
  7: <StorageTank />,
}

export default function ProcessSimulation() {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative w-full py-20 px-4 overflow-hidden">
      <FloatingBubbles count={6} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 px-2"
        >
          <span className="section-tag">
            <FaAtom /> Interactive Simulation
          </span>

          {/* ✅ MOBILE FIX */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-glow">
            Process Simulation
          </h2>

          <p className="text-white/50 mt-2 text-sm sm:text-base">
            Click any step to visualize the process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className="glass-card p-4 rounded-xl text-center hover:scale-105 transition"
            >
              <div className="text-2xl">{step.icon}</div>
              <h3 className="text-sm font-bold">{step.name}</h3>
              <p className="text-xs text-white/50">{step.param.value}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="
          relative w-full max-w-3xl 
          bg-black rounded-2xl 
          p-4 sm:p-6 
          max-h-[90vh] overflow-y-auto
        "
            >
              {/* ✅ CLOSE BUTTON (ALWAYS VISIBLE) */}
              <button
                onClick={() => setSelectedStep(null)}
                className="
            absolute top-2 right-2 sm:top-4 sm:right-4 
            z-50 bg-white/10 hover:bg-white/20 
            p-2 rounded-full text-white
          "
              >
                <FaTimes size={16} />
              </button>

              {/* ✅ TITLE FIX */}
              <div className="pt-6 sm:pt-2 mb-4 text-center">
                <h3 className="text-base sm:text-lg font-bold">
                  {selectedStep.name}
                </h3>
              </div>

              {/* ✅ ANIMATION (RESPONSIVE HEIGHT) */}
              <div className="
          w-full 
          h-[220px] sm:h-[300px] md:h-[350px] 
          flex items-center justify-center 
          bg-black rounded-xl
        ">
                {stepAnimations[selectedStep.id]}
              </div>

              {/* ✅ DETAILS */}
              <ul className="mt-4 text-sm text-white/70 space-y-2">
                {selectedStep.details.map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}