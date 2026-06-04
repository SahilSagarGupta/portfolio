import { useState, useRef, useEffect } from 'react'

const PROFICIENCY = {
  Advanced:     { color: '#4ade86', bg: '#14532d44', label: '●●● Advanced' },
  Intermediate: { color: '#c084fc', bg: '#58187744', label: '●●○ Intermediate' },
  Beginner:     { color: '#fbbf24', bg: '#78350f44', label: '●○○ Beginner' },
  Output:       { color: '#60a5fa', bg: '#1e3a8a44', label: '⭐ Output' },
}

const layers = [
  {
    sublabel: 'Languages', color: '#3b82f6',
    nodes: [
      { id: 'py',   name: 'Python',     icon: 'devicon-python-plain colored',      proficiency: 'Advanced',     usage: 'ML, Data Analysis, Scripting' },
      { id: 'js',   name: 'JavaScript', icon: 'devicon-javascript-plain colored',  proficiency: 'Intermediate', usage: 'Frontend, Node.js, APIs' },
      { id: 'cpp',  name: 'C++',        icon: 'devicon-cplusplus-plain colored',   proficiency: 'Intermediate', usage: 'DSA, Algorithms' },
      { id: 'html', name: 'HTML5',      icon: 'devicon-html5-plain colored',       proficiency: 'Advanced',     usage: 'Web Structure, Templates' },
      { id: 'css',  name: 'CSS3',       icon: 'devicon-css3-plain colored',        proficiency: 'Intermediate', usage: 'Styling, Animations' },
    ],
  },
  {
    sublabel: 'Frameworks', color: '#a855f7',
    nodes: [
      { id: 'react',    name: 'React',      icon: 'devicon-react-original colored',      proficiency: 'Intermediate', usage: 'SPAs, Component UI' },
      { id: 'tailwind', name: 'Tailwind',   icon: 'devicon-tailwindcss-plain colored',   proficiency: 'Intermediate', usage: 'Utility CSS, Dark Mode' },
      { id: 'tf',       name: 'TensorFlow', icon: 'devicon-tensorflow-original colored', proficiency: 'Intermediate', usage: 'Deep Learning Models' },
      { id: 'pytorch',  name: 'PyTorch',    icon: 'devicon-pytorch-original colored',    proficiency: 'Beginner',     usage: 'Neural Networks, Research' },
    ],
  },
  {
    sublabel: 'ML / Backend', color: '#22c55e',
    nodes: [
      { id: 'numpy',  name: 'NumPy',   icon: 'devicon-numpy-original colored',   proficiency: 'Advanced', usage: 'Array ops, Math' },
      { id: 'pandas', name: 'Pandas',  icon: 'devicon-pandas-original colored',  proficiency: 'Advanced', usage: 'Data Analysis, CSV' },
      { id: 'node',   name: 'Node.js', icon: 'devicon-nodejs-plain colored',     proficiency: 'Beginner', usage: 'REST APIs, Server' },
      { id: 'mongo',  name: 'MongoDB', icon: 'devicon-mongodb-plain colored',    proficiency: 'Beginner', usage: 'NoSQL Database' },
      { id: 'docker', name: 'Docker',  icon: 'devicon-docker-plain colored',     proficiency: 'Beginner', usage: 'Containers, DevOps' },
    ],
  },
  {
    sublabel: 'What I Build', color: '#f59e0b',
    nodes: [
      { id: 'web', name: 'Web Apps',   emoji: '🌐', proficiency: 'Output', usage: 'React SPAs, Responsive UIs' },
      { id: 'ml',  name: 'ML Models',  emoji: '🤖', proficiency: 'Output', usage: 'Classifiers, Predictors' },
      { id: 'fs',  name: 'Full Stack', emoji: '⚡', proficiency: 'Output', usage: 'End-to-end Applications' },
    ],
  },
]

// ── geometry ──────────────────────────────────────────────────
const W = 960
const H = 500
const R = 38
const LAYER_XS = [70, 290, 580, 880]

function calcPositions() {
  const all = []
  layers.forEach((layer, li) => {
    const n = layer.nodes.length
    const spacing = R * 2 + 20
    const startY = (H - (n - 1) * spacing) / 2
    layer.nodes.forEach((node, ni) => {
      all.push({ ...node, li, x: LAYER_XS[li], y: startY + ni * spacing, layerColor: layer.color })
    })
  })
  return all
}

