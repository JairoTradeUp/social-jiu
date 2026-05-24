import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Apple, Globe, Check } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const RegisterScreen = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [errors, setErrors] = useState({})

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null
    if (pwd.length < 6) return 'weak'
    if (pwd.length < 10 || !/[A-Z]/.test(pwd)) return 'medium'
    return 'strong'
  }

  const strength = getPasswordStrength(password)
  const strengthColor = {
    weak: '#C0203A',
    medium: '#F59E0B',
    strong: '#10B981',
  }

  const validateForm = () => {
    const newErrors = {}
    if (!name || name.length < 3) newErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email inválido'
    if (!password || password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = () => {
    if (validateForm() && termsAccepted) {
      navigate('/login')
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
        title="Criar conta"
        leftAction={
          <button
            onClick={() => navigate('/login')}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col justify-between pb-20">
        <div className="space-y-4">
          <Input
            label="Nome completo"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors({ ...errors, name: '' })
            }}
            error={errors.name}
          />

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

          <div>
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
            {strength && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: strengthColor[strength] }} />
                <span className="text-xs text-text-secondary capitalize">
                  {strength === 'weak' ? 'Fraca' : strength === 'medium' ? 'Média' : 'Forte'}
                </span>
              </div>
            )}
          </div>

          <Input
            label="Confirmar senha"
            type="password"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
            }}
            error={errors.confirmPassword}
          />

          {/* Checkbox de termos */}
          <div className="flex items-start gap-3 py-4">
            <button
              onClick={() => setTermsAccepted(!termsAccepted)}
              className="mt-1 w-5 h-5 rounded border border-surface-border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: termsAccepted ? '#C0203A' : 'transparent',
                borderColor: termsAccepted ? '#C0203A' : '#2A2A2A',
              }}
            >
              {termsAccepted && <Check size={16} className="text-white" />}
            </button>
            <p className="text-text-secondary text-sm">
              Concordo com os{' '}
              <button onClick={() => {}} className="text-brand-red font-medium hover:underline">
                Termos de Serviço
              </button>
              {' '}e{' '}
              <button onClick={() => {}} className="text-brand-red font-medium hover:underline">
                Política de Privacidade
              </button>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            fullWidth
            size="lg"
            onClick={handleRegister}
            disabled={!name || !email || !password || !confirmPassword || !termsAccepted}
            className="h-13"
          >
            Criar conta
          </Button>

          {/* Divisor */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-text-tertiary text-sm">ou continue com</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3">
            <button className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors">
              <Globe size={20} className="text-text-secondary" />
            </button>
            <button className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors">
              <Apple size={20} className="text-text-secondary" />
            </button>
            <button className="h-12 border border-surface-border rounded-3xl flex items-center justify-center hover:bg-surface-elevated transition-colors">
              <span className="text-sm font-bold text-text-secondary">f</span>
            </button>
          </div>

          <div className="text-center text-text-secondary text-sm">
            Já tem conta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-brand-red font-medium hover:underline"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RegisterScreen
