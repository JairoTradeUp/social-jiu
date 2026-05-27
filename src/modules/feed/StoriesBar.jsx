import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Camera, Video, Image, Loader2, CheckCircle2 } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { useApp } from '../../context/AppContext'

const getBeltByUserId = (userId) => {
  const mapping = {
    '2': 'roxa',
    '3': 'marrom',
    '4': 'azul',
    '5': 'preta',
    '6': 'azul',
    '7': 'coral',
    '8': 'preta',
    '1': 'preta'
  }
  return mapping[userId] || 'branca'
}

const StoriesBar = ({ onSelectStory, seenStories = [] }) => {
  const navigate = useNavigate()
  const { stories, addStory } = useApp()
  const containerRef = useRef(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  
  // Custom interactive states
  const [isPublisherOpen, setIsPublisherOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishingType, setPublishingType] = useState(null) // 'camera' | 'video' | 'gallery'
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showActionSheet, setShowActionSheet] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const scrollWidth = containerRef.current.scrollWidth
      if (scrollWidth > containerWidth) {
        setDragConstraints({ left: -(scrollWidth - containerWidth), right: 0 })
      } else {
        setDragConstraints({ left: 0, right: 0 })
      }
    }
  }, [stories])

  const hasRafaStory = stories.some(s => s.userId === '1')

  const handleStoryClick = () => {
    if (hasRafaStory) {
      setShowActionSheet(true)
    } else {
      setIsPublisherOpen(true)
    }
  }

  const handlePublish = (type) => {
    setPublishingType(type)
    setIsPublishing(true)
    
    // Simulated Delay
    setTimeout(() => {
      let storyData = {}
      if (type === 'camera') {
        storyData = {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
          caption: 'Treino concluído com foco e consistência! 🥋🔥 #MendesStyle'
        }
        setToastMessage('Foto publicada com sucesso!')
      } else if (type === 'video') {
        storyData = {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
          caption: 'Sparring rolando em alto nível. Técnica apurada! 🥋⚡'
        }
        setToastMessage('Vídeo publicado com sucesso!')
      } else {
        // gallery
        storyData = {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80',
          caption: 'Relembrando a jornada. Disciplina vence o talento! 👊💡'
        }
        setToastMessage('Imagem da galeria publicada!')
      }

      addStory(storyData)
      setIsPublishing(false)
      setIsPublisherOpen(false)
      setShowActionSheet(false)
      setShowToast(true)
      
      // Auto-clear toast
      setTimeout(() => {
        setShowToast(false)
      }, 2500)
    }, 1800)
  }

  return (
    <div className="overflow-hidden w-full select-none" ref={containerRef}>
      <motion.div
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.15}
        className="flex gap-3 px-4 py-4 cursor-grab active:cursor-grabbing flex-nowrap"
      >
        {/* Seu story */}
        <button 
          onClick={handleStoryClick}
          className="flex flex-col items-center gap-2 flex-shrink-0 select-none"
        >
          <div className="relative w-14 h-14 rounded-2xl p-[2px] border-2 border-surface-border flex items-center justify-center bg-surface-card hover:opacity-90 transition-opacity">
            <Avatar
              name="Rafael Mendes"
              belt="preta"
              size="sm"
              shape="square"
              className="w-full h-full rounded-[12px] text-xs font-bold"
            />
            {/* Superimposed Red Plus Badge in bottom-right corner */}
            <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-lg bg-brand-red border-2 border-surface-bg flex items-center justify-center shadow-md z-10">
              <Plus size={11} className="text-white stroke-[3px]" />
            </div>
          </div>
          <p className="text-text-primary text-xs font-medium">Seu story</p>
        </button>

        {/* Stories dos outros */}
        {stories.filter(s => s.userId !== '1').map((story) => {
          const isSeen = seenStories.includes(story.userId) || story.seen
          const belt = getBeltByUserId(story.userId)

          return (
            <button
              key={story.id}
              onClick={() => onSelectStory && onSelectStory(story.userId)}
              className="flex flex-col items-center gap-2 flex-shrink-0 select-none"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 hover:opacity-80 transition-opacity p-[2px]"
                style={{
                  borderColor: isSeen ? '#2A2A2A' : '#d9434f',
                }}
              >
                <Avatar
                  name={story.userName}
                  belt={belt}
                  size="sm"
                  shape="square"
                  className="w-full h-full rounded-[12px] text-xs font-bold"
                />
              </div>
              <p className="text-text-primary text-xs font-medium truncate max-w-14">
                {story.userName}
              </p>
            </button>
          )
        })}
      </motion.div>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-[100] text-xs font-bold border border-green-400/20"
          >
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Sheet (View or Add) */}
      <AnimatePresence>
        {showActionSheet && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50">
            <div className="absolute inset-0" onClick={() => setShowActionSheet(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-[390px] bg-surface-card border-t border-surface-border rounded-t-4xl p-5 space-y-4 z-10"
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-2" />
              <h3 className="text-text-primary font-bold text-sm text-center">Seu Story</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSelectStory && onSelectStory('1')
                    setShowActionSheet(false)
                  }}
                  className="w-full py-3.5 bg-brand-red text-white text-xs font-bold rounded-2xl hover:opacity-95 transition-opacity"
                >
                  Visualizar seu story
                </button>
                <button
                  onClick={() => {
                    setShowActionSheet(false)
                    setIsPublisherOpen(true)
                  }}
                  className="w-full py-3.5 bg-surface-elevated border border-surface-border text-text-primary text-xs font-bold rounded-2xl hover:bg-white/[0.04] transition-colors"
                >
                  Publicar novo story
                </button>
                <button
                  onClick={() => setShowActionSheet(false)}
                  className="w-full py-3.5 text-text-secondary text-xs font-semibold hover:text-text-primary transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Story Publisher Modal Sheet */}
      <AnimatePresence>
        {isPublisherOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50">
            <div className="absolute inset-0" onClick={() => !isPublishing && setIsPublisherOpen(false)} />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-[390px] bg-surface-card border-t border-surface-border rounded-t-4xl p-6 z-10"
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
              
              {isPublishing ? (
                /* PUBLISHING STATE / SIMULATION VIEW */
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <Loader2 className="text-brand-red animate-spin" size={44} />
                    <span className="absolute text-[10px] text-brand-red font-extrabold animate-pulse">BJJ</span>
                  </div>
                  <div>
                    <h3 className="text-text-primary font-bold text-sm">
                      {publishingType === 'camera' && 'Tirando foto técnica...'}
                      {publishingType === 'video' && 'Gravando sparring...'}
                      {publishingType === 'gallery' && 'Importando da galeria...'}
                    </h3>
                    <p className="text-text-secondary text-[11px] mt-1">Conectando ao tatame virtual, aguarde um instante</p>
                  </div>
                </div>
              ) : (
                /* OPTIONS VIEW */
                <div className="space-y-5">
                  <div className="text-center">
                    <h3 className="text-text-primary font-extrabold text-sm">Criar Novo Story</h3>
                    <p className="text-text-secondary text-[10px] mt-0.5">Selecione como quer postar seu momento BJJ</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {/* Câmera */}
                    <button
                      onClick={() => handlePublish('camera')}
                      className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/[0.01] hover:bg-white/[0.04] border border-surface-border hover:border-brand-red/20 transition-all text-text-primary active:scale-95 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-brand-red/10 border border-brand-red/10 flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform">
                        <Camera size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-center">Usar Câmera</span>
                    </button>

                    {/* Vídeo */}
                    <button
                      onClick={() => handlePublish('video')}
                      className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/[0.01] hover:bg-white/[0.04] border border-surface-border hover:border-brand-red/20 transition-all text-text-primary active:scale-95 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-brand-red/10 border border-brand-red/10 flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform">
                        <Video size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-center">Gravar Vídeo</span>
                    </button>

                    {/* Galeria */}
                    <button
                      onClick={() => handlePublish('gallery')}
                      className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/[0.01] hover:bg-white/[0.04] border border-surface-border hover:border-brand-red/20 transition-all text-text-primary active:scale-95 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-brand-red/10 border border-brand-red/10 flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform">
                        <Image size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-center">Da Galeria</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsPublisherOpen(false)}
                    className="w-full py-3 bg-surface-elevated border border-surface-border rounded-2xl text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StoriesBar