function calcConnections(nodes) {
  const conns = []
  for (let li = 0; li < layers.length - 1; li++) {
    const from = nodes.filter(n => n.li === li)
    const to   = nodes.filter(n => n.li === li + 1)
    from.forEach(f => to.forEach(t => conns.push({ f, t, key: `${f.id}-${t.id}` })))
  }
  return conns
}

const allNodes       = calcPositions()
const allConnections = calcConnections(allNodes)

// ── component ─────────────────────────────────────────────────
const Skills = () => {
  const [hovered, setHovered] = useState(null)
  const [inView,  setInView]  = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const connectedIds = hovered
    ? new Set(
        allConnections
          .filter(c => c.f.id === hovered || c.t.id === hovered)
          .flatMap(c => [c.f.id, c.t.id])
      )
    : new Set()

  const hoveredNode = allNodes.find(n => n.id === hovered)

  return (
    <section id="skills" ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">
            What I work with
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Skills</h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 text-sm mt-4">
            Hover over any node to see proficiency &amp; usage
          </p>
        </div>

        {/* Neural Network */}
        <div
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ minWidth: 600, maxHeight: 520 }}
            >
              {/* Connections */}
              {allConnections.map(({ f, t, key }) => {
                const isLit  = hovered && (f.id === hovered || t.id === hovered)
                const isDim  = hovered && !isLit
                return (
                  <line
                    key={key}
                    x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                    stroke={isLit ? f.layerColor : '#ffffff'}
                    strokeOpacity={isDim ? 0.02 : isLit ? 0.7 : 0.07}
                    strokeWidth={isLit ? 2 : 1}
                  />
                )
              })}

              {/* Nodes */}
              {allNodes.map(node => {
                const isHov  = hovered === node.id
                const isCon  = connectedIds.has(node.id)
                const isDim  = hovered && !isHov && !isCon

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x},${node.y})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* glow ring */}
                    {isHov && (
                      <circle r={R + 14} fill={node.layerColor} opacity={0.18} />
                    )}
                    {/* circle */}
                    <circle
                      r={R}
                      fill={isHov ? '#1a1a2e' : '#111827'}
                      stroke={isHov || isCon ? node.layerColor : '#374151'}
                      strokeWidth={isHov ? 2.5 : isCon ? 1.5 : 1}
                      opacity={isDim ? 0.25 : 1}
                    />

                    {/* Icon (foreignObject) */}
                    <foreignObject
                      x={-20} y={-26} width={40} height={32}
                      opacity={isDim ? 0.25 : 1}
                    >
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'32px' }}
                      >
                        {node.icon
                          ? <i className={node.icon} style={{ fontSize: 22 }} />
                          : <span style={{ fontSize: 20 }}>{node.emoji}</span>
                        }
                      </div>
                    </foreignObject>

                    {/* Name */}
                    <text
                      y={20} textAnchor="middle"
                      fill={isDim ? '#374151' : '#e5e7eb'}
                      fontSize={10} fontWeight="500"
                    >
                      {node.name}
                    </text>
                  </g>
                )
              })}

              {/* Layer labels */}
              {layers.map((layer, li) => (
                <text
                  key={li}
                  x={LAYER_XS[li]} y={H - 4}
                  textAnchor="middle"
                  fill={layer.color}
                  fontSize={11} fontWeight={600}
                  letterSpacing="0.05em"
                >
                  {layer.sublabel}
                </text>
              ))}
            </svg>
          </div>

          {/* Tooltip */}
          <div className={`mt-6 mx-auto max-w-xs transition-all duration-300 ${
            hoveredNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            {hoveredNode && (
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-center shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-3">
                  {hoveredNode.icon
                    ? <i className={`${hoveredNode.icon} text-2xl`} />
                    : <span className="text-2xl">{hoveredNode.emoji}</span>
                  }
                  <span className="text-white font-semibold text-lg">{hoveredNode.name}</span>
                </div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3"
                  style={{
                    color: PROFICIENCY[hoveredNode.proficiency].color,
                    borderColor: PROFICIENCY[hoveredNode.proficiency].color + '55',
                    backgroundColor: PROFICIENCY[hoveredNode.proficiency].bg,
                  }}
                >
                  {PROFICIENCY[hoveredNode.proficiency].label}
                </span>
                <p className="text-gray-400 text-sm">{hoveredNode.usage}</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {Object.entries(PROFICIENCY).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: val.color }} />
                <span className="text-gray-400 text-sm">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills