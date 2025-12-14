import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  GitBranch,
  ExternalLink
} from 'lucide-react'

const getStatusIcon = (status) => {
  if (status.error) return <AlertCircle size={18} className="color-fg-danger" />
  if (status.status === 'completed') {
    if (status.conclusion === 'success') return <CheckCircle size={18} className="color-fg-success" />
    if (status.conclusion === 'failure') return <XCircle size={18} className="color-fg-danger" />
    return <AlertCircle size={18} className="color-fg-attention" />
  }
  if (status.status === 'in_progress') return <Clock size={18} className="color-fg-accent" />
  return <AlertCircle size={18} className="color-fg-muted" />
}

const getStatusClass = (status) => {
  if (status.error) return 'error'
  if (status.status === 'completed') {
    if (status.conclusion === 'success') return 'success'
    if (status.conclusion === 'failure') return 'failure'
    return 'warning'
  }
  if (status.status === 'in_progress') return 'in-progress'
  return 'unknown'
}

const getLabelColor = (category) => {
  // Generate a unique color for each category name (like GitHub labels)
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  
  const hue = (Math.abs(hash) * 137.508) % 360
  const saturation = 60 + (Math.abs(hash) % 20)
  const lightness = 50 + (Math.abs(hash >> 8) % 15)
  const textLightness = 75 + (Math.abs(hash >> 16) % 10)
  const textColor = `hsl(${hue}, ${saturation}%, ${textLightness}%)`
  const bgColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`
  const borderColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.25)`
  
  return { text: textColor, bg: bgColor, border: borderColor }
}

export function StatusCard({ repoName, status }) {
  const labelColor = getLabelColor(status.category)
  
  return (
    <div className={`Box rounded-2 ${getStatusClass(status)}`}>
      <div className="Box-header">
        <div className="d-flex flex-items-start flex-justify-between gap-2">
          <div className="flex-1 min-width-0">
            <h3 className="Box-title mb-1">{repoName}</h3>
            <p className="color-fg-muted mb-0 lh-condensed" style={{fontSize: '11px'}}>
              {status.description}
            </p>
          </div>
          <div className="status-icon">
            {getStatusIcon(status)}
          </div>
        </div>
      </div>
      
      <div className="Box-body">
        {status.error ? (
          <p className="f6 color-fg-danger mb-0">{status.error}</p>
        ) : status.status ? (
          <div>
            <div className="metadata-row workflow-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Workflow</span>
              <span className="text-bold">{status.workflow || 'N/A'}</span>
            </div>
            <div className="metadata-row branch-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Branch</span>
              <span className="d-flex flex-items-center gap-1">
                <GitBranch size={11} />
                {status.branch || 'N/A'}
              </span>
            </div>
            <div className="metadata-row commit-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Commit</span>
              <span className="text-mono flex-1 text-right" style={{
                fontSize: '10px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginLeft: '8px'
              }}>
                {status.commitMessage}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="metadata-row workflow-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Workflow</span>
              <span>N/A</span>
            </div>
            <div className="metadata-row branch-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Branch</span>
              <span className="d-flex flex-items-center gap-1">
                <GitBranch size={11} />
                N/A
              </span>
            </div>
            <div className="metadata-row commit-row d-flex flex-justify-between flex-items-center">
              <span className="color-fg-muted">Commit</span>
              <span>N/A</span>
            </div>
          </div>
        )}
      </div>

      <div className="Box-footer d-flex flex-justify-between flex-items-center">
        <div className="flex-1 min-width-0">
          {status.url ? (
            <a href={status.url} target="_blank" rel="noopener noreferrer" className="Link--primary d-inline-flex flex-items-center gap-1" style={{fontSize: '11px'}}>
              <span>View Run</span>
              <ExternalLink size={10} />
            </a>
          ) : (
            <span className="color-fg-muted" style={{fontSize: '11px'}}>No recent runs</span>
          )}
        </div>
        <span 
          className="Label"
          style={{
            color: labelColor.text,
            backgroundColor: labelColor.bg,
            borderColor: labelColor.border
          }}
        >
          {status.category}
        </span>
      </div>
    </div>
  )
}
