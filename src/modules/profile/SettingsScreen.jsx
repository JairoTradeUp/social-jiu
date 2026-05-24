import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { useApp } from '../../context/AppContext'

const SettingsScreen = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useApp()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
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
        title="Configurações"
        leftAction={
          <button
            onClick={() => navigate('/profile')}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Perfil Card */}
        <button
          onClick={() => navigate('/profile/edit')}
          className="mx-4 my-4 p-4 bg-surface-card border border-surface-border rounded-3xl flex items-center gap-3 hover:bg-surface-elevated transition-colors"
        >
          <Avatar name={currentUser.name} belt={currentUser.belt} size="md" />
          <div className="flex-1 text-left">
            <p className="text-text-primary font-semibold text-sm">{currentUser.name}</p>
            <p className="text-text-secondary text-xs">@{currentUser.username}</p>
          </div>
          <ChevronRight size={20} className="text-text-secondary" />
        </button>

        {/* Conta */}
        <div className="my-6">
          <h3 className="text-text-secondary text-xs font-semibold px-4 mb-3 uppercase">Conta</h3>
          <div className="space-y-1">
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Notificações</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{
                  backgroundColor: notifications ? '#C0203A' : '#2A2A2A',
                }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                  style={{
                    left: notifications ? '24px' : '2px',
                  }}
                />
              </button>
            </button>
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Configurações gerais</span>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Aparência */}
        <div className="my-6">
          <h3 className="text-text-secondary text-xs font-semibold px-4 mb-3 uppercase">Aparência</h3>
          <div className="space-y-1">
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                disabled
                className="relative w-12 h-6 rounded-full"
                style={{
                  backgroundColor: darkMode ? '#C0203A' : '#2A2A2A',
                }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                  style={{
                    left: darkMode ? '24px' : '2px',
                  }}
                />
              </button>
            </button>
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Idioma</span>
              <span className="text-text-secondary text-sm">Português</span>
            </button>
          </div>
        </div>

        {/* Social */}
        <div className="my-6">
          <h3 className="text-text-secondary text-xs font-semibold px-4 mb-3 uppercase">Social</h3>
          <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
            <span className="text-sm">Meus contatos</span>
            <ChevronRight size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Suporte */}
        <div className="my-6">
          <h3 className="text-text-secondary text-xs font-semibold px-4 mb-3 uppercase">Suporte</h3>
          <div className="space-y-1">
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">FAQ</span>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Termos de serviço</span>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-card/50 transition-colors text-text-primary">
              <span className="text-sm">Política de privacidade</span>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 my-8 space-y-4">
          <Button
            fullWidth
            variant="danger"
            onClick={() => setShowLogoutModal(true)}
          >
            Sair
          </Button>
          <button className="w-full text-text-tertiary hover:text-text-secondary text-sm transition-colors">
            Excluir conta
          </button>
        </div>
      </div>

      {/* Modal de logout */}
      {showLogoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-surface-card border border-surface-border rounded-4xl p-6 max-w-xs w-full"
          >
            <h2 className="text-text-primary font-bold text-lg mb-2">Tem certeza?</h2>
            <p className="text-text-secondary text-sm mb-6">
              Tem certeza que deseja sair?
            </p>
            <div className="flex gap-3">
              <Button
                fullWidth
                variant="secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="danger"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SettingsScreen
