import { Search, X } from 'lucide-react'

const SearchBar = ({ searchQuery, onSearchChange, onClose }) => {
  const handleClearOrClose = () => {
    if (searchQuery) {
      onSearchChange('')
    } else {
      onClose()
    }
  }

  return (
    <div className="border-b border-surface-border px-4 py-3 flex items-center gap-3 bg-surface-input rounded-lg mx-3 mb-3">
      <Search size={20} className="text-text-label flex-shrink-0" />
      <input
        type="text"
        placeholder="Pesquisar posts..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
        className="flex-1 bg-transparent text-text-label placeholder-text-placeholder outline-none text-base"
      />
      <button
        onClick={handleClearOrClose}
        className="text-text-placeholder hover:text-text-label transition-colors flex-shrink-0"
        title={searchQuery ? "Limpar busca" : "Fechar busca"}
      >
        <X size={20} />
      </button>
    </div>
  )
}

export default SearchBar
