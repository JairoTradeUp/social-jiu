import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { suggestedUsers } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const FollowingScreen = () => {
  const navigate = useNavigate()
  const { following, toggleFollow } = useApp()
  const [search, setSearch] = useState('')

  const followingUsers = suggestedUsers.filter(u => following.includes(u.id))
  const filteredUsers = followingUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <TopBar
        title="387 Seguindo"
        leftAction={
          <button
            onClick={() => navigate('/profile')}
            className="text-text-primary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-4 space-y-4">
          <Input
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={Search}
          />

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-3xl"
            >
              <div className="flex items-center gap-3 flex-1">
                <Avatar name={user.name} belt={user.belt} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-text-primary font-semibold text-sm">{user.name}</p>
                    <Badge belt={user.belt} size="sm" />
                  </div>
                  <p className="text-text-secondary text-xs">{user.academy}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toggleFollow(user.id)}
              >
                Seguindo
              </Button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FollowingScreen
