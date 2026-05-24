import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, CheckCircle2 } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'
import { mockPosts } from '../../data/mockData'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const { currentUser } = useApp()
  const [activeTab, setActiveTab] = useState('feed')

  const userPosts = mockPosts.slice(0, 4)
  const achievements = [
    { id: '1', title: '1º lugar Paulistano 2023' },
    { id: '2', title: 'Faixa Preta 2022' },
    { id: '3', title: 'Campeão IBJJF 2021' },
  ]
  const savedPosts = mockPosts.filter(p => p.bookmarked)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="grid grid-cols-2 gap-3 px-4 pb-20">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square rounded-2xl bg-surface-card overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt="post" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary">
                    📄
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      case 'achievements':
        return (
          <div className="px-4 pb-20 space-y-3">
            {achievements.map(ach => (
              <div key={ach.id} className="p-4 bg-surface-card border border-surface-border rounded-3xl">
                <p className="text-text-primary font-semibold text-sm">{ach.title}</p>
              </div>
            ))}
          </div>
        )
      case 'saved':
        return (
          <div className="grid grid-cols-2 gap-3 px-4 pb-20">
            {savedPosts.map(post => (
              <div key={post.id} className="aspect-square rounded-2xl bg-surface-card overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt="post" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary">
                    📄
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

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
        title="Meu perfil"
        rightAction={
          <button
            onClick={() => navigate('/settings')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Settings size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Profile Header */}
        <div className="px-4 py-6 border-b border-surface-border">
          <div className="flex flex-col items-center mb-6">
            <Avatar name={currentUser.name} belt={currentUser.belt} size="xl" showBeltBorder />
            <Badge belt={currentUser.belt} className="mt-2" size="md" />
          </div>

          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-text-primary">{currentUser.name}</h1>
              {currentUser.verified && <CheckCircle2 size={20} color="#C0203A" />}
            </div>
            <p className="text-text-secondary text-sm">@{currentUser.username}</p>
            <p className="text-text-secondary text-sm">
              {currentUser.academy} • {currentUser.city}
            </p>
          </div>

          <p className="text-text-primary text-center text-sm mb-6 leading-relaxed">
            {currentUser.bio}
          </p>

          {/* Stats */}
          <div className="flex justify-around text-center mb-6">
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.posts}</p>
              <p className="text-text-secondary text-xs">Posts</p>
            </button>
            <button
              onClick={() => navigate('/profile/followers')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.followers}</p>
              <p className="text-text-secondary text-xs">Seguidores</p>
            </button>
            <button
              onClick={() => navigate('/profile/following')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.following}</p>
              <p className="text-text-secondary text-xs">Seguindo</p>
            </button>
          </div>

          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate('/profile/edit')}
          >
            Editar perfil
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-4 py-4 border-b border-surface-border">
          {[
            { id: 'feed', label: 'Feed' },
            { id: 'achievements', label: 'Conquistas' },
            { id: 'saved', label: 'Salvos' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-red text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {renderTabContent()}
      </div>

      <BottomNav />
    </motion.div>
  )
}

export default ProfileScreen
