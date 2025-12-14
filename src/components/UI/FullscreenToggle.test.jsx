import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FullscreenToggle } from './FullscreenToggle'

describe('FullscreenToggle Component', () => {
  it('renders maximize button when not fullscreen', () => {
    render(<FullscreenToggle isFullscreen={false} onToggle={vi.fn()} />)
    const button = screen.getByLabelText('Fullscreen')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Fullscreen (F)')
  })

  it('renders minimize button when fullscreen', () => {
    render(<FullscreenToggle isFullscreen={true} onToggle={vi.fn()} />)
    const button = screen.getByLabelText('Exit Fullscreen')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Exit Fullscreen')
  })

  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<FullscreenToggle isFullscreen={false} onToggle={onToggle} />)
    
    await user.click(screen.getByLabelText('Fullscreen'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
