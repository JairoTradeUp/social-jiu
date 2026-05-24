import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../../../components/layout/StatusBar'
import ProgressBar from '../../../components/ui/ProgressBar'
import Button from '../../../components/ui/Button'
import Avatar from '../../../components/ui/Avatar'
import Badge from '../../../components/ui/Badge'
import { suggestedUsers } from '../../../data/mockData'
import { useApp } from '../../../context/AppContext'

const SuggestedUsersScreen = () => {
  const navigate = useNavigate()
  const { toggleFollow, following } = useApp()
  const [localFollowing, setLocalFollowing] = useState([...following])

  const handleFollow = (userId) => {
    if (localFollowing.includes(userId)) {
      setLocalFollowing(localFollowing.filter(id => id !== userId))
    } else {
      setLocalFollowing([...localFollowing, userId])
    }
    toggleFollow(userId)
  }

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full min-h-screen bg-surface-bg flex flex-col"
    >
      <StatusBar />
      <ProgressBar current={5} total={5} />

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col justify-between pb-20">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Pessoas para seguir</h1>
          <p className="text-text-secondary text-sm mb-6">Baseado nos seus interesses e localização</p>

          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-surface-card border border-surface-border rounded-3xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar name={user.name} belt={user.belt} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-text-primary font-semibold text-sm">{user.name}</p>
                      <Badge belt={user.belt} size="sm" />
                    </div>
                    <p className="text-text-secondary text-xs">{user.academy}</p>
                    <p className="text-text-secondary text-xs">{user.city}</p>
                  </div>
                </div>
                <Button
                  variant={localFollowing.includes(user.id) ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleFollow(user.id)}
                >
                  {localFollowing.includes(user.id) ? 'Seguindo' : 'Seguir'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate('/onboarding/complete')}
            className="h-13"
          >
            Continuar
          </Button>
          <Button
            fullWidth
            variant="ghost"
            size="lg"
            onClick={() => navigate('/onboarding/complete')}
          >
            Pular
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SuggestedUsersScreen
