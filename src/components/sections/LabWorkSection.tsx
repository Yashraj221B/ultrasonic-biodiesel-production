import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaExpand, FaPlay } from 'react-icons/fa'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  src: string
  thumb: string
  caption: string
  tag: string
}

const labMedia: MediaItem[] = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800', thumb: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400', caption: 'Ultrasonic Reactor Setup', tag: 'Mixing' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800', thumb: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400', caption: 'Castor Oil + Methanol + NaOH Mixing', tag: 'Mixing' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800', thumb: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400', caption: 'Ultrasonic Cavitation Reaction', tag: 'Reaction' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800', thumb: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400', caption: 'Gravity Settling — Phase Separation', tag: 'Separation' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800', thumb: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400', caption: 'Glycerol Layer Draining', tag: 'Separation' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800', thumb: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400', caption: 'Water Washing of Raw Biodiesel', tag: 'Washing' },
  { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800', thumb: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400', caption: 'Final Biodiesel (FAME) Collection', tag: 'Output' },
  { id: 8, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400', caption: 'Ultrasonic Reaction Demo Video', tag: 'Reaction' },
]

export default function LabWorkSection() {
  const [selected, setSelected] = useState<MediaItem | null>(null)
  const [filter, setFilter] = useState('All')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const tags = ['All', ...Array.from(new Set(labMedia.map(m => m.tag)))]
  const filtered = filter === 'All' ? labMedia : labMedia.filter(m => m.tag === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-10 text-center"
        >
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">Lab Work Gallery</h2>
          <p className="font-inter text-sm sm:text-base md:text-lg text-white/60">Real experiments, real results</p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-6" />
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-10"
        >
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === tag
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                  : 'glass text-white/70 hover:text-white glow-border'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(item)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square glass glow-border"
              >
                <img
                  src={item.thumb}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-semibold text-white">{item.caption}</p>
                  <span className="text-xs text-blue-400">{item.tag}</span>
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-500/80 flex items-center justify-center backdrop-blur-sm">
                      <FaPlay className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaExpand className="w-4 h-4 text-white/80" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass rounded-3xl overflow-hidden max-w-4xl w-full"
            >
              <div className="relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
                {selected.type === 'video' ? (
                  <video src={selected.src} controls autoPlay className="w-full aspect-video object-cover" />
                ) : (
                  <img src={selected.src} alt={selected.caption} className="w-full aspect-video object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold">{selected.caption}</h3>
                  <span className="text-sm text-blue-400">{selected.tag}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
