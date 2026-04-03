import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaFlask, FaAtom, FaExternalLinkAlt } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Technology', href: '#about' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Process Simulation', href: '#process' },
  { label: 'Process Flow', href: '#flow' },
  { label: 'Results', href: '#results' },
  { label: 'Team', href: '#team' },
]

const teamMembers = ['Avinash Singh', 'Om Mule', 'Yashraj Ghule', 'Sammruddha Mulay']

const techStack = ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'TypeScript']

const socials = [
  { icon: FaGithub, href: 'https://github.com/avinashsingh539', label: 'GitHub', hover: 'hover:text-white hover:shadow-white/20' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', hover: 'hover:text-blue-400 hover:shadow-blue-400/30' },
  { icon: FaEnvelope, href: 'mailto:2005singhavinash@gmail.com', label: 'Email', hover: 'hover:text-cyan-400 hover:shadow-cyan-400/30' },
]

function scrollTo(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  })

  return (
    <footer ref={ref} className="relative w-full overflow-hidden">

      {/* ── Glowing top divider ── */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.7) 30%, rgba(139,0,255,0.5) 60%, rgba(0,102,255,0.7) 80%, transparent 100%)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/6 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-cyan-600/4 rounded-full blur-[80px]" />
        <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-violet-600/5 rounded-full blur-[70px]" />
        {/* Subtle floating molecules */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/20"
            style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* ── Main footer content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-0">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">

          {/* ── Col 1: Brand ── */}
          <motion.div {...fadeUp(0)} className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0"
                animate={{ boxShadow: ['0 0 10px rgba(0,180,255,0.3)', '0 0 22px rgba(0,180,255,0.6)', '0 0 10px rgba(0,180,255,0.3)'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaFlask className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className="font-orbitron font-black text-base gradient-text leading-none">Biodiesel via Ultrasonics</p>
                <p className="font-inter text-[10px] text-white/35 mt-0.5 tracking-wide">MIT-AOE, Pune</p>
              </div>
            </div>

            <p className="font-inter text-white/45 text-sm leading-relaxed mb-6">
              Lab-scale preparation of biodiesel from castor oil using ultrasonic-assisted transesterification. A SY B.Tech Computer Engineering project at MIT-AOE, Pune.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 glass rounded-lg flex items-center justify-center text-white/35 ${hover} transition-all duration-300 glow-border`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Navigation ── */}
          <motion.div {...fadeUp(0.1)}>
            <h4 className="font-orbitron text-[10px] font-bold mb-5 text-cyan-400/70 uppercase tracking-[0.2em]">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2.5 font-inter text-white/45 hover:text-cyan-400 text-sm transition-all duration-300 w-full text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 group-hover:shadow-[0_0_6px_rgba(0,212,255,0.8)] transition-all duration-300 shrink-0" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Institution ── */}
          <motion.div {...fadeUp(0.2)}>
            <h4 className="font-orbitron text-[10px] font-bold mb-5 text-cyan-400/70 uppercase tracking-[0.2em]">
              Institution
            </h4>

            <div className="glass-card rounded-xl p-4 glow-border mb-4">
              <div className="flex items-start gap-2.5 mb-3">
                <FaAtom className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-orbitron text-xs font-bold text-white/85 leading-snug">MIT Academy of Engineering</p>
                  <p className="font-inter text-white/40 text-[11px] mt-0.5">Alandi, Pune</p>
                </div>
              </div>
              <div className="space-y-1.5 pl-6">
                <p className="font-inter text-white/40 text-[11px]">Dept. of Computer Engineering</p>
                <p className="font-inter text-white/40 text-[11px]">Academic Year: 2025–2026</p>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="font-inter text-white/35 text-[11px]">Guide:</span>
                  <span className="font-orbitron text-[11px] font-bold text-cyan-400 text-glow-sm">Dr. Abhijeet Patil</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/avinashsingh539"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-inter text-white/40 hover:text-white text-xs transition-all duration-300"
            >
              <FaGithub className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors">View Project on GitHub</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* ── Col 4: Team ── */}
          <motion.div {...fadeUp(0.3)}>
            <h4 className="font-orbitron text-[10px] font-bold mb-5 text-cyan-400/70 uppercase tracking-[0.2em]">
              Team Members
            </h4>

            <ul className="space-y-2.5 mb-6">
              {teamMembers.map((name, i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="font-orbitron text-[8px] font-bold text-cyan-400">{i + 1}</span>
                  </div>
                  <span className="font-inter text-white/60 text-sm">{name}</span>
                </motion.li>
              ))}
            </ul>

            {/* B.Tech badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-orbitron text-[10px] text-blue-400/80 tracking-wider">B.Tech Computer Engg.</span>
            </div>
          </motion.div>
        </div>

        {/* ── Tech Stack ── */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="font-inter text-white/25 text-xs mr-1 self-center">Built with</span>
          {techStack.map((tech) => (
            <span
              key={tech}
              className="font-orbitron text-[10px] px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-white/35 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* ── Glowing divider ── */}
        <motion.div
          {...fadeUp(0.45)}
          className="relative h-px mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
        </motion.div>

        {/* ── Copyright bar ── */}
        <motion.div
          {...fadeUp(0.5)}
          className="pb-8 sm:pb-10 flex flex-col items-center gap-2 text-center"
        >
          <p className="font-inter text-white/30 text-xs">
            © 2026 Preparation of Biodiesel using Ultrasonic Technique. All Rights Reserved.
          </p>
          <p className="font-inter text-white/20 text-[11px]">
            Designed &amp; Developed by Computer Engineering Students — MIT Academy of Engineering, Pune
          </p>
        </motion.div>

      </div>
    </footer>
  )
}
