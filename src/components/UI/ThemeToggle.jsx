import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ theme, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className="btn btn-sm" 
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme (T)`}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
