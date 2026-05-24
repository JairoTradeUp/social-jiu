import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, Globe } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useApp } from '../../context/AppContext'
import { currentUser } from '../../data/mockData'

const LoginScreen = () => {
  const navigate = useNavigate()
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = () => {
    if (validateForm()) {
      login(currentUser)
      navigate('/onboarding/welcome')
    }
  }

  const handleSocialLogin = (provider) => {
    login(currentUser)
    navigate('/onboarding/welcome')
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
      <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col justify-between pb-20">
        <div>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="text-3xl">🥋</div>
          </div>

          {/* Título e subtítulo */}
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-text-secondary text-center text-sm mb-8">
            Entre na comunidade BJJ
          </p>

          {/* Formulário */}
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
              error={errors.email}
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
              error={errors.password}
            />
          </div>

          {/* Esqueci minha senha */}
          <div className="mt-4 text-right">
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-brand-red text-sm font-medium hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Botão de login */}
          <Button
            fullWidth
            size="lg"
            onClick={handleLogin}
            disabled={!email || !password}
            className="mt-8 h-13"
          >
            Entrar
          </Button>

          {/* Divisor */}
          <div className="flex items-center my-8 gap-3">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-text-tertiary text-sm">ou continue com</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors"
            >
              <Globe size={20} className="text-text-secondary" />
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors"
            >
              <Apple size={20} className="text-text-secondary" />
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors"
            >
              <span className="text-sm font-bold text-text-secondary">f</span>
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center text-text-secondary text-sm mt-8">
          Não tem conta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-brand-red font-medium hover:underline"
          >
            Criar conta
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginScreen
