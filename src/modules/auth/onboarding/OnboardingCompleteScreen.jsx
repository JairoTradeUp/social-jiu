import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../../../components/layout/StatusBar'
import Button from '../../../components/ui/Button'
import { useApp } from '../../../context/AppContext'

const OnboardingCompleteScreen = () => {
  const navigate = useNavigate()
  const { completeOnboarding } = useApp()

  useEffect(() => {
    completeOnboarding({
      belt: 'preta',
      academy: 'Alliance Alphaville',
      professor: 'João Chiozzi Jr.',
      practicingYears: 8,
      interests: ['1', '2', '3'],
    })
  }, [completeOnboarding])

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col items-center justify-center px-4"
    >
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="w-20 h-20 rounded-full bg-brand-red/20 flex items-center justify-center mb-6"
        >
          <span className="text-4xl">✓</span>
        </motion.div>

        <h1 className="text-base font-bold text-white mb-2">
          Tudo pronto! 🎉
        </h1>

        <p className="text-base text-white max-w-xs mb-12">
          Bem-vindo à maior comunidade de Jiu-Jitsu.
        </p>

        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/feed')}
          className="max-w-xs"
        >
          Explorar o App Jiu-jitsu
        </Button>
      </div>
    </motion.div>
  )
}

export default OnboardingCompleteScreen
