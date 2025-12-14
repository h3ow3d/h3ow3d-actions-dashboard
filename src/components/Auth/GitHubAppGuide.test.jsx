import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GitHubAppGuide from './GitHubAppGuide'

describe('GitHubAppGuide Component', () => {
  it('renders guide title', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByText('GitHub App Setup Guide')).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByLabelText('Close')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<GitHubAppGuide onClose={onClose} />)
    
    await user.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when clicking backdrop', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(<GitHubAppGuide onClose={onClose} />)
    
    const backdrop = container.firstChild
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not close when clicking modal content', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<GitHubAppGuide onClose={onClose} />)
    
    const modalContent = screen.getByText('GitHub App Setup Guide').closest('.Box')
    await user.click(modalContent)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders step 1 - Create GitHub App', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByText('Create GitHub App')).toBeInTheDocument()
  })

  it('renders step 2 - Generate Private Key', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByText('Generate Private Key')).toBeInTheDocument()
  })

  it('renders step 3 - Install the App', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByText('Install the App')).toBeInTheDocument()
  })

  it('renders step 4 - Configure Dashboard', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    expect(screen.getByText('Configure Dashboard')).toBeInTheDocument()
  })

  it('renders link to create new GitHub App', () => {
    render(<GitHubAppGuide onClose={vi.fn()} />)
    const link = screen.getByRole('link', { name: /open github app creation form/i })
    expect(link).toHaveAttribute('href', 'https://github.com/settings/apps/new')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders with proper modal styling', () => {
    const { container } = render(<GitHubAppGuide onClose={vi.fn()} />)
    const backdrop = container.firstChild
    expect(backdrop).toHaveClass('position-fixed')
    expect(backdrop).toHaveStyle({ zIndex: '9999' })
  })
})
