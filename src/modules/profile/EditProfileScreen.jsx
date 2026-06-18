import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'
import { useApp } from '../../context/AppContext'
import { currentUser as defaultUser } from '../../data/mockData'

const EditProfileScreen = () => {
  const navigate = useNavigate()
  const { currentUser: contextUser, updateProfile } = useApp()
  const currentUser = contextUser || defaultUser

  const [formData, setFormData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    bio: currentUser.bio,
    city: currentUser.city,
    belt: currentUser.belt,
    academy: currentUser.academy,
    professor: currentUser.professor,
    instagram: '',
    youtube: '',
    isPublic: true,
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    updateProfile(formData)
    navigate('/profile')
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
        title="Editar perfil"
        leftAction={
          <button
            onClick={() => navigate('/profile')}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        }
        rightAction={
          <button
            onClick={handleSave}
            className="text-brand-red hover:text-brand-red-dark font-semibold text-sm transition-colors"
          >
            Salvar
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar name={formData.name} belt={formData.belt} size="xl" />
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-brand-red flex items-center justify-center hover:bg-brand-red-dark transition-colors">
              <Camera size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Informações básicas */}
        <div className="mb-8">
          <h3 className="text-text-primary font-semibold text-sm mb-4">Informações básicas</h3>
          <div className="space-y-4">
            <Input
              label="Nome completo"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            <div>
              <label className="block text-text-secondary text-sm mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                maxLength={150}
                rows={3}
                className="w-full bg-surface-card border border-surface-border rounded-[8px] px-4 py-3 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors resize-none"
                placeholder="Conte sobre você"
              />
              <p className="text-text-tertiary text-xs mt-1">{formData.bio.length}/150</p>
            </div>
            <Input
              label="Cidade"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
        </div>

        {/* Jiu-Jitsu */}
        <div className="mb-8">
          <h3 className="text-text-primary font-semibold text-sm mb-4">Jiu-Jitsu</h3>
          <div className="space-y-4">
            <Input
              label="Faixa"
              value={formData.belt}
              onChange={(e) => handleChange('belt', e.target.value)}
            />
            <Input
              label="Academia"
              value={formData.academy}
              onChange={(e) => handleChange('academy', e.target.value)}
            />
            <Input
              label="Professor"
              value={formData.professor}
              onChange={(e) => handleChange('professor', e.target.value)}
            />
          </div>
        </div>

        {/* Links */}
        <div className="mb-8">
          <h3 className="text-text-primary font-semibold text-sm mb-4">Links</h3>
          <div className="space-y-4">
            <Input
              label="Instagram (opcional)"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="@seu_usuario"
            />
            <Input
              label="YouTube (opcional)"
              value={formData.youtube}
              onChange={(e) => handleChange('youtube', e.target.value)}
              placeholder="seu_canal"
            />
          </div>
        </div>

        {/* Privacidade */}
        <div className="mb-8">
          <h3 className="text-text-primary font-semibold text-sm mb-4">Privacidade</h3>
          <div className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-3xl">
            <p className="text-text-primary text-sm">Perfil público</p>
            <button
              onClick={() => handleChange('isPublic', !formData.isPublic)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{
                backgroundColor: formData.isPublic ? '#42587B' : '#2A2A2A',
              }}
            >
              <div
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                style={{
                  left: formData.isPublic ? '24px' : '2px',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EditProfileScreen
