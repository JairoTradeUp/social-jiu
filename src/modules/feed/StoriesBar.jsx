import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { mockStories } from '../../data/mockData'

const StoriesBar = () => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
      {/* Seu story */}
      <button className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-surface-card border-2 border-surface-border flex items-center justify-center hover:bg-surface-elevated transition-colors">
          <Plus size={24} className="text-brand-red" />
        </div>
        <p className="text-text-primary text-xs font-medium">Seu story</p>
      </button>

      {/* Stories dos outros */}
      {mockStories.map((story) => (
        <button
          key={story.id}
          onClick={() => {}}
          className="flex flex-col items-center gap-2 flex-shrink-0"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 hover:opacity-80 transition-opacity"
            style={{
              borderColor: story.seen ? '#2A2A2A' : '#C0203A',
            }}
          >
            <Avatar
              name={story.userName}
              belt={mockStories[story.id % mockStories.length]?.belt || 'azul'}
              size="sm"
            />
          </div>
          <p className="text-text-primary text-xs font-medium truncate max-w-14">
            {story.userName}
          </p>
        </button>
      ))}
    </div>
  )
}

export default StoriesBar
