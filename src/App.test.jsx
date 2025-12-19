import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component - Smoke Tests', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
  })

  it('should render without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('should show landing page when no token is present', () => {
    localStorage.getItem.mockReturnValue(null)
    render(<App />)
    
    // Should show landing page with header button
    const getStartedButtons = screen.getAllByRole('button', { name: /Get Started/i })
    expect(getStartedButtons.length).toBeGreaterThan(0)
    // Check that Actions Dashboard text appears at least once
    const dashboardTexts = screen.getAllByText(/Actions Dashboard/i)
    expect(dashboardTexts.length).toBeGreaterThan(0)
  })

  it('should show authentication setup after clicking Get Started', async () => {
    localStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()
    render(<App />)
    
    // Click the first Get Started button (header button)
    const getStartedButtons = screen.getAllByRole('button', { name: /Get Started/i })
    await user.click(getStartedButtons[0])
    
    // Should now show authentication setup
    expect(screen.getByText(/GitHub Authentication/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose an authentication method/i)).toBeInTheDocument()
  })

  it('should have both auth options visible after clicking Get Started', async () => {
    localStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()
    render(<App />)
    
    // Click the first Get Started button (header button)
    const getStartedButtons = screen.getAllByRole('button', { name: /Get Started/i })
    await user.click(getStartedButtons[0])
    
    // Should show both GitHub App and PAT options
    expect(screen.getByText(/GitHub App \(Recommended\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Personal Access Token/i)).toBeInTheDocument()
  })
})
