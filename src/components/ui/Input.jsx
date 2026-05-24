import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Input = React.forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-secondary text-sm mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
            <LeftIcon size={20} />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-13 bg-surface-card border rounded-3xl px-4 text-text-primary placeholder-text-tertiary transition-colors
            ${LeftIcon ? 'pl-12' : ''}
            ${RightIcon || type === 'password' ? 'pr-12' : ''}
            ${error ? 'border-brand-red focus:border-brand-red' : 'border-surface-border focus:border-brand-red'}
            focus:outline-none
            ${className}
          `}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        {RightIcon && type !== 'password' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
            <RightIcon size={20} />
          </div>
        )}
      </div>
      {error && (
        <p className="text-brand-red text-xs mt-1.5 font-medium">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
