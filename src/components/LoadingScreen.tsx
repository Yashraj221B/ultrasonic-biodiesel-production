import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaAtom } from 'react-icons/fa'

const messages = [
  'Initializing Ultrasonic Reactor...',
  'Loading Process Parameters...',
  'Calibrating Cavitation System...',
  'Preparing Lab Simulation...',
]

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 600)
    const hideTimer = setTimeout(() => setVisible(false), 2600)
    return () => { clearInterval(msgTimer); clearTimeout(hideTimer) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#020408] flex flex-col items-center justify-center gap-8"
        >
          {/* Rotating molecule rings */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyan-400/30"
              style={{ borderTopColor: 'rgba(0,212,255,0.8)' }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border border-blue-400/30"
              style={{ borderRightColor: 'rgba(0,102,255,0.8)' }}
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-6 rounded-full border border-violet-400/30"
              style={{ borderBottomColor: 'rgba(139,0,255,0.8)' }}
            />
            {/* Center atom */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(0,180,255,0.6)' }}
            >
              <FaAtom className="w-5 h-5 text-white" />
            </motion.div>
            {/* Orbiting dots */}
            {[0, 120, 240].map((deg, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                className="absolute inset-0"
                style={{ transformOrigin: 'center' }}
              >
                <div
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    top: '4px', left: '50%', transform: `translateX(-50%) rotate(${deg}deg) translateY(-50px) rotate(-${deg}deg)`,
                    boxShadow: '0 0 6px rgba(0,212,255,0.8)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Brand */}
          <div className="text-center">
            <p className="font-orbitron text-xl font-black gradient-text mb-1">UltraBiodiesel</p>
            <p className="font-inter text-white/30 text-xs tracking-widest uppercase">Production System</p>
          </div>

          {/* Animated message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-inter text-cyan-400/70 text-sm tracking-wide"
            >
              {messages[msgIdx]}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
