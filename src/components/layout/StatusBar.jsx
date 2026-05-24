import { Signal, Wifi, Battery } from 'lucide-react'

const StatusBar = () => {
  return (
    <div className="h-11 bg-surface-bg flex items-center justify-between px-4 border-b border-surface-border">
      <span className="text-text-primary text-sm font-medium">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} className="text-text-primary" />
        <Wifi size={14} className="text-text-primary" />
        <Battery size={14} className="text-text-primary" />
      </div>
    </div>
  )
}

export default StatusBar
