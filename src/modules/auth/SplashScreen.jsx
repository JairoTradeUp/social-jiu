import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-screen bg-surface-bg flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="text-4xl">🥋</div>
      </motion.div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-text-primary">Social</span>
        <span className="text-3xl font-bold text-brand-red">Jiu</span>
      </div>
    </motion.div>
  )
}

export default SplashScreen
