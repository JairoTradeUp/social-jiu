import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import StatusBar from '../../../components/layout/StatusBar'
import ProgressBar from '../../../components/ui/ProgressBar'
import Button from '../../../components/ui/Button'
import { interests } from '../../../data/mockData'

const SelectInterestsScreen = () => {
  const navigate = useNavigate()
  const [selectedInterests, setSelectedInterests] = useState([])

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
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
      <ProgressBar current={4} total={5} />

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col justify-between pb-20">
        <div>
          <h1 className="text-base font-bold text-white mb-1">O que você busca?</h1>
          <p className="text-base text-white mb-6">Selecione pelo menos um interesse</p>

          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id)
              const IconComponent = Icons[interest.icon.split('-').map((word, i) =>
                i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
              ).join('')]

              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-3xl border-2 transition-colors flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'border-brand-red bg-surface-elevated'
                      : 'border-surface-border bg-surface-card'
                  }`}
                >
                  {IconComponent && (
                    <div style={{ color: isSelected ? '#d9434f' : '#888888' }}>
                      <IconComponent size={24} />
                    </div>
                  )}
                  <p className="text-text-primary font-medium text-xs text-center">
                    {interest.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/onboarding/suggested')}
          disabled={selectedInterests.length === 0}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  )
}

export default SelectInterestsScreen
