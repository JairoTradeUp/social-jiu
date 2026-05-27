import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Send, Search, Share2 } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { suggestedUsers } from '../../data/mockData'

const ShareSheet = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [sentSuccess, setSentSuccess] = useState(false)

  // Auto-reset toast success messages
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  useEffect(() => {
    if (sentSuccess) {
      const timer = setTimeout(() => {
        setSentSuccess(false)
        onClose()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [sentSuccess])

  if (!isOpen) return null

  const handleCopyLink = () => {
    // Simulating copying link
    navigator.clipboard?.writeText(`https://socialjiu.com/posts/${post.id}`)
      .catch(() => {})
    setCopied(true)
  }

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSendToFriends = () => {
    if (selectedUsers.length > 0) {
      setSentSuccess(true)
      setSelectedUsers([])
    }
  }

  const filteredFriends = suggestedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const shareChannels = [
    { name: 'WhatsApp', color: 'bg-[#25D366]/10 text-[#25D366]', action: () => alert('Compartilhado no WhatsApp!') },
    { name: 'Instagram', color: 'bg-[#E1306C]/10 text-[#E1306C]', action: () => alert('Compartilhado no Instagram!') },
    { name: 'Twitter/X', color: 'bg-white/10 text-white', action: () => alert('Compartilhado no Twitter/X!') }
  ]

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-[100] overflow-hidden rounded-[32px]">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
        />

        {/* Dynamic toasts */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[110] pointer-events-none">
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="bg-brand-red text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-brand-red/30"
              >
                <Check size={14} />
                Link copiado com sucesso!
              </motion.div>
            )}
            {sentSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="bg-[#25D366] text-black text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
              >
                <Send size={14} />
                Publicação enviada!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Share Sheet Drawer */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="absolute bottom-0 inset-x-0 bg-surface-card border-t border-surface-border rounded-t-[32px] shadow-2xl flex flex-col p-4 z-[105]"
        >
          {/* Header indicator */}
          <div className="w-12 h-1 bg-surface-border rounded-full mx-auto mb-4 shrink-0" />

          {/* Title */}
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <Share2 size={18} className="text-brand-red" />
            <h3 className="text-text-primary font-bold text-base">Compartilhar</h3>
          </div>

          {/* Quick Channels / Link Copy */}
          <div className="grid grid-cols-4 gap-2 mb-6 shrink-0">
            <button
              onClick={handleCopyLink}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                copied
                  ? 'bg-brand-red/10 border-brand-red text-brand-red'
                  : 'bg-white/[0.03] border-white/[0.05] text-text-primary hover:bg-white/[0.06]'
              }`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              <span className="text-[10px] mt-1.5 font-medium">Copiar Link</span>
            </button>

            {shareChannels.map(({ name, color, action }) => (
              <button
                key={name}
                onClick={action}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-white/[0.04] transition-all hover:scale-102 ${color}`}
              >
                <Share2 size={20} />
                <span className="text-[10px] mt-1.5 font-medium">{name}</span>
              </button>
            ))}
          </div>

          {/* Search bar for friends */}
          <div className="relative mb-4 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              type="text"
              placeholder="Buscar amigos para enviar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-bg border border-surface-border rounded-[8px] pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>

          {/* Friends list */}
          <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1 scrollbar-hide">
            {filteredFriends.length === 0 ? (
              <p className="text-text-secondary text-xs text-center py-4">Nenhum lutador encontrado.</p>
            ) : (
              filteredFriends.map((user) => {
                const isSelected = selectedUsers.includes(user.id)
                return (
                  <div
                    key={user.id}
                    onClick={() => toggleSelectUser(user.id)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.05] border-brand-red/30'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} belt={user.belt} size="sm" />
                      <div>
                        <p className="text-text-primary text-xs font-semibold">{user.name}</p>
                        <p className="text-text-secondary text-[10px]">{user.academy || 'Sem academia'}</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-brand-red border-brand-red text-white'
                          : 'border-surface-border'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Action button */}
          <button
            onClick={handleSendToFriends}
            disabled={selectedUsers.length === 0}
            className="w-full bg-brand-red hover:bg-brand-red-dark disabled:bg-surface-border disabled:text-text-tertiary text-white text-xs font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 shrink-0"
          >
            <Send size={14} />
            Enviar para {selectedUsers.length} {selectedUsers.length === 1 ? 'amigo' : 'amigos'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ShareSheet
