import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RefreshButton } from './RefreshButton'

describe('RefreshButton Component', () => {
  it('renders refresh button', () => {
    render(<RefreshButton onRefresh={vi.fn()} loading={false} disabled={false} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Refresh all repos (R)')
  })

  it('calls onRefresh when clicked', async () => {
    const user = userEvent.setup()
    const onRefresh = vi.fn()
    render(<RefreshButton onRefresh={onRefresh} loading={false} disabled={false} />)
    
    await user.click(screen.getByRole('button'))
    expect(onRefresh).toHaveBeenCalledOnce()
  })

  it('is disabled when loading prop is true', () => {
    render(<RefreshButton onRefresh={vi.fn()} loading={true} disabled={false} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<RefreshButton onRefresh={vi.fn()} loading={false} disabled={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is enabled when not loading and not disabled', () => {
    render(<RefreshButton onRefresh={vi.fn()} loading={false} disabled={false} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
