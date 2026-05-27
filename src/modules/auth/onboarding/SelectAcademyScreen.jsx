import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import StatusBar from '../../../components/layout/StatusBar'
import ProgressBar from '../../../components/ui/ProgressBar'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Avatar from '../../../components/ui/Avatar'
import { mockAcademies } from '../../../data/mockData'

const SelectAcademyScreen = () => {
  const navigate = useNavigate()
  const [selectedAcademy, setSelectedAcademy] = useState(null)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [noAcademy, setNoAcademy] = useState(false)

  const filteredAcademies = mockAcademies.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <ProgressBar current={3} total={5} />

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col justify-between pb-20">
        <div>
          <h1 className="text-base font-bold text-white mb-1">Onde você treina?</h1>
          <p className="text-base text-white mb-6">Selecione sua academia</p>

          <div className="space-y-4 mb-6">
            <Input
              label="Nome da academia"
              placeholder="Alliance SP"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={MapPin}
            />
            <Input
              label="Cidade"
              placeholder="São Paulo, SP"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Sugestões */}
          <div className="space-y-2 mb-6">
            {filteredAcademies.map((academy) => (
              <button
                key={academy.id}
                onClick={() => {
                  setSelectedAcademy(academy.id)
                  setSearch(academy.name)
                  setCity(academy.city)
                }}
                className={`w-full p-4 rounded-3xl border transition-colors flex items-center gap-3 ${selectedAcademy === academy.id
                    ? 'border-brand-red bg-surface-elevated'
                    : 'border-surface-border bg-surface-card'
                  }`}
              >
                <Avatar name={academy.name} belt="azul" size="sm" />
                <div className="flex-1 text-left">
                  <p className="text-text-primary font-medium text-sm">{academy.name}</p>
                  <p className="text-text-secondary text-xs">{academy.city}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Toggle sem academia */}
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => setNoAcademy(!noAcademy)}
              className="w-5 h-5 rounded border border-surface-border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: noAcademy ? '#d9434f' : 'transparent',
                borderColor: noAcademy ? '#d9434f' : '#2A2A2A',
              }}
            >
              {noAcademy && <span className="text-white text-xs">✓</span>}
            </button>
            <p className="text-white text-base">Treino em casa / sem academia</p>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/onboarding/interests')}
          disabled={!selectedAcademy && !noAcademy}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  )
}

export default SelectAcademyScreen
