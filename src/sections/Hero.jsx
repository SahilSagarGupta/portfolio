import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import Typewriter from 'typewriter-effect'
import { useTheme } from '../Context/ThemeContext'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'

const Hero = () => {
  const { isDark } = useTheme()

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: isDark ? '#a855f7' : '#7c3aed' },
      links: {
        enable: true,
        color: isDark ? '#a855f7' : '#7c3aed',
        opacity: isDark ? 0.2 : 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: 'bounce' },
      },
      opacity: { value: isDark ? 0.4 : 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Particles*/}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-35 mb-45">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            Open to opportunities
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Sahil Sagar
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-600">
            Gupta
          </span>
        </h1>

        {/* Typewriter */}
        <div className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-10 h-10">
          <Typewriter
            options={{
              strings: [
                'MCA (AI & ML) Student',
                'AI / ML Engineer',
                'Full Stack Developer',
                'Problem Solver',
              ],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 40,
            }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            View Projects
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:scale-105"
          >
            Download CV
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <a
            href="https://github.com/SahilSagarGupta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <FaGithub size={22} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
          <a
            href="https://linkedin.com/in/sahilsagargupta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <FaLinkedin size={22} />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className=" flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 animate-bounce">
          <span className="text-xs tracking-widest uppercase mt-7">Scroll</span>
          <HiArrowDown size={16} />
        </div>

      </div>
    </section>
  )
}

export default Hero