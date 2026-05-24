import { motion } from 'framer-motion'
import { Bell, MessageCircle } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import PostCard from './PostCard'
import StoriesBar from './StoriesBar'
import { useApp } from '../../context/AppContext'

const FeedScreen = () => {
  const { posts } = useApp()

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />

      <TopBar
        leftAction={
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-bold text-text-primary">Social</span>
            <span className="text-xl font-bold text-brand-red">Jiu</span>
          </div>
        }
        rightAction={
          <div className="flex items-center gap-4">
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              <Bell size={24} />
            </button>
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              <MessageCircle size={24} />
            </button>
          </div>
        }
      />

      <StoriesBar />

      <div className="border-b border-surface-border" />

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <BottomNav />
    </motion.div>
  )
}

export default FeedScreen
