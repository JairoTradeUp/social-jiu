import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, MessageCircle } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import PostCard from './PostCard'
import StoriesBar from './StoriesBar'
import FilterBar from '../../components/feed/FilterBar'
import SearchBar from '../../components/feed/SearchBar'
import StoryViewer from '../../components/feed/StoryViewer'
import { useApp } from '../../context/AppContext'

const FeedScreen = () => {
  const navigate = useNavigate()
  const { posts } = useApp()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStoryUserId, setActiveStoryUserId] = useState(null)
  const [seenStories, setSeenStories] = useState([])

  const handleStorySeen = (userId) => {
    if (!seenStories.includes(userId)) {
      setSeenStories(prev => [...prev, userId])
    }
  }


  let filteredPosts = (activeFilter === 'all' || activeFilter === 'search')
    ? posts
    : posts.filter(post => post.category === activeFilter)

  // Apply search filter if searching
  if (activeFilter === 'search' && searchQuery) {
    filteredPosts = filteredPosts.filter(post =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <StatusBar />

      {/* Scrollable Feed Container */}
      <div className="flex-1 overflow-y-auto pb-20">
        <TopBar
          leftAction={
            <img
              src="/assets/logo-h-social-jiu.png"
              alt="App Jiu-jitsu"
              className="h-8 object-contain"
            />
          }
          rightAction={
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/messages')}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <MessageCircle size={24} />
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <Bell size={24} />
              </button>
            </div>
          }
        />

        <StoriesBar
          onSelectStory={(userId) => setActiveStoryUserId(userId)}
          seenStories={seenStories}
        />

        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {activeFilter === 'search' && (
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClose={() => {
              setActiveFilter('all')
              setSearchQuery('')
            }}
          />
        )}

        {activeFilter !== 'search' && <div className="border-b border-surface-border" />}

        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <BottomNav />

      {/* Story Fullscreen Viewer Overlay */}
      <AnimatePresence>
        {activeStoryUserId && (
          <StoryViewer
            initialUserId={activeStoryUserId}
            onClose={() => setActiveStoryUserId(null)}
            onStorySeen={handleStorySeen}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FeedScreen
