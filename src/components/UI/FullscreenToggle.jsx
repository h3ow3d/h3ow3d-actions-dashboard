import { Maximize, Minimize } from 'lucide-react'

export function FullscreenToggle({ isFullscreen, onToggle }) {
  const label = isFullscreen ? "Exit Fullscreen" : "Fullscreen"
  
  return (
    <button 
      onClick={onToggle}
      className="btn btn-sm" 
      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen (F)"}
      aria-label={label}
    >
      {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
    </button>
  )
}
