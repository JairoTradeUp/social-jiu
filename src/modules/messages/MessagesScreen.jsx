import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, MessageSquarePlus, Circle, X } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'

export const mockChats = [
  {
    id: '2',
    userName: 'Ana Paula Silva',
    userBelt: 'roxa',
    userAcademy: 'Alliance Alphaville',
    lastMessage: 'E aí, vamos treinar hoje na Alliance?',
    time: '14:32',
    unread: true,
    history: [
      { sender: 'them', text: 'Oi! Vi seu post sobre transição de meia-guarda.', time: '14:15' },
      { sender: 'me', text: 'Opa, fala Ana! Sim, estou estudando bastante essa posição.', time: '14:20' },
      { sender: 'them', text: 'Muito bacana. E aí, vamos treinar hoje na Alliance?', time: '14:32' }
    ]
  },
  {
    id: '3',
    userName: 'Bruno Goulart',
    userBelt: 'marrom',
    userAcademy: 'Checkmat RJ',
    lastMessage: 'A passagem de guarda que postou ficou animal!',
    time: '12:15',
    unread: false,
    history: [
      { sender: 'me', text: 'Grande Bruno! Viu os detalhes da lapela?', time: '11:50' },
      { sender: 'them', text: 'Vi sim, muito prático. A passagem de guarda que postou ficou animal!', time: '12:15' }
    ]
  },
  {
    id: '5',
    userName: 'Diego Morais',
    userBelt: 'preta',
    userAcademy: 'Nova União',
    lastMessage: 'Oss! Quinta-feira tem seminário especial.',
    time: 'Ontem',
    unread: false,
    history: [
      { sender: 'them', text: 'Tudo bem? Como estão os treinos?', time: 'Ontem 18:30' },
      { sender: 'me', text: 'Tudo ótimo, mestre! Sempre no foco.', time: 'Ontem 18:45' },
      { sender: 'them', text: 'Oss! Quinta-feira tem seminário especial.', time: 'Ontem 19:00' }
    ]
  },
  {
    id: '6',
    userName: 'Camila Rocha',
    userBelt: 'azul',
    userAcademy: 'GF Team',
    lastMessage: 'Você consegue me passar aquele tutorial depois?',
    time: '23/05',
    unread: false,
    history: [
      { sender: 'them', text: 'Oi, tudo bem? Aquele vídeo ficou muito bom.', time: '23/05 20:00' },
      { sender: 'them', text: 'Você consegue me passar aquele tutorial depois?', time: '23/05 20:05' }
    ]
  }
]

const contacts = [
  { id: '2', name: 'Ana Paula Silva', belt: 'roxa', academy: 'Alliance Alphaville' },
  { id: '3', name: 'Bruno Goulart', belt: 'marrom', academy: 'Checkmat RJ' },
  { id: '4', name: 'Fernanda Costa', belt: 'azul', academy: 'Gracie Humaitá' },
  { id: '5', name: 'Diego Morais', belt: 'preta', academy: 'Nova União' },
  { id: '6', name: 'Camila Rocha', belt: 'azul', academy: 'GF Team' },
  { id: '7', name: 'Gabriel Santos', belt: 'coral', academy: 'Alliance Alphaville' },
  { id: '8', name: 'Beatriz Ramos', belt: 'preta', academy: 'Alliance Alphaville' }
]

const MessagesScreen = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState(mockChats)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [contactSearchQuery, setContactSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    contact.academy.toLowerCase().includes(contactSearchQuery.toLowerCase())
  )

  const handleStartChat = (contact) => {
    // Check if chat exists
    const chatExists = chats.find(c => c.id === contact.id)
    if (!chatExists) {
      const newChat = {
        id: contact.id,
        userName: contact.name,
        userBelt: contact.belt,
        userAcademy: contact.academy,
        lastMessage: 'Iniciar nova conversa...',
        time: 'Agora',
        unread: false,
        history: []
      }
      mockChats.unshift(newChat)
      setChats([newChat, ...chats])
    }
    setIsNewMessageOpen(false)
    navigate(`/messages/${contact.id}`)
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 bg-surface-bg flex flex-col z-50 w-full h-full overflow-hidden"
    >
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
            <h2 className="text-text-primary font-bold text-base">Mensagens</h2>
            <p className="text-text-secondary text-[10px]">Direct Messages</p>
          </div>
        </div>

        <button
          onClick={() => setIsNewMessageOpen(true)}
          className="text-brand-red hover:opacity-85 transition-opacity active:scale-95"
        >
          <MessageSquarePlus size={26} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-surface-bg shrink-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input
            type="text"
            placeholder="Pesquisar conversa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-card border border-surface-border rounded-[8px] pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 bg-surface-bg scrollbar-hide">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-text-secondary text-xs">Nenhuma conversa encontrada.</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/messages/${chat.id}`)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${chat.unread
                ? 'bg-white/[0.03] border-brand-red/10'
                : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <Avatar name={chat.userName} belt={chat.userBelt} size="md" shape="square" className="rounded-2xl" />
                  {chat.unread && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-red rounded-full border-2 border-surface-bg" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-xs font-semibold truncate ${chat.unread ? 'text-white' : 'text-text-primary'}`}>
                      {chat.userName}
                    </p>
                    <Badge belt={chat.userBelt} size="sm" />
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${chat.unread ? 'text-white font-medium' : 'text-text-secondary'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 ml-3 shrink-0">
                <span className="text-[10px] text-text-tertiary">{chat.time}</span>
                {chat.unread && (
                  <Circle size={8} fill="#42587B" className="text-brand-red animate-pulse" />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Message Slide-up Overlay */}
      <AnimatePresence>
        {isNewMessageOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-0 bg-surface-bg flex flex-col z-50 w-full h-full overflow-hidden"
          >
            {/* Overlay Header */}
            <div className="px-4 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsNewMessageOpen(false)}
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h2 className="text-text-primary font-bold text-base">Nova Mensagem</h2>
                  <p className="text-text-secondary text-[10px]">Iniciar Chat</p>
                </div>
              </div>

              <button
                onClick={() => setIsNewMessageOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contacts Search Bar */}
            <div className="px-4 py-3 bg-surface-bg shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input
                  type="text"
                  placeholder="Pesquisar contatos..."
                  value={contactSearchQuery}
                  onChange={(e) => setContactSearchQuery(e.target.value)}
                  className="w-full bg-surface-card border border-surface-border rounded-[8px] pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 bg-surface-bg scrollbar-hide">
              {filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-text-secondary text-xs">Nenhum contato encontrado.</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleStartChat(contact)}
                    className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:bg-white/[0.03] hover:border-white/[0.02] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <Avatar name={contact.name} belt={contact.belt} size="md" shape="square" className="rounded-2xl" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-text-primary truncate">
                            {contact.name}
                          </p>
                          <Badge belt={contact.belt} size="sm" />
                        </div>
                        <p className="text-[10px] text-text-secondary truncate mt-0.5">
                          {contact.academy}
                        </p>
                      </div>
                    </div>

                    <button className="text-[11px] bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white px-3 py-1.5 rounded-xl font-medium transition-all">
                      Conversar
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MessagesScreen

