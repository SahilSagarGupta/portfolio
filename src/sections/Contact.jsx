import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'


const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/SahilSagarGupta',
    icon: <FaGithub size={20} />,
    color: 'hover:text-gray-950 dark:hover:text-white hover:border-gray-950 dark:hover:border-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/sahilsagargupta',
    icon: <FaLinkedin size={20} />,
    color: 'hover:text-blue-400 hover:border-blue-400',
  },
  {
    name: 'Email',
    href: 'mailto:sahilsagar.dev@gmail.com',
    icon: <FaEnvelope size={20} />,
    color: 'hover:text-purple-400 hover:border-purple-400',
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

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

const handleChange = (e) => {
  const key = e.target.name === 'from_name' ? 'name' 
    : e.target.name === 'from_email' ? 'email' 
    : 'message'
  setForm({ ...form, [key]: e.target.value })
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

const inputClass = `w-full px-4 py-3 rounded-xl 
    bg-gray-100 dark:bg-gray-800/50
    border border-gray-200 dark:border-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50
    transition-all duration-200 text-sm`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className=" bg-gray-50 dark:bg-gray-900 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 dark:text-gray-400 text-gray-500 mt-4 text-sm">
            Open to internships, collaborations, and full-time opportunities
          </p>
        </div>
        </ScrollReveal> 

        <div
          className={`grid grid-cols-1 lg:grid-cols-5 gap-10 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left — Info */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-8">

            {/* Terminal card */}
            <div className="bg-gray-900 dark:bg-gray-900 bg-gray-50 rounded-2xl overflow-hidden border border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-800 bg-gray-200 border-b border-gray-700 dark:border-gray-700 border-gray-300">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-gray-500 font-mono">contact.sh</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                <p className="text-purple-400">&gt; status</p>
                <p className="text-green-400">✓ Available for work</p>
                <p className="text-purple-400 mt-3">&gt; location</p>
                <p className="text-gray-300 dark:text-gray-300 ">Chandigarh, India</p>
                <p className="text-purple-400 mt-3">&gt; interests</p>
                <p className="text-gray-300 dark:text-gray-300">AI Engineer · ML Engineer</p>
                <p className="text-gray-300 dark:text-gray-300">Full Stack · Frontend Dev</p>
                <p className="text-purple-400 mt-3">&gt; response_time</p>
                <p className="text-yellow-400">~ within 24 hours</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs dark:text-gray-300 uppercase tracking-widest font-medium mb-4">
                Find me on
              </p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-800 dark:border-gray-800 border-gray-200 text-gray-600 dark:text-gray-400 text-gray-500 ${link.color} transition-all duration-200 hover: scale-[1.02]`}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
              <p className="text-black dark:text-white text-gray-900 font-semibold text-lg mb-6">
                Send a message
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/25"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 text-sm">
                    <HiCheckCircle size={18} />
                    Message sent! I'll get back to you within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-sm">
                    <HiXCircle size={18} />
                    Something went wrong. Try emailing me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact