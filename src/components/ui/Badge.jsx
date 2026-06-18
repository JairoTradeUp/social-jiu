import { beltColors } from '../../data/mockData'

const Badge = ({ belt, time, className = '', size = 'sm' }) => {
  const beltColor = beltColors[belt] || beltColors.branca

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  }

  const beltText = belt.charAt(0).toUpperCase() + belt.slice(1)
  const displayText = time ? `${beltText} - ${time}` : beltText

  return (
    <span
      className={`rounded-full font-semibold inline-block ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: beltColor.bg,
        color: beltColor.text,
      }}
    >
      {displayText}
    </span>
  )
}

export default Badge
