import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const ForgotPasswordScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (validateEmail()) {
      navigate('/forgot-password-sent', { state: { email } })
    }
  }

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
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-brand-red mb-6">
          <Lock size={48} />
        </div>

        <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
          Esqueceu sua senha?
        </h1>

        <p className="text-text-secondary text-center text-sm mb-8 max-w-xs">
          Digite seu email e enviaremos um link para redefinir sua senha
        </p>

        <div className="w-full max-w-xs">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            error={error}
          />
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          disabled={!email}
          className="mt-8 max-w-xs h-13"
        >
          Enviar link
        </Button>

        <div className="mt-8">
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

export default ForgotPasswordScreen
