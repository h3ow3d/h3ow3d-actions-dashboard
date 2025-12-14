import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardGrid } from './DashboardGrid'

describe('DashboardGrid Component', () => {
  it('renders grid with repositories', () => {
    const repositories = [
      ['repo1', { status: 'completed', conclusion: 'success', category: 'Frontend' }],
      ['repo2', { status: 'in_progress', category: 'Backend' }]
    ]
    
    render(<DashboardGrid repositories={repositories} columns={2} />)
    
    expect(screen.getByText('repo1')).toBeInTheDocument()
    expect(screen.getByText('repo2')).toBeInTheDocument()
  })

  it('renders empty grid when no repositories', () => {
    const { container } = render(<DashboardGrid repositories={[]} columns={2} />)
    const grid = container.querySelector('[style*="display: grid"]')
    expect(grid).toBeInTheDocument()
    expect(grid.children).toHaveLength(0)
  })

  it('applies correct column count', () => {
    const repositories = [
      ['repo1', { status: 'completed', conclusion: 'success', category: 'Test' }]
    ]
    
    const { container } = render(<DashboardGrid repositories={repositories} columns={3} />)
    const grid = container.querySelector('[style*="grid-template-columns"]')
    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(3, 1fr)' })
  })
})
