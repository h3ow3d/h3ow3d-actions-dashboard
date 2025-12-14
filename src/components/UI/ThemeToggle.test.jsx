import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle Component', () => {
  it('renders with dark theme icon', () => {
    render(<ThemeToggle theme="dark" onToggle={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Switch to light theme (T)')
  })

  it('renders with light theme icon', () => {
    render(<ThemeToggle theme="light" onToggle={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Switch to dark theme (T)')
  })

  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ThemeToggle theme="dark" onToggle={onToggle} />)
    
    await user.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
