import React from 'react'

const Logo = ({ width = 121, height = 96, className = '' }) => {
  return (
    <img
      src="/assets/logo-social-jiu.png"
      alt="App Jiu-jitsu Logo"
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain'
      }}
    />
  )
}

export default Logo
