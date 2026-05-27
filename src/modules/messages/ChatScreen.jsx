import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Phone, Video, Info } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { mockChats } from './MessagesScreen'

const autoReplies = {
  '2': 'Com certeza! Vou chegar um pouco antes para fazer um rola e aquecer. Oss! 🥋💪',
  '3': 'Tamo junto! Na próxima semana vamos treinar bastante aquela posição de meia-guarda.',
  '5': 'Excelente! Garante a sua vaga no workshop de sábado. Te vejo lá, Oss!',
  '6': 'Claro! Te mando o link do tutorial completo logo após o treino de hoje à noite.'
}

const ChatScreen = () => {
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const foundChat = mockChats.find(c => c.id === chatId)
    if (foundChat) {
      setChat(foundChat)
      setMessages(foundChat.history)
      foundChat.unread = false // Mark as read
    }
  }, [chatId])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chat) return

    const userMsg = {
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Update conversation last message in active mock lists
    chat.lastMessage = newMessage
    chat.time = userMsg.time

    setMessages(prev => [...prev, userMsg])
    setNewMessage('')

    // Trigger mock automatic reply
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const responseText = autoReplies[chat.id] || 'Oss! Treino duro sempre.'
      const replyMsg = {
        sender: 'them',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      chat.lastMessage = responseText
      setMessages(prev => [...prev, replyMsg])
    }, 1500)
  }

  if (!chat) return null

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 bg-surface-bg flex flex-col z-50 w-full h-full overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-bg shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/messages')}
            className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-2">
            <Avatar name={chat.userName} belt={chat.userBelt} size="sm" shape="square" className="rounded-xl" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-text-primary font-bold text-xs">{chat.userName}</h3>
                <Badge belt={chat.userBelt} size="sm" />
              </div>
              <p className="text-[9px] text-[#25D366]">Online agora</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Phone size={18} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Video size={18} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Messages Bubbles List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-surface-bg scrollbar-hide">
        <div className="flex flex-col items-center justify-center text-center py-6 border-b border-white/[0.03] mb-4">
          <Avatar name={chat.userName} belt={chat.userBelt} size="lg" shape="square" className="rounded-3xl shadow-lg" />
          <h4 className="text-text-primary font-bold text-sm mt-3">{chat.userName}</h4>
          <p className="text-text-secondary text-[11px] mt-0.5">{chat.userAcademy}</p>
          <span className="text-[10px] bg-white/5 border border-white/[0.04] text-text-secondary rounded-lg px-2.5 py-1 mt-2.5">
            Faixa {chat.userBelt.toUpperCase()}
          </span>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.sender === 'me'
          return (
            <div
              key={index}
              className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[75%] items-end ${isMe ? 'flex-row-reverse' : ''}`}>
                {!isMe && (
                  <Avatar name={chat.userName} belt={chat.userBelt} size="sm" shape="square" className="rounded-lg shrink-0 w-6 h-6 text-[10px] mb-1" />
                )}
                <div>
                  <div
                    className={`px-3.5 py-2.5 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-brand-red text-white rounded-t-2xl rounded-l-2xl rounded-br-sm'
                        : 'bg-white/[0.06] border border-white/[0.04] text-text-primary rounded-t-2xl rounded-r-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className={`text-[9px] text-text-tertiary block mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex justify-start w-full"
            >
              <div className="flex gap-2 items-center">
                <Avatar name={chat.userName} belt={chat.userBelt} size="sm" shape="square" className="rounded-lg shrink-0 w-6 h-6 text-[10px]" />
                <div className="bg-white/[0.06] border border-white/[0.04] px-4 py-3 rounded-full flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty anchor to scroll to */}
        <div ref={scrollRef} />
      </div>

      {/* Input Message Bar */}
      <div className="border-t border-surface-border p-4 flex items-center gap-3 bg-surface-bg sticky bottom-0 shrink-0">
        <input
          type="text"
          placeholder="Enviar mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-surface-card border border-surface-border rounded-[8px] px-4 py-3 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors text-xs"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="w-10 h-10 rounded-full bg-brand-red hover:bg-brand-red-dark disabled:bg-surface-border disabled:text-text-tertiary flex items-center justify-center text-white transition-all shadow-lg active:scale-95 shrink-0"
        >
          <Send size={16} className="ml-0.5" />
        </button>
      </div>
    </motion.div>
  )
}

export default ChatScreen
