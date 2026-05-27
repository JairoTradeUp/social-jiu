const TopBar = ({ title, leftAction, rightAction, transparent = false }) => {
  return (
    <div className={`flex items-center justify-between px-4 py-4 ${transparent ? '' : 'border-b border-surface-border'}`}>
      <div className="flex-1">
        {leftAction || <div />}
      </div>
      {title && (
        <h1 className="text-text-primary text-lg font-semibold flex-1 text-center px-4">
          {title}
        </h1>
      )}
      <div className="flex-1 flex justify-end">
        {rightAction || <div />}
      </div>
    </div>
  )
}

export default TopBar
