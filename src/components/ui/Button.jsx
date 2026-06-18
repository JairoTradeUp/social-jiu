import React from 'react'
import { Loader } from 'lucide-react'

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  // Full-width primary button: specs exatas do design system
  if ((fullWidth || size === 'lg') && variant === 'primary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        style={{
          display: 'flex',
          height: '48px',
          padding: '8px 16px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          alignSelf: 'stretch',
          borderRadius: '8px',
          background: disabled || loading ? '#888' : '#42587B',
          boxShadow: '0 -1.2px 0 0 rgba(0, 0, 0, 0.12) inset',
          border: 'none',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          width: '100%',
          // Tipografia
          color: '#FFF',
          textAlign: 'center',
          fontFamily: '"Red Hat Display", sans-serif',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',
          letterSpacing: '0.2px',
          opacity: disabled || loading ? 0.5 : 1,
          transition: 'opacity 0.2s, background 0.2s',
        }}
        {...props}
      >
        {loading ? <Loader className="animate-spin" size={20} /> : null}
        {children}
      </button>
    )
  }

  // Botões secundários / menores — mantém estilo anterior
  const baseClasses = 'font-semibold transition-colors duration-200 flex items-center justify-center gap-2'

  const variantClasses = {
    primary: 'bg-brand-red hover:bg-brand-red-dark text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg',
    secondary: 'bg-surface-card border border-surface-border text-text-primary hover:bg-surface-elevated rounded-lg',
    ghost: 'text-text-primary hover:bg-surface-elevated rounded-lg',
    danger: 'bg-brand-red/15 text-brand-red border border-brand-red hover:bg-brand-red/25 rounded-lg',
    outline: 'border border-surface-border text-text-primary hover:bg-surface-elevated rounded-lg',
  }

  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-12 px-6 text-base',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? <Loader className="animate-spin" size={20} /> : null}
      {children}
    </button>
  )
}

export default Button
