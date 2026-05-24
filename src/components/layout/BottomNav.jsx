import { Home, Search, Users, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/feed', icon: Home, label: 'Home', id: 'home' },
    { path: '/explore', icon: Search, label: 'Explorar', id: 'explore' },
    { path: '/connections', icon: Users, label: 'Conexões', id: 'connections' },
    { path: '/profile', icon: User, label: 'Perfil', id: 'profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface-bg border-t border-surface-border flex items-center justify-around">
      {navItems.map(({ path, icon: Icon, label, id }) => (
        <button
          key={id}
          onClick={() => navigate(path)}
          className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
        >
          <Icon
            size={24}
            color={isActive(path) ? '#C0203A' : '#888888'}
            fill={isActive(path) ? '#C0203A' : 'none'}
          />
          <span
            className="text-xs font-medium"
            style={{ color: isActive(path) ? '#C0203A' : '#888888' }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default BottomNav
