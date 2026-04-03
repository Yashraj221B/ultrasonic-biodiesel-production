import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import IngredientsSection from './components/sections/IngredientsSection'
import ProcessSimulation from './components/sections/ProcessSimulation'
import ProcessFlowSection from './components/sections/ProcessFlowSection'
import UltrasonicWorkingSection from './components/sections/UltrasonicWorkingSection'
import LabWorkSection from './components/sections/LabWorkSection'
import ResultsSection from './components/sections/ResultsSection'
import FinalOutputSection from './components/sections/FinalOutputSection'
import TeamSection from './components/sections/TeamSection'
import Footer from './components/sections/Footer'
import ParticleBackground from './components/ParticleBackground'
import WaveDivider from './components/WaveDivider'
import ScrollToTop from './components/ScrollToTop'

// 🔬 Animations (ADDED ONLY)

function App() {
  return (
    <div className="relative w-full overflow-hidden bg-mesh">
      {/* Fixed layers */}
      <div className="hex-grid" />
      <div className="scan-line" />
      <ParticleBackground />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main content */}
      <div className="relative z-10">
        <section id="hero"><HeroSection /></section>

        <WaveDivider />
        <section id="about"><AboutSection /></section>

        <WaveDivider flip />
        <section id="ingredients"><IngredientsSection /></section>

        <WaveDivider />

        {/* 🔥 PROCESS SECTION (UPDATED ONLY HERE) */}
        <section id="process">
          <ProcessSimulation />

          {/* 🔬 TEMP FULL SIMULATION VIEW */}
          
        </section>

        <WaveDivider flip />
        <section id="flow"><ProcessFlowSection /></section>

        <WaveDivider />
        <section id="ultrasonic"><UltrasonicWorkingSection /></section>

        <WaveDivider flip />
        <section id="lab"><LabWorkSection /></section>

        <WaveDivider />
        <section id="results"><ResultsSection /></section>

        <WaveDivider flip />
        <section id="output"><FinalOutputSection /></section>

        <WaveDivider />
        <section id="team"><TeamSection /></section>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App