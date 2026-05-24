import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../../../components/layout/StatusBar'
import ProgressBar from '../../../components/ui/ProgressBar'
import Button from '../../../components/ui/Button'
import { allBelts, beltColors } from '../../../data/mockData'

const SelectBeltScreen = () => {
  const navigate = useNavigate()
  const [selectedBelt, setSelectedBelt] = useState(null)

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <ProgressBar current={2} total={5} />

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col justify-between pb-20">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Qual é sua faixa?</h1>
          <p className="text-text-secondary text-sm mb-6">Selecione sua faixa atual</p>

          <div className="grid grid-cols-2 gap-3">
            {allBelts.map((belt) => {
              const color = beltColors[belt.id]
              const isSelected = selectedBelt === belt.id

              return (
                <button
                  key={belt.id}
                  onClick={() => setSelectedBelt(belt.id)}
                  className={`p-4 rounded-3xl border-2 transition-colors ${
                    isSelected
                      ? 'border-brand-red bg-surface-elevated'
                      : 'border-surface-border bg-surface-card'
                  }`}
                >
                  <div
                    className="h-2 rounded-full mb-3"
                    style={{ backgroundColor: color.bg }}
                  />
                  <p className="text-text-primary font-medium text-sm">{belt.label}</p>
                </button>
              )
            })}
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/onboarding/academy')}
          disabled={!selectedBelt}
          className="h-13"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  )
}

export default SelectBeltScreen
