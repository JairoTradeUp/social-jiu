import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Compass, Heart, MessageSquare, Play, FileText, X, UserPlus, Check, Plus, Tag, ShoppingBag, ChevronDown, Share2 } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { mockMarketplaceItems } from '../../data/mockData'

const mockExploreItems = [
  {
    id: 'e1',
    type: 'video',
    src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
    title: 'Passagem Torreando Explosiva',
    likes: '1.2k',
    comments: 142,
    category: 'Técnicas',
    author: 'Camila Rocha',
    authorBelt: 'azul',
    authorAcademy: 'GF Team'
  },
  {
    id: 'e2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    title: 'Guarda Fechada e Pressão',
    likes: '842',
    comments: 93,
    category: 'Sparring',
    author: 'Bruno Goulart',
    authorBelt: 'marrom',
    authorAcademy: 'Checkmat RJ'
  },
  {
    id: 'e3',
    type: 'article',
    title: 'A Importância da Respiração no Sparring',
    description: 'Controlar o fluxo de oxigênio sob pressão extrema na guarda fechada evita a fadiga muscular e aumenta a eficiência técnica de transição.',
    likes: '512',
    comments: 74,
    category: 'Artigos',
    author: 'Diego Morais',
    authorBelt: 'preta',
    authorAcademy: 'Nova União'
  },
  {
    id: 'e4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    title: 'Treino e Postura Técnica',
    likes: '912',
    comments: 110,
    category: 'Técnicas',
    author: 'Fernanda Costa',
    authorBelt: 'azul',
    authorAcademy: 'Gracie Humaitá'
  },
  {
    id: 'e5',
    type: 'video',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    title: 'Passagem de Meia Guarda Profunda',
    likes: '2.4k',
    comments: 310,
    category: 'Técnicas',
    author: 'Gabriel Santos',
    authorBelt: 'coral',
    authorAcademy: 'Alliance Alphaville'
  },
  {
    id: 'e6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80',
    title: 'Drill de Transição e Pegada',
    likes: '1.8k',
    comments: 205,
    category: 'Drills',
    author: 'Ana Paula Silva',
    authorBelt: 'roxa',
    authorAcademy: 'Alliance Alphaville'
  }
]

const exploreCategories = ['Tudo', 'Marketplace', 'Técnicas', 'Sparring', 'Drills', 'Artigos']

