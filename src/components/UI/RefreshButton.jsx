import { RefreshCw } from 'lucide-react'

export function RefreshButton({ onRefresh, loading, disabled }) {
  return (
    <button 
      onClick={onRefresh}
      disabled={disabled || loading}
      className="btn btn-sm" 
      title="Refresh all repos (R)"
    >
      <RefreshCw 
        size={16} 
        className={loading ? 'spinning' : ''} 
      />
    </button>
  )
}
