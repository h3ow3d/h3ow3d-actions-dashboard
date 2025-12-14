import { RepoCard } from './RepoCard'

/**
 * Grid layout component for displaying repository cards
 */
export function DashboardGrid({ repositories, columns }) {
  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: '1fr',
        gap: '16px',
        height: '100%',
        alignContent: 'stretch'
      }}>
        {repositories.map(([repoName, status]) => (
          <RepoCard key={repoName} repoName={repoName} status={status} />
        ))}
      </div>
    </div>
  )
}
