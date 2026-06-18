import { Home, Compass, Users, User, Circle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/feed', icon: Home, label: 'Home', id: 'home' },
    { path: '/explore', icon: Compass, label: 'Explorar', id: 'explore' },
    { path: '/connections', icon: Users, label: 'Conexões', id: 'connections' },
    { path: '/circles', icon: Circle, label: 'Círculos', id: 'circles' },
    { path: '/profile', icon: User, label: 'Perfil', id: 'profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] max-w-full max-h-16 bg-surface-bg border-t border-surface-border flex items-center justify-around z-50">
      {navItems.map(({ path, icon: Icon, label, id }) => {
        const active = isActive(path)
        return (
          <button
            key={id}
            onClick={() => navigate(path)}
            className="flex items-center justify-center py-4 px-4 transition-all hover:opacity-80"
          >
            <Icon
              size={24}
              color={active ? '#42587B' : '#FFFFFF'}
              fill="none"
              className="transition-colors"
            />
          </button>
        )
      })}
    </div>
  )
}

export default BottomNav
