import { beltColors } from '../../data/mockData'

const Avatar = ({ name, belt, size = 'md', showBeltBorder = false, className = '' }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }

  const beltColor = beltColors[belt] || beltColors.branca
  const borderClass = showBeltBorder
    ? belt === 'preta'
      ? 'border-2'
      : 'border-2'
    : ''

  return (
    <div
      className={`
        flex items-center justify-center rounded-full font-bold
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
      {initials}
    </div>
  )
}

export default Avatar