const mockSearchProfiles = [
  { id: '2', name: 'Ana Paula Silva', belt: 'roxa', academy: 'Alliance Alphaville', followers: '830 followers', followed: false },
  { id: '3', name: 'Bruno Goulart', belt: 'marrom', academy: 'Checkmat RJ', followers: '512 followers', followed: true },
  { id: '4', name: 'Fernanda Costa', belt: 'azul', academy: 'Gracie Humaitá', followers: '291 followers', followed: false },
  { id: '5', name: 'Diego Morais', belt: 'preta', academy: 'Nova União', followers: '2.1k followers', followed: true },
  { id: '6', name: 'Camila Rocha', belt: 'azul', academy: 'GF Team', followers: '178 followers', followed: false },
  { id: '7', name: 'Gabriel Santos', belt: 'coral', academy: 'Alliance Alphaville', followers: '3.4k followers', followed: false },
  { id: '8', name: 'Beatriz Ramos', belt: 'preta', academy: 'Alliance Alphaville', followers: '1.2k followers', followed: false }
]

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tudo')
  const [profiles, setProfiles] = useState(mockSearchProfiles)
  const [activeSearchTab, setActiveSearchTab] = useState('posts') // posts or users
  
  const [marketplaceItems, setMarketplaceItems] = useState(mockMarketplaceItems)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  
  // States for creating a listing
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('Kimonos')
  const [newCondition, setNewCondition] = useState('Novo')
  const [newDescription, setNewDescription] = useState('')

  const handleFollowToggle = (id) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, followed: !p.followed }
      }
      return p
    }))
  }

  // Filter explore items
  const filteredExploreItems = mockExploreItems.filter(item => {
    const matchesCategory = activeCategory === 'Tudo' || item.category === activeCategory
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Filter search profiles
  const filteredSearchProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.academy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen flex flex-col bg-surface-bg relative overflow-hidden"
    >
      <StatusBar />

      {/* Header Search Bar */}
      <div className="px-4 pt-4 pb-2 bg-surface-bg shrink-0 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input
            type="text"
            placeholder="Pesquisar técnicas, artigos ou lutadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-card border border-surface-border rounded-[8px] pl-10 pr-10 py-2.5 text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Conditional Rendering: If searching, show Tabs, otherwise show Categories */}
      {searchQuery ? (
        <div className="px-4 py-1.5 flex border-b border-surface-border bg-surface-bg shrink-0">
          <button
            onClick={() => setActiveSearchTab('posts')}
            className={`flex-1 text-center py-2 text-xs font-semibold border-b-2 transition-colors ${activeSearchTab === 'posts'
              ? 'border-brand-red text-white'
              : 'border-transparent text-text-secondary'
              }`}
          >
            Publicações ({filteredExploreItems.length})
          </button>
          <button
            onClick={() => setActiveSearchTab('users')}
            className={`flex-1 text-center py-2 text-xs font-semibold border-b-2 transition-colors ${activeSearchTab === 'users'
              ? 'border-brand-red text-white'
              : 'border-transparent text-text-secondary'
              }`}
          >
            Lutadores ({filteredSearchProfiles.length})
          </button>
        </div>
      ) : (
        /* Explore Categories Horizontal Bar */
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-surface-bg">
          {exploreCategories.map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-[11px] font-medium border whitespace-nowrap transition-all select-none ${isActive
                  ? 'bg-white/[0.08] border-white/[0.05] text-white font-semibold'
                  : 'bg-transparent border-transparent text-text-secondary hover:text-text-primary'
                  }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-1.5 scrollbar-hide">
        {searchQuery && activeSearchTab === 'users' ? (
          /* Search Mode: Users list */
          <div className="space-y-1 py-1">
            {filteredSearchProfiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-text-secondary text-xs">Nenhum lutador encontrado.</p>
              </div>
            ) : (
              filteredSearchProfiles.map(profile => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-transparent bg-white/[0.01] hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Avatar name={profile.name} belt={profile.belt} size="md" shape="square" className="rounded-2xl" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-semibold text-text-primary truncate">{profile.name}</h4>
                        <Badge belt={profile.belt} size="sm" />
                      </div>
                      <p className="text-[10px] text-text-secondary mt-0.5 truncate">{profile.academy} • {profile.followers}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFollowToggle(profile.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold transition-all border flex items-center gap-1 ${profile.followed
                      ? 'bg-transparent border-surface-border text-text-secondary'
                      : 'bg-brand-red border-brand-red text-white hover:opacity-90 active:scale-95 shadow-md'
                      }`}
                  >
                    {profile.followed ? (
                      <>
                        <Check size={10} />
                        Seguindo
                      </>
                    ) : (
                      <>
                        <UserPlus size={10} />
                        Seguir
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        ) : activeCategory === 'Marketplace' && !searchQuery ? (
          /* Marketplace Dedicated Layout */
          <div className="space-y-4">
            {/* Header with Sell Button */}
            <div className="flex items-center justify-between bg-surface-card border border-surface-border p-3.5 rounded-2xl">
              <div>
                <h3 className="text-xs font-bold text-white">Compre & Venda</h3>
                <p className="text-[10px] text-text-secondary">Anúncios locais e produtos digitais</p>
              </div>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="bg-brand-red text-white px-3 py-1.5 rounded-xl text-[10px] font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shadow-md"
              >
                <Plus size={12} />
                Anunciar
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4">
              {marketplaceItems.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="flex flex-col bg-surface-card border border-surface-border rounded-3xl overflow-hidden text-left shadow-lg hover:border-[#42587B]/50 transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="relative h-36 w-full bg-surface-elevated">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-black bg-black/70 px-2 py-0.5 rounded-md text-white border border-white/10 uppercase tracking-wider">
                      {product.condition}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <p className="text-[9px] font-extrabold text-[#42587B] uppercase tracking-wider">{product.category}</p>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">{product.name}</h4>
                      <p className="text-sm font-black text-brand-red">R$ {product.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2.5 border-t border-white/[0.06]">
                      <Avatar name={product.seller.name} belt={product.seller.belt} size="xs" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-text-primary truncate">{product.seller.name}</p>
                        <p className="text-[8px] text-text-secondary truncate">{product.seller.academy}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Normal Grid Mode or Search Mode Posts list */
          <div>
            {/* Marketplace Highlight Banner / Horizontal Scroll */}
            {!searchQuery && activeCategory === 'Tudo' && (
              <div className="mb-6 mt-1 bg-surface-card/30 border border-surface-border/50 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between mb-3.5">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShoppingBag size={14} className="text-[#42587B]" />
                      Marketplace Jiu-Jitsu 🛒
                    </h3>
                    <p className="text-[10px] text-text-secondary">Equipamentos e seminários da comunidade</p>
                  </div>
                  <button 
                    onClick={() => setActiveCategory('Marketplace')}
                    className="text-[10px] font-bold text-[#42587B] hover:text-[#5273ab] transition-colors"
                  >
                    Ver tudo
                  </button>
                </div>
                
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {marketplaceItems.slice(0, 3).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="flex-shrink-0 w-36 bg-surface-card border border-surface-border rounded-xl overflow-hidden text-left shadow-sm hover:border-brand-red/20 transition-all"
                    >
                      <div className="relative h-20 w-full bg-surface-elevated">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 text-[7px] font-bold bg-black/60 px-1 py-0.5 rounded text-white uppercase">
                          {product.condition}
                        </span>
                        <span className="absolute bottom-1 right-1 text-[8px] font-extrabold bg-[#42587B] text-white px-1.5 py-0.5 rounded shadow">
                          R$ {product.price}
                        </span>
                      </div>
                      <div className="p-2 space-y-0.5">
                        <h4 className="text-[9px] font-bold text-text-primary line-clamp-1 leading-tight">{product.name}</h4>
                        <p className="text-[8px] text-text-secondary truncate">{product.seller.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {filteredExploreItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Compass className="text-text-tertiary mb-3 animate-pulse" size={32} />
                <p className="text-text-secondary text-xs">Nenhuma publicação encontrada.</p>
              </div>
            ) : (
              /* Grid Layout Jiu-Jitsu Explore Grid */
              <div className="grid grid-cols-2 gap-3.5">
                {filteredExploreItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    className="relative group bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-md flex flex-col h-[200px]"
                  >
                    {item.type === 'article' ? (
                      /* Article Tile Layout */
                      <div className="p-4 flex flex-col h-full justify-between bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="space-y-1.5">
                          <span className="inline-block text-[9px] bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-lg px-2 py-0.5 font-bold uppercase tracking-wider">
                            Artigo
                          </span>
                          <h4 className="text-xs font-bold text-text-primary line-clamp-3 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-text-secondary line-clamp-4 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] mt-2">
                          <span className="text-[9px] text-text-secondary font-medium">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-2 text-text-tertiary shrink-0">
                            <div className="flex items-center gap-0.5">
                              <Heart size={10} />
                              <span className="text-[8px]">{item.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Media Tile Layout (Image or Video) */
                      <div className="relative w-full h-full flex flex-col justify-end">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                        {/* Top Right Media Type Badge */}
                        <div className="absolute top-2.5 right-2.5 z-10">
                          {item.type === 'video' ? (
                            <span className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-white shadow-md">
                              <Play size={10} fill="currentColor" className="ml-0.5" />
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white">
                              <FileText size={10} />
                            </span>
                          )}
                        </div>

                        {/* Bottom Information overlay */}
                        <div className="p-3 z-10 w-full space-y-1.5">
                          <h4 className="text-[11px] font-bold text-white truncate drop-shadow-md">
                            {item.title}
                          </h4>

                          <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                            <span className="text-[9px] text-white/80 font-medium">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/80 shrink-0">
                              <div className="flex items-center gap-0.5">
                                <Heart size={10} fill="#42587B" className="text-brand-red" />
                                <span className="text-[8px]">{item.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-md bg-surface-bg border-t border-surface-border rounded-t-[32px] p-6 pb-8 space-y-6 max-h-[92vh] overflow-y-auto"
            >
              {/* Image with overlay back button and actions */}
              <div className="relative h-64 rounded-3xl overflow-hidden bg-surface-card">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest">{selectedProduct.seller.name} • {selectedProduct.category}</p>
                <h3 className="text-base font-extrabold text-white leading-tight">{selectedProduct.name}</h3>
                <p className="text-lg font-black text-brand-red">R$ {selectedProduct.price}</p>
              </div>

              {/* Selectors dropdown style */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-2xl">
                  <span className="text-xs font-bold text-text-primary">Tamanho / Formato</span>
                  <span className="text-xs font-extrabold text-text-secondary flex items-center gap-1.5">
                    {selectedProduct.category === 'Kimonos' ? 'A2' : selectedProduct.category === 'Roupas' ? 'M' : 'Único'}
                    <ChevronDown size={14} className="text-text-secondary" />
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-2xl">
                  <span className="text-xs font-bold text-text-primary">Condição</span>
                  <span className="text-xs font-extrabold text-[#42587B] flex items-center gap-1.5 uppercase tracking-wide">
                    {selectedProduct.condition}
                    <ChevronDown size={14} className="text-text-secondary" />
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Descrição</h4>
                <p className="text-xs text-text-secondary leading-relaxed bg-surface-card p-4 rounded-2xl border border-surface-border">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="p-4 bg-surface-card border border-surface-border rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedProduct.seller.name} belt={selectedProduct.seller.belt} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{selectedProduct.seller.name}</h4>
                    <p className="text-[10px] text-text-secondary">{selectedProduct.seller.academy}</p>
                  </div>
                </div>
                <Badge belt={selectedProduct.seller.belt} size="sm" />
              </div>

              {/* Premium Action Bar */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => alert('Item adicionado ao carrinho de compras!')}
                  className="w-12 h-12 rounded-full bg-surface-card border border-surface-border text-[#42587B] hover:bg-surface-elevated transition-colors flex items-center justify-center shrink-0"
                >
                  <ShoppingBag size={18} />
                </button>
                <button
                  onClick={() => {
                    alert(`Redirecionando para contato via WhatsApp com o vendedor: ${selectedProduct.seller.phone}`)
                    setSelectedProduct(null)
                  }}
                  className="flex-1 h-12 bg-white text-black font-extrabold text-xs uppercase rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center"
                >
                  Comprar Agora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sell Modal */}
      <AnimatePresence>
        {isSellModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-surface-bg border border-surface-border rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Tag size={14} className="text-brand-red" />
                  Anunciar no Marketplace
                </h3>
                <button
                  onClick={() => setIsSellModalOpen(false)}
                  className="p-1 rounded-full bg-surface-card hover:bg-surface-elevated text-text-secondary transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Título do Anúncio</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Kimono Shoyoroll A2"
                    className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Preço (R$)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Ex: 250"
                      className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-red"
                    >
                      <option value="Kimonos">Kimonos</option>
                      <option value="Roupas">Roupas</option>
                      <option value="Equipamentos">Equipamentos</option>
                      <option value="Cursos">Cursos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Condição</label>
                  <div className="flex gap-2">
                    {['Novo', 'Seminovo', 'Usado', 'Digital'].map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setNewCondition(cond)}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                          newCondition === cond
                            ? 'bg-[#42587B] border-[#42587B] text-white'
                            : 'bg-surface-card border-surface-border text-text-secondary'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Descrição</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Detalhes sobre o produto, tamanho, estado de conservação..."
                    rows={3}
                    className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-red resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newTitle || !newPrice || !newDescription) {
                    alert('Por favor, preencha todos os campos.')
                    return
                  }
                  const newItem = {
                    id: `m${Date.now()}`,
                    name: newTitle,
                    price: parseFloat(newPrice),
                    condition: newCondition,
                    category: newCategory,
                    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80',
                    description: newDescription,
                    seller: {
                      name: 'Rafael Mendes',
                      belt: 'preta',
                      academy: 'Alliance-SP',
                      phone: '+55 11 99999-9999'
                    }
                  }
                  setMarketplaceItems([newItem, ...marketplaceItems])
                  setIsSellModalOpen(false)
                  // Reset fields
                  setNewTitle('')
                  setNewPrice('')
                  setNewDescription('')
                }}
                className="w-full bg-brand-red text-white py-2.5 rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                Publicar Anúncio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BottomNav />
    </motion.div>
  )
}

export default ExploreScreen

