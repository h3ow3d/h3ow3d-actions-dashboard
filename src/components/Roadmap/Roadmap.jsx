import { useState } from 'react'
import {
  RocketIcon,
  ChevronLeftIcon,
  MoonIcon,
  SunIcon,
  FilterIcon,
  ListUnorderedIcon,
  GitBranchIcon
} from '@primer/octicons-react'
import { Button, IconButton, Text, Heading, Label, SegmentedControl } from '@primer/react'
import { RoadmapCard } from './RoadmapCard'
import { SimpleGitGraph } from './SimpleGitGraph'
import { roadmapFeatures, futureConsiderations, statusConfig, priorityConfig } from './roadmapData'
import './Roadmap.css'
import '../../styles/shared.css'

export function Roadmap({ onBack, theme, setTheme }) {
  const [viewMode, setViewMode] = useState('tree') // 'grid' or 'tree'
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [expandedCard, setExpandedCard] = useState(null)

  // Filter features based on selected filters
  const filteredFeatures = roadmapFeatures.filter(feature => {
    const statusMatch = filterStatus === 'all' || feature.status === filterStatus
    const priorityMatch = filterPriority === 'all' || feature.priority === filterPriority
    return statusMatch && priorityMatch
  })

  // Group features by status
  const featuresByStatus = {
    'in-progress': filteredFeatures.filter(f => f.status === 'in-progress'),
    'planned': filteredFeatures.filter(f => f.status === 'planned'),
    'completed': filteredFeatures.filter(f => f.status === 'completed')
  }

  const stats = [
    {
      value: featuresByStatus['in-progress'].length,
      label: "In Progress",
      color: 'var(--fgColor-attention)'
    },
    {
      value: featuresByStatus['planned'].length,
      label: "Planned",
      color: 'var(--fgColor-accent)'
    },
    {
      value: featuresByStatus['completed'].length,
      label: "Completed",
      color: 'var(--fgColor-success)'
    },
    {
      value: roadmapFeatures.length,
      label: "Total Features",
      color: 'var(--fgColor-default)'
    }
  ]

  return (
    <div className="roadmap-page" style={{ background: 'var(--bgColor-default)', color: 'var(--fgColor-default)' }}>
      {/* Header */}
      <header className="roadmap-header">
        <div className="container">
          <div className="d-flex flex-justify-between flex-items-center">
            <div className="d-flex flex-items-center" style={{ gap: '12px' }}>
              <Button
                leadingVisual={ChevronLeftIcon}
                onClick={onBack}
                variant="invisible"
              >
                Back
              </Button>
              <div className="d-flex flex-items-center" style={{ gap: '12px', marginLeft: '12px' }}>
                <RocketIcon size={28} />
                <Text sx={{ fontSize: 3, fontWeight: 'semibold' }}>Product Roadmap</Text>
              </div>
            </div>
            <IconButton
              icon={theme === 'dark' ? SunIcon : MoonIcon}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="color-fg-muted"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="roadmap-hero">
        <div className="container">
          <div className="roadmap-hero-content">
            <Heading as="h1" sx={{ fontSize: [6, 7], fontWeight: 'bold', mb: 3 }}>
              Our Vision for the Future
            </Heading>
            <p className="roadmap-description">
              We're constantly working to make the GitHub Actions Dashboard better.
              Here's what we're building, what's next, and what we're considering for the future.
            </p>

            {/* Stats Bar */}
            <div className="stats-bar">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat">
                  <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle & Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="view-toggle-container">
            <div className="d-flex flex-items-center" style={{ gap: '12px' }}>
              <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>View:</Text>
              <div className="view-toggle-buttons">
                <Button
                  variant={viewMode === 'tree' ? 'primary' : 'default'}
                  size="small"
                  leadingVisual={GitBranchIcon}
                  onClick={() => setViewMode('tree')}
                >
                  Git Tree
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'default'}
                  size="small"
                  leadingVisual={ListUnorderedIcon}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
              </div>
            </div>
          </div>

          {/* Only show filters in grid mode */}
          {viewMode === 'grid' && (
            <div className="filters-container">
              <div className="filter-group">
                <div className="d-flex flex-items-center" style={{ gap: '8px', marginBottom: '8px' }}>
                  <FilterIcon size={16} />
                  <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>Status</Text>
                </div>
              <div className="filter-buttons">
                <Button
                  variant={filterStatus === 'all' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'in-progress' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterStatus('in-progress')}
                >
                  🚧 In Progress
                </Button>
                <Button
                  variant={filterStatus === 'planned' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterStatus('planned')}
                >
                  📋 Planned
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterStatus('completed')}
                >
                  ✅ Completed
                </Button>
              </div>
            </div>

            <div className="filter-group">
              <div className="d-flex flex-items-center" style={{ gap: '8px', marginBottom: '8px' }}>
                <FilterIcon size={16} />
                <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>Priority</Text>
              </div>
              <div className="filter-buttons">
                <Button
                  variant={filterPriority === 'all' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterPriority('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterPriority === 'high' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterPriority('high')}
                >
                  🔴 High
                </Button>
                <Button
                  variant={filterPriority === 'medium' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterPriority('medium')}
                >
                  🟡 Medium
                </Button>
                <Button
                  variant={filterPriority === 'low' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setFilterPriority('low')}
                >
                  🟢 Low
                </Button>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Features Section - Conditional Rendering */}
      <section className="roadmap-features-section">
        <div className="container">
          {viewMode === 'tree' ? (
            <SimpleGitGraph />
          ) : (
            <>
              {filteredFeatures.length === 0 ? (
                <div className="no-results">
                  <Text sx={{ color: 'fg.muted', fontSize: 2 }}>
                    No features match the selected filters
                  </Text>
                </div>
              ) : (
                <div className="roadmap-grid">
                  {filteredFeatures.map((feature) => (
                    <RoadmapCard
                      key={feature.id}
                      feature={feature}
                      isExpanded={expandedCard === feature.id}
                      onToggleExpand={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Future Considerations */}
      <section className="future-section">
        <div className="container">
          <div className="section-header">
            <Heading as="h2" sx={{ fontSize: 5, mb: 2 }}>Future Considerations</Heading>
            <Text sx={{ color: 'fg.muted', fontSize: 2 }}>
              Ideas we're exploring for the long-term future
            </Text>
          </div>

          <div className="future-grid">
            {futureConsiderations.map((idea, idx) => (
              <div key={idx} className="future-card">
                <Text sx={{ fontSize: 2 }}>{idea}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution CTA */}
      <section className="contribute-section">
        <div className="container">
          <div className="contribute-content">
            <Heading as="h2" sx={{ fontSize: 5, mb: 3 }}>
              Have an idea?
            </Heading>
            <Text as="p" sx={{ fontSize: 2, color: 'fg.muted', mb: 4 }}>
              We'd love to hear your suggestions! Open an issue on GitHub to discuss new features or improvements.
            </Text>
            <Button
              as="a"
              href="https://github.com/h3ow3d/h3ow3d-actions-dashboard/issues"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="large"
            >
              Suggest a Feature
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="roadmap-footer">
        <div className="container">
          <div className="text-center">
            <Text sx={{ color: 'fg.muted', fontSize: 1 }}>
              Last updated: December 2025 • This roadmap is subject to change
            </Text>
          </div>
        </div>
      </footer>
    </div>
  )
}
