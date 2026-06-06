import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../Context/ThemeContext'
import ScrollReveal from '../Components/ScrollReveal' 
import sahilImg from '../assets/images/sahil.jpg'

const stats = [
  { number: '20+', label: 'GitHub Repos' },
  { number: '4+', label: 'Projects Built' },
  { number: '5+', label: 'Technologies' },
  { number: '2025', label: 'MCA Batch' },
]

const terminalLines = [
  { text: '> Initializing profile...', delay: 0 },
  { text: '> Name: Sahil Sagar Gupta', delay: 400 },
  { text: '> Degree: MCA (AI & ML)', delay: 800 },
  { text: '> Location: Chandigarh, India', delay: 1200 },
  { text: '> Specialization: AI / ML', delay: 1600 },
  { text: '> Frontend: React, Tailwind', delay: 2000 },
  { text: '> Backend: Node.js, MongoDB', delay: 2400 },
  { text: '> Status: Open to work ✓', delay: 2800 },
  { text: '> Loading complete!', delay: 3200 },
]

const TerminalLine = ({ text, delay }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <span
        className={
          text.includes('complete')
            ? 'text-green-400'
            : text.includes('Status')
            ? 'text-yellow-400'
            : text.includes('>')
            ? 'text-purple-400'
            : 'text-gray-400'
        }
      >
        {text}
      </span>
    </div>
  )
}

const About = () => {
  const { isDark } = useTheme()
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  // Trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pb-50 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full" />
        </div>
        </ScrollReveal>

        {/* Main content — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Left — Terminal */}
          <div
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <ScrollReveal direction="right" delay={0.1}>
            <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-gray-800">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-gray-500 font-mono">
                  sahil@portfolio ~ profile.sh
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[280px]">
                {inView &&
                  terminalLines.map((line, i) => (
                    <TerminalLine key={i} text={line.text} delay={line.delay} />
                  ))}
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Right — Photo + Bio */}
          <ScrollReveal direction="left" delay={0.2}>
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 p-1 shadow-xl shadow-purple-500/30">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={sahilImg}
                      alt="Sahil Sagar Gupta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl -z-10" />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hey, I'm Sahil! 👋
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm an MCA student specializing in <span className="text-purple-500 font-medium">Artificial Intelligence & Machine Learning</span> from Chandigarh, India. I love building things that sit at the intersection of AI and the web.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From training ML models to building full-stack web apps, I enjoy the entire spectrum. Currently exploring deep learning, React ecosystems, and everything in between.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When I'm not coding, I'm probably thinking about my next project idea. 🚀
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <ScrollReveal delay={0.1}>
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-200"
            >
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default About