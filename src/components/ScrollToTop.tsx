import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.15, boxShadow: '0 0 24px rgba(0,180,255,0.6)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 border border-white/20"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
