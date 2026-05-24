import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'

const ForgotPasswordSentScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'seu@email.com'
  const [emailResent, setEmailResent] = useState(false)

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <TopBar
        leftAction={
          <button
            onClick={() => navigate('/login')}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <X size={24} />
          </button>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-brand-red mb-6">
          <Mail size={48} />
        </div>

        <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
          Verifique seu email
        </h1>

        <p className="text-text-secondary text-center text-sm mb-8 max-w-xs">
          Enviamos as instruções de recuperação para <strong className="text-text-primary">{email}</strong>
        </p>

        <Button
          fullWidth
          size="lg"
          onClick={() => {}}
          className="max-w-xs h-13"
        >
          Abrir app de email
        </Button>

        <div className="mt-8 text-center">
          <button
            onClick={() => setEmailResent(true)}
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            {emailResent ? '✓ Email reenviado' : 'Reenviar email'}
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/login')}
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ForgotPasswordSentScreen
