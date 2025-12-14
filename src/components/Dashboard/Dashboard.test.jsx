import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'

describe('Dashboard Component', () => {
  const defaultProps = {
    repoStatuses: {},
    loading: false,
    lastUpdate: new Date('2025-12-14T12:00:00'),
    fetchAllStatuses: vi.fn(),
    isFullscreen: false,
    toggleFullscreen: vi.fn(),
    authMethod: 'pat',
    appInfo: null,
    handleLogout: vi.fn(),
    clearToken: vi.fn(),
    theme: 'dark',
    setTheme: vi.fn(),
    sortBy: 'last-run-desc',
    setSortBy: vi.fn(),
    autoRefresh: true,
    setAutoRefresh: vi.fn(),
    refreshInterval: 10,
    setRefreshInterval: vi.fn()
  }

  it('renders dashboard header when not fullscreen', () => {
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText('Actions Dashboard')).toBeInTheDocument()
  })

  it('hides dashboard header when fullscreen', () => {
    render(<Dashboard {...defaultProps} isFullscreen={true} />)
    expect(screen.queryByText('Actions Dashboard')).not.toBeInTheDocument()
  })

  it('shows loading message when loading and no repos', () => {
    render(<Dashboard {...defaultProps} loading={true} repoStatuses={{}} />)
    expect(screen.getByText('Loading repository statuses...')).toBeInTheDocument()
  })

  it('renders grid with repositories', () => {
    const repoStatuses = {
      'test-repo': { 
        status: 'completed', 
        conclusion: 'success', 
        category: 'Test',
        description: 'Test repo'
      }
    }
    render(<Dashboard {...defaultProps} repoStatuses={repoStatuses} />)
    expect(screen.getByText('test-repo')).toBeInTheDocument()
  })

  it('shows fullscreen toggle button when fullscreen', () => {
    render(<Dashboard {...defaultProps} isFullscreen={true} />)
    expect(screen.getByLabelText('Exit Fullscreen')).toBeInTheDocument()
  })

  it('applies correct max width when not fullscreen', () => {
    const { container } = render(<Dashboard {...defaultProps} isFullscreen={false} />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveStyle({ maxWidth: '1600px' })
  })

  it('applies no max width when fullscreen', () => {
    const { container } = render(<Dashboard {...defaultProps} isFullscreen={true} />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveStyle({ maxWidth: 'none' })
  })
})
