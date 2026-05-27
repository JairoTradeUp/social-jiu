import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Compass, Heart, MessageSquare, Plus, ArrowLeft, Users, ShieldAlert, Check, PlusCircle } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'

const initialCircles = [
  {
    id: 'c1',
    name: 'Leg Lock Hunters',
    description: 'Estudos aprofundados sobre chaves de calcanhar, chaves de pé e técnicas de Ashi Garami.',
    membersCount: 142,
    postsCount: 18,
    category: 'Técnicas',
    joined: true,
    feed: [
      {
        id: 'cp1',
        author: 'Diego Morais',
        authorBelt: 'preta',
        time: '2h atrás',
        content: 'Detalhe crucial para travar o calcanhar no Inside Heel Hook: Mantenham o dedão do pé do oponente sob a sua axila antes de aplicar a torção. Isso zera a fuga.',
        likes: 42,
        comments: 12
      },
      {
        id: 'cp2',
        author: 'Gabriel Santos',
        authorBelt: 'coral',
        time: '5h atrás',
        content: 'Novas regras do No-Gi da IBJJF sobre chaves de calcanhar liberadas para a Faixa Marrom e Preta na categoria adulto. Vamos debater as melhores estratégias no seminário de sexta!',
        likes: 68,
        comments: 19
      }
    ]
  },
  {
    id: 'c2',
    name: 'Alliance Competição',
    description: 'Preparação física, drills de explosão e táticas para os campeonatos nacionais e internacionais.',
    membersCount: 89,
    postsCount: 24,
    category: 'Competição',
    joined: true,
    feed: [
      {
        id: 'cp3',
        author: 'Ana Paula Silva',
        authorBelt: 'roxa',
        time: 'Ontem',
        content: 'Treino de competição das 19h hoje será focado em simulação de arbitragem. Tragam seus kimonos oficiais nas cores azul, preto ou branco.',
        likes: 31,
        comments: 5
      }
    ]
  },
  {
    id: 'c3',
    name: 'Nutrição & Performance BJJ',
    description: 'Dietas de corte de peso saudável, suplementação e recuperação muscular para treinos de alta intensidade.',
    membersCount: 205,
    postsCount: 32,
    category: 'Estilo de Vida',
    joined: false,
    feed: [
      {
        id: 'cp4',
        author: 'Beatriz Ramos',
        authorBelt: 'preta',
        time: '3 dias atrás',
        content: 'O segredo para um corte de peso está na reposição de eletrólitos imediata no pós-pesagem. Evitem comer alimentos pesados de uma vez.',
        likes: 54,
        comments: 8
      }
    ]
  },
  {
    id: 'c4',
    name: 'Guarda de Lapela & Worm Guard',
    description: 'Tudo sobre as amarras complexas de lapela desenvolvidas pelo Keenan Cornelius e variações modernas.',
    membersCount: 312,
    postsCount: 45,
    category: 'Técnicas',
    joined: false,
    feed: []
  },
  {
    id: 'c5',
    name: 'Mestre & Discípulos Nova União',
    description: 'Comunidade oficial da Nova União focada na preservação da linhagem histórica e metodologias clássicas.',
    membersCount: 120,
    postsCount: 15,
    category: 'Comunidade',
    joined: false,
    feed: []
  }
]

