import Tilt from 'react-parallax-tilt'
import { useState, useRef, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import ScrollReveal from '../Components/ScrollReveal'

const projects = [
  {
    id: 1,
    featured: true,
    title: 'SkillBridge AI',
    subtitle: 'AI-Powered Skill Gap Analyzer',
    description:
      'Analyzes resumes against real job descriptions using NLP and ML to identify skill gaps, generate personalized learning roadmaps, recommend resources, and help students become industry-ready.',
    tech: ['Python', 'FastAPI', 'RoBERTa', 'PyTorch', 'Scikit-learn', 'React', 'NLP'],
    features: [
      'Multi-layer skill extraction pipeline',
      'Semantic resume-to-job matching',
      'Personalized learning roadmap generation',
      'Interview preparation recommendations',
    ],
    github: 'https://github.com/SahilSagarGupta',
    status: 'Building in Public',
    statusColor: 'text-yellow-400',
    statusBg: 'bg-yellow-400/10 border-yellow-400/30',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    glowColor: 'shadow-purple-500/20',
  },
  {
    id: 2,
    title: 'AI Email Generator',
    subtitle: 'Generative AI Application',
    description:
      'AI-powered tool that generates professional emails from user prompts in seconds with structured formatting and personalized content.',
    tech: ['React', 'JavaScript', 'Python', 'FastAPI', 'LLM API'],
    features: ['AI-generated email drafting', 'Prompt-based customization', 'Professional formatting'],
    github: 'https://github.com/SahilSagarGupta/AI-Email-Generator.git',
    gradient: 'from-blue-600 to-cyan-600',
    glowColor: 'shadow-blue-500/20',
  },
  {
    id: 3,
    title: 'Wine Quality Prediction',
    subtitle: 'Machine Learning Project',
    description:
      'Predictive ML model that analyzes wine characteristics and estimates quality ratings using feature engineering and classification techniques.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    features: ['Exploratory Data Analysis', 'Feature correlation analysis', 'Quality prediction model'],
    github: 'https://github.com/SahilSagarGupta/Wine-Quality-Prediction.git',
    gradient: 'from-rose-600 to-pink-600',
    glowColor: 'shadow-rose-500/20',
  },
  {
    id: 4,
    title: 'Pathfinding Visualizer',
    subtitle: 'Algorithm Visualization Tool',
    description:
      'Interactive platform demonstrating how pathfinding algorithms discover optimal routes through dynamic grid environments in real-time.',
    tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Dijkstra Algorithm','Tkinter'],
    features: ['Real-time visualization', 'Interactive obstacle creation', 'Algorithm demonstrations'],
    github: 'https://github.com/SahilSagarGupta/Pathfinding-Visualizer.git',
    gradient: 'from-green-600 to-emerald-600',
    glowColor: 'shadow-green-500/20',
  },
  {
    id: 5,
    title: 'Task Forge',
    subtitle: 'Task Management Application',
    description:
      'Productivity-focused app that helps users organize, manage, and track tasks through a clean and intuitive interface.',
    tech: ['React', 'JavaScript', 'CSS', 'Local Storage'],
    features: ['Task creation & management', 'Progress tracking', 'Responsive UI'],
    github: 'https://github.com/SahilSagarGupta/Task-Forge.git',
    gradient: 'from-orange-600 to-amber-600',
    glowColor: 'shadow-orange-500/20',
  },
  {
    id: 6,
    title: 'Pizza Sales Analysis',
    subtitle: 'Business Intelligence & SQL Analytics',
    description:
      'Data analytics project exploring pizza sales data to uncover revenue trends, customer behavior, and actionable business insights using SQL.',
    tech: ['MySQL', 'SQL', 'Data Analysis'],
    features: ['Revenue analysis', 'Sales trend identification', 'Advanced SQL querying'],
    github: 'https://github.com/SahilSagarGupta/Pizza-Sales-Data-Analysis-using-MySQL.git',
    gradient: 'from-red-600 to-orange-600',
    glowColor: 'shadow-red-500/20',
  },
  {
    id: 7,
    title: 'Quiz Application',
    subtitle: 'Interactive Learning Platform',
    description:
      'Web-based quiz app that lets users test knowledge, receive instant feedback, and track performance through an engaging interface.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: ['Dynamic quiz experience', 'Automated scoring', 'Instant results'],
    github: 'https://github.com/SahilSagarGupta/Quiz-Application-.git',
    gradient: 'from-teal-600 to-cyan-600',
    glowColor: 'shadow-teal-500/20',
  },
]

const ProjectCard = ({ project, inView, index }) => {
  const delay = `${index * 100}ms`

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="16px"
      transitionSpeed={400}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className={`h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-xl ${project.glowColor} transition-all duration-300 flex flex-col`}>

        {/* Header */}
        
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`inline-block w-10 h-1 rounded-full bg-gradient-to-r ${project.gradient} mb-3`} />
            <h3 className="text-lg font-bold dark:text-white">{project.title}</h3>
            <p className={`text-xs font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {project.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span className={`mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to- ${project.gradient} flex-shrink-0`} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              {t}
            </span>
          ))}
        </div>

        {/* GitHub Button */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${project.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200`}
        >
          <FaGithub size={15} />
          View on GitHub
        </a>
      </div>
    </Tilt>
    
  )
}

const Projects = () => {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" ref={sectionRef} className="pb-50 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <ScrollReveal delay={0}>
        <div className="text-center mb-16">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">
            What I've built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white">Projects</h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full" />
        </div>
        </ScrollReveal>

        {/* Featured Project */}
        <div
          className={`transition-all duration-700 mb-8 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <ScrollReveal delay={0.1}>
          <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#a855f7"
            glarePosition="all"
            glareBorderRadius="24px"
            transitionSpeed={400}
          >
            <div className={`relative bg-white dark:bg-gray-900 border border-purple-500/30 rounded-3xl p-8 hover:shadow-2xl ${featured.glowColor} transition-all duration-300 overflow-hidden`}>

              {/* Gradient background blob */}
              <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${featured.gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 font-medium">
                    <HiSparkles size={12} /> Featured Project
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-full border ${featured.statusBg} ${featured.statusColor} font-medium`}>
                    🚧 {featured.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left */}
                  <div>
                    <h3 className="text-3xl font-bold dark:text-white mb-2 ">{featured.title}</h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${featured.gradient} bg-clip-text text-transparent mb-4`}>
                      {featured.subtitle}
                    </p>
                    <p className="dark:text-gray-300 leading-relaxed mb-6">{featured.description}</p>
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${featured.gradient} text-white font-medium hover:opacity-90 transition-opacity duration-200`}
                    >
                      <FaGithub size={16} /> View on GitHub
                    </a>
                  </div>

                  {/* Right — features + tech */}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Key Features</p>
                    <ul className="space-y-2 mb-6">
                      {featured.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm dark:text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
          </ScrollReveal>
        </div>

        {/* Rest of projects — 3 col grid */}
          <ScrollReveal >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              inView={inView}
              index={i + 1}
            />
          ))}
        </div>
          </ScrollReveal>
      </div>
    </section>
  )
}

export default Projects