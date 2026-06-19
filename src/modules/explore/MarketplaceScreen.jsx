import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Heart, Share2, ShoppingBag, ChevronDown, X, Plus, Tag, Search } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { mockMarketplaceItems } from '../../data/mockData'

const marketplaceCategories = ['Tudo', 'Kimonos', 'Faixas', 'Acessórios']

const MarketplaceScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Tudo')
  const [marketplaceItems, setMarketplaceItems] = useState(mockMarketplaceItems)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [favorites, setFavorites] = useState([])

  // States for creating a listing
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('Kimonos')
  const [newCondition, setNewCondition] = useState('Novo')
  const [newDescription, setNewDescription] = useState('')

  const handleFavoriteToggle = (id, e) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredItems = marketplaceItems.filter(item => 
    activeCategory === 'Tudo' || item.category === activeCategory
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen flex flex-col bg-[#161B22] relative overflow-hidden"
    >
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between bg-[#161B22] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow p-1">
            <img 
              src="/assets/logo-social-jiu.png" 
              alt="Jiu Jitsu Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="text-white font-black text-sm tracking-wide">Jiu Jitsu</span>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 py-2 shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-black text-white tracking-tight">Compras</h1>
        <button
          onClick={() => setIsSellModalOpen(true)}
          className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/85 flex items-center gap-1.5 transition-colors text-[10px] font-black uppercase tracking-wider"
        >
          <Plus size={12} />
          <span>Anunciar</span>
        </button>
      </div>

      {/* Categories Horizontal Bar */}
      <div className="px-5 py-2 flex gap-3 overflow-x-auto scrollbar-hide shrink-0 bg-[#161B22]">
        {marketplaceCategories.map(cat => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border select-none ${isActive
                ? 'bg-white text-black border-white'
                : 'bg-transparent border-white/[0.08] text-white/60 hover:text-white'
                }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Main Content Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-5 pb-20 pt-2 scrollbar-hide space-y-5">
        
        {/* Promotion of the Day Banner */}
        {activeCategory === 'Tudo' && (
          <div className="space-y-3" style={{ marginTop: '28px', marginBottom: '28px' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white uppercase tracking-wider">Promoção do dia</span>
              <button 
                onClick={() => alert('Ver todas as promoções')} 
                className="text-[10px] font-extrabold text-white/50 hover:text-white transition-colors"
              >
                Ver todas
              </button>
            </div>
            
            <div className="relative w-full rounded-[24px] overflow-hidden shadow-md">
              <img 
                src="/assets/product_kimono_promo.png" 
                alt="Promoção do Dia" 
                className="w-full h-auto object-cover" 
              />
              {/* Dots Pagination Indicator overlay */}
              <div className="absolute bottom-3.5 left-6 flex gap-1.5">
                <span className="w-6 h-1 rounded-full bg-white" />
                <span className="w-1.5 h-1 rounded-full bg-white/30" />
                <span className="w-1.5 h-1 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        )}

        {/* Products Section Title */}
        <div className="pt-2">
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Todos os produtos</h3>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {filteredItems.map((product) => {
            const isFav = favorites.includes(product.id)
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="flex flex-col text-left group cursor-pointer"
              >
                {/* Product Image Wrapper */}
                <div className="relative aspect-square w-full bg-[#F5F5F5] rounded-[24px] flex items-center justify-center p-4 overflow-hidden border border-white/[0.03]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-105" 
                  />
                  <button
                    onClick={(e) => handleFavoriteToggle(product.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart 
                      size={14} 
                      className="transition-colors" 
                      fill={isFav ? '#E53E3E' : 'none'} 
                      color={isFav ? '#E53E3E' : '#1A202C'} 
                    />
                  </button>
                </div>
                
                {/* Text Details below the Card */}
                <div className="mt-3.5 space-y-0.5 px-1">
                  <h4 className="text-[13px] font-bold text-white leading-tight line-clamp-1">{product.name}</h4>
                  <p className="text-[10px] font-semibold text-white/50">{product.description}</p>
                  <p className="text-[13px] font-black text-white pt-1">R$ {product.price}</p>
                </div>
              </div>
            )
          })}
        </div>
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
              className="w-full max-w-md bg-[#161B22] border-t border-white/[0.08] rounded-t-[32px] p-6 pb-8 space-y-6 max-h-[92vh] overflow-y-auto"
            >
              {/* Image with overlay back button and actions */}
              <div className="relative h-64 rounded-3xl overflow-hidden bg-[#F5F5F5] flex items-center justify-center p-6 border border-white/[0.03]">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-h-[90%] max-w-[90%] object-contain" 
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setFavorites(prev => 
                        prev.includes(selectedProduct.id) ? prev.filter(id => id !== selectedProduct.id) : [...prev, selectedProduct.id]
                      )
                    }}
                    className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
                  >
                    <Heart 
                      size={16} 
                      fill={favorites.includes(selectedProduct.id) ? '#E53E3E' : 'none'} 
                      color={favorites.includes(selectedProduct.id) ? '#E53E3E' : 'white'} 
                    />
                  </button>
                  <button className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest">{selectedProduct.seller.name} • {selectedProduct.category}</p>
                <h3 className="text-base font-extrabold text-white leading-tight">{selectedProduct.name}</h3>
                <p className="text-lg font-black text-brand-red">R$ {selectedProduct.price}</p>
              </div>

              {/* Selectors dropdown style */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <span className="text-xs font-bold text-white">Tamanho / Formato</span>
                  <span className="text-xs font-extrabold text-white/60 flex items-center gap-1.5">
                    {selectedProduct.category === 'Kimonos' ? 'A2' : selectedProduct.category === 'Faixas' ? 'M' : 'Único'}
                    <ChevronDown size={14} className="text-white/60" />
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <span className="text-xs font-bold text-white">Condição</span>
                  <span className="text-xs font-extrabold text-[#42587B] flex items-center gap-1.5 uppercase tracking-wide">
                    {selectedProduct.condition}
                    <ChevronDown size={14} className="text-white/60" />
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Descrição</h4>
                <p className="text-xs text-white/60 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedProduct.seller.name} belt={selectedProduct.seller.belt} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{selectedProduct.seller.name}</h4>
                    <p className="text-[10px] text-white/50">{selectedProduct.seller.academy}</p>
                  </div>
                </div>
                <Badge belt={selectedProduct.seller.belt} size="sm" />
              </div>

              {/* Premium Action Bar */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => alert('Item adicionado ao carrinho!')}
                  className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.06] text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center shrink-0"
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
              className="w-full max-w-sm bg-[#161B22] border border-white/[0.08] rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Tag size={14} className="text-brand-red" />
                  Anunciar no Marketplace
                </h3>
                <button
                  onClick={() => setIsSellModalOpen(false)}
                  className="p-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-white/50 uppercase mb-1">Título do Anúncio</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Kimono Shoyoroll A2"
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-white/50 uppercase mb-1">Preço (R$)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Ex: 250"
                      className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-white/50 uppercase mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    >
                      <option value="Kimonos">Kimonos</option>
                      <option value="Faixas">Faixas</option>
                      <option value="Acessórios">Acessórios</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-white/50 uppercase mb-1">Condição</label>
                  <div className="flex gap-2">
                    {['Novo', 'Seminovo', 'Usado'].map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setNewCondition(cond)}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                          newCondition === cond
                            ? 'bg-[#42587B] border-[#42587B] text-white'
                            : 'bg-white/[0.02] border-white/[0.08] text-white/60'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-white/50 uppercase mb-1">Descrição</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Detalhes sobre o produto, tamanho, estado de conservação..."
                    rows={3}
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red resize-none"
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
                    image: '/assets/product_bag.png',
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

export default MarketplaceScreen
