import { beltColors } from '../../data/mockData'

const avatarMap = {
  'Ana Paula Silva': '/assets/perfil_AnaPaula.png',
  'Bruno Goulart': '/assets/perfil_Bruno.png',
  'Fernanda Costa': '/assets/perfil_Fernanda.png',
  'Diego Morais': '/assets/perfil_Diego.png',
  'Camila Rocha': '/assets/perfil_Camila.png',
  'Gabriel Santos': '/assets/perfil_Gabriel.png',
  'Beatriz Ramos': '/assets/perfil_Beatriz.png',
  'Rafael Mendes': '/assets/perfil_Rafa.png',
  'Rafa Mendes': '/assets/perfil_Rafa.png',
}

const Avatar = ({ name, belt, size = 'md', showBeltBorder = false, className = '', shape = 'circle' }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-16 h-16 text-sm',
    xl: 'w-24 h-24 text-lg',
  }

  const beltColor = beltColors[belt] || beltColors.branca
  const borderClass = showBeltBorder ? 'border-2' : ''
  const shapeClass = shape === 'square' ? 'rounded-2xl' : 'rounded-full'
  
  // Support matching both full names and first/display names
  const getImageUrl = (inputName) => {
    if (!inputName) return null
    const cleanInput = inputName.trim().toLowerCase()
    for (const key of Object.keys(avatarMap)) {
      const keyLower = key.toLowerCase()
      if (keyLower === cleanInput || keyLower.startsWith(cleanInput)) {
        return avatarMap[key]
      }
    }
    return null
  }
  
  const imageUrl = getImageUrl(name)

  return (
    <div
      className={`
        flex items-center justify-center font-bold overflow-hidden shrink-0 select-none
        ${shapeClass}
        ${sizeClasses[size]}
        ${borderClass}
        ${className}
      `}
      style={{
        backgroundColor: beltColor.bg,
        color: beltColor.text,
        borderColor: beltColor.border || beltColor.bg,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      ) : (
        initials
      )}
    </div>
  )
}


export default Avatar

