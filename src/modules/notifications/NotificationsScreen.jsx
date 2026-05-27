import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Bell, Heart, MessageSquare, UserPlus, Award, Calendar, Check, Trash2 } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'

const initialNotifications = [
  {
    id: '1',
    type: 'like',
    userName: 'Diego Morais',
    userBelt: 'preta',
    userAcademy: 'Nova União',
    content: 'curtiu seu artigo técnico "Workshop de Leg Locks".',
    time: '5m',
    read: false,
    postId: '3'
  },
  {
    id: '2',
    type: 'comment',
    userName: 'Ana Paula Silva',
    userBelt: 'roxa',
    userAcademy: 'Alliance SP',
    content: 'comentou: "Muito bom, mestre! Vou aplicar hoje no treino no sparring."',
    time: '2h',
    read: false,
    postId: '3'
  },
  {
    id: '3',
    type: 'follow',
    userName: 'Gabriel Santos',
    userBelt: 'coral',
    userAcademy: 'Alliance SP',
    content: 'começou a seguir o seu perfil profissional.',
    time: '5h',
    read: true,
    isFollowing: false
  },
  {
    id: '4',
    type: 'belt_update',
    userName: 'Sistema Social Jiu',
    userBelt: 'preta',
    userAcademy: 'CBJJ Homologação',
    content: 'Sua graduação histórica para Faixa Preta foi homologada com sucesso!',
    time: '2d',
    read: true
  },
  {
    id: '5',
    type: 'academy_invite',
    userName: 'Bruno Goulart',
    userBelt: 'marrom',
    userAcademy: 'Checkmat RJ',
    content: 'convidou você para participar do Treinão Geral na Checkmat RJ.',
    time: '3d',
    read: true,
    accepted: null // null = pending, true = accepted, false = declined
  }
]

const NotificationsScreen = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleFollowToggle = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, isFollowing: !n.isFollowing }
      }
      return n
    }))
  }

  const handleInviteResponse = (id, accepted) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, accepted }
      }
      return n
    }))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <div className="w-5 h-5 rounded-full bg-brand-red flex items-center justify-center text-white"><Heart size={10} fill="currentColor" /></div>
      case 'comment':
        return <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white"><MessageSquare size={10} fill="currentColor" /></div>
      case 'follow':
        return <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white"><UserPlus size={10} /></div>
      case 'belt_update':
        return <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white"><Award size={10} /></div>
      case 'academy_invite':
        return <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white"><Calendar size={10} /></div>
      default:
        return <div className="w-5 h-5 rounded-full bg-surface-border flex items-center justify-center text-white"><Bell size={10} /></div>
    }
  }

  // Count unread
  const unreadCount = notifications.filter(n => !n.read).length

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
            <div className="flex items-center gap-2">
              <h2 className="text-text-primary font-bold text-base">Notificações</h2>
              {unreadCount > 0 && (
                <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-text-secondary text-[10px]">Novidades & Atualizações</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <button
                onClick={handleMarkAllRead}
                title="Marcar todas como lidas"
                className="w-8 h-8 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-brand-red transition-colors"
              >
                <Check size={14} />
              </button>
              <button
                onClick={handleClearAll}
                title="Limpar notificações"
                className="w-8 h-8 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-brand-red transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-surface-bg scrollbar-hide">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-tertiary mb-4">
              <Bell size={28} />
            </div>
            <h3 className="text-text-primary font-semibold text-sm">Tatame Silencioso</h3>
            <p className="text-text-secondary text-[11px] max-w-[200px] mt-1">
              Você não tem nenhuma notificação no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all ${!notif.read
                      ? 'bg-white/[0.03] border-brand-red/10'
                      : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                    }`}
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    {/* User Avatar with Type Overlay */}
                    <div className="relative shrink-0">
                      <Avatar
                        name={notif.userName}
                        belt={notif.userBelt}
                        size="md"
                        shape="square"
                        className="rounded-2xl"
                      />
                      <span className="absolute -bottom-1.5 -right-1.5 scale-90">
                        {getNotificationIcon(notif.type)}
                      </span>
                    </div>

                    {/* Notification content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-semibold text-text-primary">
                          {notif.userName}
                        </p>
                        <Badge belt={notif.userBelt} size="sm" />
                      </div>
                      <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                        {notif.content}
                      </p>

                      {/* Action blocks based on type */}
                      {notif.type === 'follow' && (
                        <div className="mt-2.5">
                          <button
                            onClick={() => handleFollowToggle(notif.id)}
                            className={`text-[10px] font-semibold px-4 py-1.5 rounded-xl transition-all border ${notif.isFollowing
                                ? 'bg-transparent border-surface-border text-text-secondary'
                                : 'bg-brand-red border-brand-red text-white hover:opacity-90 active:scale-95 shadow-md'
                              }`}
                          >
                            {notif.isFollowing ? 'Seguindo' : 'Seguir de Volta'}
                          </button>
                        </div>
                      )}

                      {notif.type === 'academy_invite' && (
                        <div className="mt-2.5 flex items-center gap-2">
                          {notif.accepted === null ? (
                            <>
                              <button
                                onClick={() => handleInviteResponse(notif.id, true)}
                                className="text-[10px] font-semibold bg-brand-red text-white border border-brand-red px-3.5 py-1.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md"
                              >
                                Aceitar
                              </button>
                              <button
                                onClick={() => handleInviteResponse(notif.id, false)}
                                className="text-[10px] font-semibold bg-surface-card border border-surface-border text-text-secondary px-3.5 py-1.5 rounded-xl hover:bg-white/5 transition-all"
                              >
                                Recusar
                              </button>
                            </>
                          ) : (
                            <span className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border ${notif.accepted
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-white/5 border-surface-border text-text-tertiary'
                              }`}>
                              {notif.accepted ? '✓ Presença Confirmada' : '✕ Convite Recusado'}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right-aligned time and unread indicator */}
                  <div className="flex flex-col items-end justify-between self-stretch pl-2 shrink-0">
                    <span className="text-[9px] text-text-tertiary">{notif.time}</span>
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default NotificationsScreen
