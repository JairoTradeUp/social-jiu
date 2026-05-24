import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../../../components/layout/StatusBar'
import ProgressBar from '../../../components/ui/ProgressBar'
import Button from '../../../components/ui/Button'
import { useApp } from '../../../context/AppContext'

const WelcomeScreen = () => {
  const navigate = useNavigate()
  const { currentUser } = useApp()

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <ProgressBar current={1} total={5} />

      <div className="flex-1 flex flex-col items-center justify-between px-4 py-8 pb-20">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-6">🥋</div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Bem-vindo, {currentUser?.name.split(' ')[0]}! 👋
          </h1>

          <p className="text-text-secondary text-sm max-w-xs">
            Vamos configurar seu perfil para conectar você com a comunidade BJJ.
          </p>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/onboarding/belt')}
          className="h-13"
        >
          Vamos começar
        </Button>
      </div>
    </motion.div>
  )
}

export default WelcomeScreen
