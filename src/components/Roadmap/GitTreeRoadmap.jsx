import { useState } from 'react'
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react'
import { Text, IconButton } from '@primer/react'
import { ChevronRightIcon } from '@primer/octicons-react'
import { RoadmapCard } from './RoadmapCard'
import { roadmapFeatures } from './roadmapData'
import './GitTreeRoadmap.css'

export function GitTreeRoadmap({ theme }) {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [graphKey] = useState(() => Date.now()) // Unique key for this component instance

  // Sort features by status: completed -> in-progress -> planned
  const sortedFeatures = [...roadmapFeatures].sort((a, b) => {
    const statusOrder = { 'completed': 0, 'in-progress': 1, 'planned': 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  // Group features by status
  const completedFeatures = sortedFeatures.filter(f => f.status === 'completed')
  const inProgressFeatures = sortedFeatures.filter(f => f.status === 'in-progress')
  const plannedFeatures = sortedFeatures.filter(f => f.status === 'planned')

  // Custom template based on theme
  const customTemplate = templateExtend(TemplateName.Metro, {
    colors: theme === 'dark'
      ? ['#238636', '#d29922', '#1f6feb', '#8b949e']
      : ['#2da44e', '#bf8700', '#0969da', '#57606a'],
    branch: {
      lineWidth: 3,
      spacing: 50,
      label: {
        display: true,
        bgColor: theme === 'dark' ? '#161b22' : '#ffffff',
        color: theme === 'dark' ? '#c9d1d9' : '#24292f',
        font: 'normal 12pt sans-serif',
        borderRadius: 6,
      }
    },
    commit: {
      spacing: 60,
      dot: {
        size: 10,
        strokeWidth: 3,
      },
      message: {
        display: true,
        displayAuthor: false,
        displayHash: false,
        font: 'normal 14pt sans-serif',
        color: theme === 'dark' ? '#c9d1d9' : '#24292f',
      },
    },
  })

  const handleCommitClick = (commit) => {
    // Extract the feature ID from the hash (format: "timestamp-branch-id-index")
    const parts = commit.hashAbbrev.split('-')
    // parts[0] = timestamp, parts[1] = branch, parts[2] = id, parts[3] = index
    const featureId = parts[2] // Get the ID part
    const feature = sortedFeatures.find(f => f.id.toString() === featureId)
    if (feature) {
      setSelectedFeature(feature)
      setExpandedCard(feature.id)
    }
  }

  const renderGitGraph = (gitgraph) => {
    // Create main branch
    const mainBranch = gitgraph.branch({
      name: 'main',
      style: {
        color: theme === 'dark' ? '#238636' : '#2da44e',
        label: {
          bgColor: theme === 'dark' ? '#161b22' : '#ffffff',
          color: theme === 'dark' ? '#238636' : '#2da44e',
          strokeColor: theme === 'dark' ? '#238636' : '#2da44e',
        }
      }
    })

    // Add a starting commit
    mainBranch.commit({
      subject: 'Project Start',
      hash: `${graphKey}-start`,
      style: {
        dot: {
          color: theme === 'dark' ? '#238636' : '#2da44e',
          strokeColor: theme === 'dark' ? '#238636' : '#2da44e',
        }
      }
    })

    // Add completed features to main branch
    if (completedFeatures.length > 0) {
      completedFeatures.forEach((feature, index) => {
        mainBranch.commit({
          subject: `✅ ${feature.title}`,
          hash: `${graphKey}-main-${feature.id}-${index}`,
          onClick: handleCommitClick,
          style: {
            dot: {
              color: theme === 'dark' ? '#238636' : '#2da44e',
              strokeColor: theme === 'dark' ? '#238636' : '#2da44e',
            },
            message: {
              color: theme === 'dark' ? '#c9d1d9' : '#24292f',
            }
          }
        })
      })
    }

    // Create in-progress branch
    if (inProgressFeatures.length > 0) {
      const inProgressBranch = gitgraph.branch({
        name: 'in-progress',
        style: {
          color: theme === 'dark' ? '#d29922' : '#bf8700',
          label: {
            bgColor: theme === 'dark' ? '#161b22' : '#ffffff',
            color: theme === 'dark' ? '#d29922' : '#bf8700',
            strokeColor: theme === 'dark' ? '#d29922' : '#bf8700',
          }
        }
      })

      inProgressFeatures.forEach((feature, index) => {
        inProgressBranch.commit({
          subject: `🚧 ${feature.title}`,
          hash: `${graphKey}-progress-${feature.id}-${index}`,
          onClick: handleCommitClick,
          style: {
            dot: {
              color: theme === 'dark' ? '#d29922' : '#bf8700',
              strokeColor: theme === 'dark' ? '#d29922' : '#bf8700',
            },
            message: {
              color: theme === 'dark' ? '#c9d1d9' : '#24292f',
            }
          }
        })
      })
    }

    // Create planned branch
    if (plannedFeatures.length > 0) {
      const plannedBranch = gitgraph.branch({
        name: 'planned',
        style: {
          color: theme === 'dark' ? '#1f6feb' : '#0969da',
          label: {
            bgColor: theme === 'dark' ? '#161b22' : '#ffffff',
            color: theme === 'dark' ? '#1f6feb' : '#0969da',
            strokeColor: theme === 'dark' ? '#1f6feb' : '#0969da',
          }
        }
      })

      plannedFeatures.forEach((feature, index) => {
        plannedBranch.commit({
          subject: `📋 ${feature.title}`,
          hash: `${graphKey}-planned-${feature.id}-${index}`,
          onClick: handleCommitClick,
          style: {
            dot: {
              color: theme === 'dark' ? '#1f6feb' : '#0969da',
              strokeColor: theme === 'dark' ? '#1f6feb' : '#0969da',
            },
            message: {
              color: theme === 'dark' ? '#c9d1d9' : '#24292f',
            }
          }
        })
      })
    }
  }

  return (
    <div className="git-tree-roadmap">
      <div className="git-tree-container">
        <div className="git-tree-graph">
          <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--bgColor-muted)', borderRadius: '6px' }}>
            <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
              📊 Interactive Git Graph - Click on any commit to see details
            </Text>
          </div>
          <Gitgraph key={graphKey} options={{ template: customTemplate }}>
            {renderGitGraph}
          </Gitgraph>
        </div>

        {/* Details Panel */}
        {selectedFeature && (
          <div className="git-tree-details">
            <div className="details-header">
              <Text sx={{ fontSize: 2, fontWeight: 'semibold' }}>Feature Details</Text>
              <IconButton
                icon={ChevronRightIcon}
                aria-label="Close details"
                onClick={() => {
                  setSelectedFeature(null)
                  setExpandedCard(null)
                }}
                variant="invisible"
              />
            </div>
            <div className="details-content">
              <RoadmapCard
                feature={selectedFeature}
                isExpanded={expandedCard === selectedFeature.id}
                onToggleExpand={() => setExpandedCard(expandedCard === selectedFeature.id ? null : selectedFeature.id)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="git-tree-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: theme === 'dark' ? '#238636' : '#2da44e' }}></div>
          <Text sx={{ fontSize: 1 }}>Completed Features (main branch)</Text>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: theme === 'dark' ? '#d29922' : '#bf8700' }}></div>
          <Text sx={{ fontSize: 1 }}>In Progress (in-progress branch)</Text>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: theme === 'dark' ? '#1f6feb' : '#0969da' }}></div>
          <Text sx={{ fontSize: 1 }}>Planned Features (planned branch)</Text>
        </div>
        <div className="legend-note">
          <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
            💡 Click on any commit to see feature details
          </Text>
        </div>
      </div>
    </div>
  )
}
