import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const ResetPasswordScreen = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

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
    if (!password || password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleReset = () => {
    if (validateForm()) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-screen bg-surface-bg flex flex-col items-center justify-center"
      >
        <StatusBar />
        <motion.div
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
        >
          <Check size={40} className="text-green-500" />
        </motion.div>
        <h1 className="text-2xl font-bold text-text-primary text-center">Senha alterada com sucesso!</h1>
      </motion.div>
    )
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
        title="Nova senha"
        leftAction={
          <button
            onClick={() => navigate(-1)}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col justify-between pb-20">
        <div className="space-y-6">
          <div>
            <Input
              label="Nova senha"
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
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handleReset}
          disabled={!password || !confirmPassword}
          className="h-13"
        >
          Redefinir senha
        </Button>
      </div>
    </motion.div>
  )
}

export default ResetPasswordScreen
