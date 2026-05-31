import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const name = "SAHIL SAGAR GUPTA"
const letters = name.split("")

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Letters */}
          <div className="flex gap-1 mb-12">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-5xl font-bold tracking-widest text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: [
                    '0 0 0px #a855f7',
                    '0 0 20px #a855f7',
                    '0 0 8px #a855f7',
                  ]
                }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: 'easeOut'
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            MCA · AI/ML · Full Stack
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-2px bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader