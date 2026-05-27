import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MessageSquare, UserMinus, Plus, ArrowLeft, Users } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { mockChats } from '../messages/MessagesScreen'

const initialConnections = [
  { id: '2', name: 'Ana Paula Silva', belt: 'roxa', academy: 'Alliance SP', status: 'online', role: 'Parceiro de Treino' },
  { id: '3', name: 'Bruno Goulart', belt: 'marrom', academy: 'Checkmat RJ', status: 'online', role: 'Parceiro de Treino' },
  { id: '4', name: 'Fernanda Costa', belt: 'azul', academy: 'Gracie Humaitá', status: 'offline', role: 'Competidor' },
  { id: '5', name: 'Diego Morais', belt: 'preta', academy: 'Nova União', status: 'online', role: 'Mestre / Professor' },
  { id: '6', name: 'Camila Rocha', belt: 'azul', academy: 'GF Team', status: 'offline', role: 'Parceiro de Treino' },
  { id: '7', name: 'Gabriel Santos', belt: 'coral', academy: 'Alliance SP', status: 'online', role: 'Mestre / Professor' },
  { id: '8', name: 'Beatriz Ramos', belt: 'preta', academy: 'Alliance SP', status: 'offline', role: 'Competidor' }
]

const ConnectionsScreen = () => {
  const navigate = useNavigate()
  const [connections, setConnections] = useState(initialConnections)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDisconnect = (id, name) => {
    if (confirm(`Deseja remover ${name} de suas conexões?`)) {
      setConnections(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleStartMessage = (contact) => {
    // Check if chat exists in mock list, if not add it
    const chatExists = mockChats.find(c => c.id === contact.id)
    if (!chatExists) {
      mockChats.unshift({
        id: contact.id,
        userName: contact.name,
        userBelt: contact.belt,
        userAcademy: contact.academy,
        lastMessage: 'Iniciar nova conversa...',
        time: 'Agora',
        unread: false,
        history: []
      })
    }
    navigate(`/messages/${contact.id}`)
  }

  const filteredConnections = connections.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.academy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineCount = connections.filter(c => c.status === 'online').length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen flex flex-col bg-surface-bg relative overflow-hidden"
    >
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/feed')}
            className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-text-primary font-bold text-base flex items-center gap-1.5">
              Conexões
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-text-secondary font-medium">
                {connections.length} Total
              </span>
            </h2>
            <p className="text-text-secondary text-[10px]">Lutadores no seu Círculo</p>
          </div>
        </div>

        <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-xl font-semibold">
          ● {onlineCount} Online
        </span>
      </div>

      {/* Search Input */}
      <div className="px-4 py-3 bg-surface-bg shrink-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input
            type="text"
            placeholder="Pesquisar por nome, equipe ou graduação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-card border border-surface-border rounded-[8px] pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>
      </div>

      {/* Connections List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-1.5 space-y-2 scrollbar-hide">
        {filteredConnections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-tertiary mb-4">
              <Users size={28} />
            </div>
            <h3 className="text-text-primary font-semibold text-sm">Sem conexões</h3>
            <p className="text-text-secondary text-[11px] max-w-[200px] mt-1">
              Nenhuma conexão encontrada para a busca selecionada.
            </p>
          </div>
        ) : (
          filteredConnections.map((contact) => {
            const isOnline = contact.status === 'online'
            return (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-transparent bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Avatar with dynamic online dot */}
                  <div className="relative shrink-0">
                    <Avatar name={contact.name} belt={contact.belt} size="md" shape="square" className="rounded-2xl" />
                    <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface-bg ${isOnline ? 'bg-green-500' : 'bg-text-tertiary'
                      }`} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs font-semibold text-text-primary truncate">{contact.name}</h4>
                      <Badge belt={contact.belt} size="sm" />
                    </div>
                    <p className="text-[10px] text-text-secondary mt-0.5 truncate">{contact.academy}</p>
                    <span className="inline-block text-[9px] bg-white/5 text-text-tertiary px-2 py-0.5 rounded-md mt-1 font-medium">
                      {contact.role}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartMessage(contact)}
                    title="Enviar Mensagem"
                    className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all active:scale-95 shadow-sm"
                  >
                    <MessageSquare size={15} />
                  </button>

                  <button
                    onClick={() => handleDisconnect(contact.id, contact.name)}
                    title="Remover Conexão"
                    className="w-9 h-9 rounded-xl bg-surface-card border border-surface-border text-text-secondary flex items-center justify-center hover:text-brand-red hover:border-brand-red/20 transition-all active:scale-95"
                  >
                    <UserMinus size={15} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      <BottomNav />
    </motion.div>
  )
}

export default ConnectionsScreen
