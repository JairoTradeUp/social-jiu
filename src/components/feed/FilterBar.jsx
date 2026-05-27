import { Grid3x3, Image, Video, FileText, Search } from 'lucide-react'

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', icon: Grid3x3, label: 'Tudo' },
    { id: 'images', icon: Image, label: 'Imagens' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'articles', icon: FileText, label: 'Artigos' },
    { id: 'search', icon: Search, label: 'Pesquisa' },
  ]

  return (
    <div className="border-b border-surface-border flex items-center justify-around py-3 px-4 bg-surface-bg">
      {filters.map(({ id, icon: Icon }) => {
        const active = activeFilter === id
        return (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-300 ${
              active
                ? 'bg-white/[0.08] text-white border border-white/[0.05] shadow-inner shadow-white/[0.02]'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02] border border-transparent'
            }`}
          >
            <Icon
              size={20}
              strokeWidth={active ? 2.2 : 1.8}
              className="transition-colors"
            />
          </button>
        )
      })}
    </div>
  )
}

export default FilterBar