const CirclesScreen = () => {
  const navigate = useNavigate()
  const [circles, setCircles] = useState(initialCircles)
  const [activeTab, setActiveTab] = useState('mine') // mine or explore
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCircleDetail, setActiveCircleDetail] = useState(null)
  const [newPostText, setNewPostText] = useState('')

  const handleJoinCircle = (id, event) => {
    if (event) event.stopPropagation()
    setCircles(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, joined: true, membersCount: c.membersCount + 1 }
      }
      return c
    }))
  }

  const handleLeaveCircle = (id) => {
    if (confirm('Deseja realmente sair desta comunidade?')) {
      setCircles(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, joined: false, membersCount: c.membersCount - 1 }
        }
        return c
      }))
      setActiveCircleDetail(null)
    }
  }

  const handleCreatePost = () => {
    if (!newPostText.trim() || !activeCircleDetail) return

    const newPost = {
      id: 'cp_new_' + Date.now(),
      author: 'Rafael Mendes',
      authorBelt: 'preta',
      time: 'Agora mesmo',
      content: newPostText,
      likes: 0,
      comments: 0
    }

    setCircles(prev => prev.map(c => {
      if (c.id === activeCircleDetail.id) {
        const updatedFeed = [newPost, ...c.feed]
        const updatedCircle = { ...c, feed: updatedFeed, postsCount: c.postsCount + 1 }
        // Update local detail reference
        setActiveCircleDetail(updatedCircle)
        return updatedCircle
      }
      return c
    }))

    setNewPostText('')
  }

  const filteredCircles = circles.filter(c => {
    const matchesTab = activeTab === 'mine' ? c.joined : !c.joined
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen flex flex-col bg-surface-bg relative overflow-hidden"
    >
      <StatusBar />

      <AnimatePresence mode="wait">
        {!activeCircleDetail ? (
          /* CIRCLES LIST MODE */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-surface-border flex flex-col bg-surface-bg shrink-0 gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/feed')}
                    className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h2 className="text-text-primary font-bold text-base">Círculos</h2>
                    <p className="text-text-secondary text-[10px]">Grupos & Comunidades Exclusivas</p>
                  </div>
                </div>

                <button className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all active:scale-95 shadow-sm">
                  <Plus size={18} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input
                  type="text"
                  placeholder="Pesquisar comunidades por nome ou estilo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-card border border-surface-border rounded-[8px] pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>

              {/* Tabs */}
              <div className="flex border-b border-surface-border -mb-4 pt-1">
                <button
                  onClick={() => setActiveTab('mine')}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'mine'
                      ? 'border-brand-red text-white'
                      : 'border-transparent text-text-secondary'
                  }`}
                >
                  Meus Círculos
                </button>
                <button
                  onClick={() => setActiveTab('explore')}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'explore'
                      ? 'border-brand-red text-white'
                      : 'border-transparent text-text-secondary'
                  }`}
                >
                  Descobrir ({circles.filter(c => !c.joined).length})
                </button>
              </div>
            </div>

            {/* Communities Scrollable Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-20 pt-3 space-y-3.5 scrollbar-hide">
              {filteredCircles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Users className="text-text-tertiary mb-3 animate-pulse" size={32} />
                  <h3 className="text-text-primary font-semibold text-sm">Nenhum círculo encontrado</h3>
                  <p className="text-text-secondary text-[11px] max-w-[200px] mt-1">
                    {activeTab === 'mine' 
                      ? 'Você ainda não participa de nenhuma comunidade exclusiva. Vá na aba Descobrir para entrar nos grupos!' 
                      : 'Nenhuma nova comunidade encontrada para descobrir.'}
                  </p>
                </div>
              ) : (
                filteredCircles.map(circle => (
                  <div
                    key={circle.id}
                    onClick={() => circle.joined && setActiveCircleDetail(circle)}
                    className={`p-4 rounded-2xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer flex flex-col justify-between h-[135px] ${
                      circle.joined ? 'border-brand-red/10' : 'border-surface-border'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[9px] bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-lg px-2.5 py-0.5 font-bold uppercase tracking-wider">
                            {circle.category}
                          </span>
                          <h4 className="text-sm font-bold text-text-primary mt-1.5">{circle.name}</h4>
                        </div>

                        {!circle.joined && (
                          <button
                            onClick={(e) => handleJoinCircle(circle.id, e)}
                            className="px-3.5 py-1.5 rounded-xl bg-brand-red border border-brand-red text-white text-[10px] font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shrink-0"
                          >
                            Entrar
                          </button>
                        )}
                      </div>
                      
                      <p className="text-[11px] text-text-secondary line-clamp-2 mt-2 leading-relaxed">
                        {circle.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/[0.03] pt-2 mt-2 text-[10px] text-text-tertiary">
                      <span className="flex items-center gap-1 font-medium">
                        <Users size={11} /> {circle.membersCount} Lutadores
                      </span>
                      <span>•</span>
                      <span className="font-medium">{circle.postsCount} Posts Exclusivos</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          /* EXCLUSIVE FEED INSIDE JOINED CIRCLE MODE */
          <motion.div
            key="detail"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="flex flex-col h-full w-full absolute inset-0 bg-surface-bg z-50 overflow-hidden"
          >
            {/* Header Detail */}
            <div className="px-4 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setActiveCircleDetail(null)}
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <h3 className="text-text-primary font-bold text-sm truncate">{activeCircleDetail.name}</h3>
                  <p className="text-text-secondary text-[10px] truncate">{activeCircleDetail.membersCount} Lutadores conectados</p>
                </div>
              </div>

              <button
                onClick={() => handleLeaveCircle(activeCircleDetail.id)}
                className="text-[10px] font-bold text-text-tertiary hover:text-brand-red border border-surface-border bg-surface-card px-3 py-1.5 rounded-xl transition-all"
              >
                Sair do Grupo
              </button>
            </div>

            {/* Exclusive Circle Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-surface-bg scrollbar-hide">
              {/* Info Disclaimer */}
              <div className="p-3.5 bg-brand-red/5 border border-brand-red/10 rounded-2xl flex items-start gap-2.5 text-[11px] text-text-secondary leading-relaxed">
                <ShieldAlert size={16} className="text-brand-red shrink-0 mt-0.5" />
                <span>Esta é uma área restrita e segura. Apenas lutadores que fazem parte deste Círculo podem visualizar e postar conteúdos aqui.</span>
              </div>

              {/* Publisher Card */}
              <div className="p-4 bg-surface-card border border-surface-border rounded-2xl space-y-3 shadow-md shrink-0">
                <div className="flex gap-3">
                  <Avatar name="Rafael Mendes" belt="preta" size="sm" shape="square" className="rounded-xl" />
                  <textarea
                    placeholder="Compartilhar técnica ou aviso exclusivo neste Círculo..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="flex-1 bg-transparent border-0 resize-none text-xs text-text-primary placeholder-text-tertiary focus:outline-none h-14"
                  />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] text-text-tertiary">Postar como Rafael Mendes (Membro)</span>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostText.trim()}
                    className="px-4 py-2 rounded-xl bg-brand-red disabled:bg-surface-border text-white text-[10px] font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <PlusCircle size={12} />
                    Postar no Círculo
                  </button>
                </div>
              </div>

              {/* Post List */}
              <div className="space-y-3.5">
                {activeCircleDetail.feed.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-text-secondary text-xs">Ainda não há posts exclusivos neste Círculo.</p>
                  </div>
                ) : (
                  activeCircleDetail.feed.map(post => (
                    <div
                      key={post.id}
                      className="p-4 bg-surface-card border border-surface-border rounded-2xl space-y-3 shadow-sm hover:border-white/[0.02]"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar name={post.author} belt={post.authorBelt} size="sm" shape="square" className="rounded-xl" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-text-primary">{post.author}</h4>
                            <Badge belt={post.authorBelt} size="sm" />
                          </div>
                          <span className="text-[9px] text-text-tertiary">{post.time}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 pt-1 text-[10px] text-text-tertiary">
                        <button className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
                          <Heart size={12} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                          <MessageSquare size={12} /> {post.comments}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </motion.div>
  )
}

export default CirclesScreen
