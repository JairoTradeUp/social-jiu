import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../../components/layout/StatusBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Logo from '../../components/Logo'
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
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-20 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center mb-8">
            <Logo width={121} height={96} />
          </div>

          {/* Form Container */}
          <div className="max-w-xs mx-auto">
            {/* Formulário */}
            <div className="flex flex-col gap-4 mb-4">
              <Input
                label="E-mail"
                type="email"
                placeholder="joaosilva@gmail.com"
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
            <div className="mb-8 mt-2">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-brand-red text-sm font-semibold hover:opacity-80 transition-opacity"
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
            >
              Entrar
            </Button>

            {/* Social Login */}
            <div className="mt-8">
              {/* Ou entre com */}
              <div className="text-center mb-5">
                <p className="text-text-label text-sm font-medium mb-4">
                  ou entre com
                </p>
              </div>

              {/* Social buttons */}
              <div className="flex gap-6 justify-center mb-5">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-[34px] h-[34px] bg-transparent border-0 p-0 hover:opacity-80 active:scale-95 flex items-center justify-center transition-all"
                  title="Entrar com Google"
                >
                  <img
                    src="/assets/google-icon.png"
                    alt="Google"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-[34px] h-[34px] bg-transparent border-0 p-0 hover:opacity-80 active:scale-95 flex items-center justify-center transition-all"
                  title="Entrar com Facebook"
                >
                  <img
                    src="/assets/facebook-icon.png"
                    alt="Facebook"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>

              {/* Divisor */}
              <div className="h-px bg-surface-input-border my-5" />

              {/* Criar conta */}
              <div className="text-center">
                <p className="text-text-placeholder text-base m-0">
                  Não possui uma conta?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-brand-red font-semibold hover:opacity-80 transition-opacity"
                  >
                    Criar conta
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginScreen
