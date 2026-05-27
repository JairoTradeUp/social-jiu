import React, { useState } from 'react'
import { Eye, EyeOff, User, Lock } from 'lucide-react'

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
  const [focused, setFocused] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  // Default icons based on input type
  const DefaultLeftIcon = !LeftIcon && type === 'email' ? User : !LeftIcon && type === 'password' ? Lock : LeftIcon

  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-label text-sm font-semibold mb-2 tracking-widest">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {(DefaultLeftIcon || LeftIcon) && (
          <div className="absolute left-4 flex items-center justify-center text-text-placeholder pointer-events-none">
            {DefaultLeftIcon ? <DefaultLeftIcon size={16} /> : <LeftIcon size={16} />}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-12 px-4 bg-surface-input border rounded-lg text-text-label font-medium text-base tracking-wider transition-all outline-none
            ${(DefaultLeftIcon || LeftIcon) ? 'pl-10' : ''}
            ${(RightIcon || type === 'password') ? 'pr-10' : ''}
            ${error
              ? 'border-brand-red focus:border-brand-red'
              : focused
                ? 'border-blue-400'
                : 'border-surface-input-border'
            }
            placeholder:text-text-placeholder
            ${className}
          `}
          {...props}
        />
        <style>{`
          input::placeholder {
            color: #9ca3af;
            opacity: 1;
          }
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #454a54 inset !important;
            -webkit-text-fill-color: #eff2f6 !important;
          }
        `}</style>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-text-placeholder hover:text-text-label transition-colors flex items-center justify-center"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {RightIcon && type !== 'password' && (
          <div className="absolute right-4 flex items-center justify-center text-text-placeholder">
            <RightIcon size={16} />
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
