import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaUsers } from 'react-icons/fa'

interface TeamMember {
  name: string; role: string; avatar: string
  linkedin?: string; github?: string; email?: string
  color: string; specialty: string
}

const team: TeamMember[] = [
  {
    name: 'Avinash Singh',
    role: 'Team Member',
    specialty: 'Computer Engineering',
    avatar: 'https://res.cloudinary.com/dsf8opl3w/image/upload/v1775143641/AVINASHVIKASSINGH_image_tgggkc.jpg',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Om Mule',
    role: 'Team Member',
    specialty: 'Computer Engineering',
    avatar: 'https://res.cloudinary.com/dsf8opl3w/image/upload/v1775143814/Om_Mule_vg3djz.jpg',
    color: 'from-purple-500 to-blue-500'
  },
  {
    name: 'Yashraj Ghule',
    role: 'Team Member',
    specialty: 'Computer Engineering',
    avatar: 'https://res.cloudinary.com/dsf8opl3w/image/upload/v1775144029/yashraj_ghule_d3cxjr.jpg',
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'Sammruddha Mulay',
    role: 'Team Member',
    specialty: 'Computer Engineering',
    avatar: 'https://res.cloudinary.com/dsf8opl3w/image/upload/v1775143901/Samruddha_Mulay_kln2xo.jpg',
    color: 'from-pink-500 to-purple-500'
  },
]

function TiltCard({ member, index }: { member: TeamMember; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 250, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 250, damping: 28 })
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="cursor-pointer"
    >
      <div className="glass-card rounded-2xl p-6 glow-border group relative overflow-hidden h-full">

        <motion.div
          className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 blur-2xl pointer-events-none transition-opacity duration-500`}
          style={{ left: glowX, top: glowY, transform: 'translate(-50%,-50%)' }}
        />

        <div className="relative flex flex-col items-center text-center">

          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} p-0.5 mb-4 shadow-lg`}
            style={{ boxShadow: `0 0 20px rgba(0,102,255,0.2)` }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full bg-gray-900 object-cover object-center"
            />
          </motion.div>

          <h3 className="font-orbitron text-base font-bold mb-0.5">{member.name}</h3>
          <p className={`font-orbitron text-xs font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-1`}>
            {member.role}
          </p>
          <p className="font-inter text-white/40 text-xs mb-4">{member.specialty}</p>

          <div className="flex gap-4">
            {member.linkedin && <a href={member.linkedin} className="text-white/30 hover:text-blue-400"><FaLinkedin /></a>}
            {member.github && <a href={member.github} className="text-white/30 hover:text-white"><FaGithub /></a>}
            {member.email && <a href={`mailto:${member.email}`} className="text-white/30 hover:text-cyan-400"><FaEnvelope /></a>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="section-tag"><FaUsers />The Team</span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">
            Meet the Team
          </h2>
          <p className="font-inter text-white/50">
            The brilliant minds behind this innovation
          </p>
        </motion.div>

        {inView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {team.map((m, i) => <TiltCard key={i} member={m} index={i} />)}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 glass-card rounded-xl p-6 glow-border-cyan text-center"
        >
          <p className="text-xs text-white/40 uppercase mb-2">Project Guide</p>
          <h3 className="text-2xl font-bold text-glow-sm">Dr. Abhijeet Patil</h3>
          <p className="text-blue-400 text-sm">Project Guide</p>
          <p className="text-white/30 text-xs mt-1">
            MIT Academy of Engineering, Alandi, Pune
          </p>
        </motion.div>
      </div>
    </section>
  )
}