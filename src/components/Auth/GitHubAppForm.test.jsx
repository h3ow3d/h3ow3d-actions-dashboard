import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GitHubAppForm } from './GitHubAppForm'

describe('GitHubAppForm Component', () => {
  const defaultProps = {
    appId: '',
    setAppId: vi.fn(),
    installationId: '',
    setInstallationId: vi.fn(),
    privateKey: '',
    setPrivateKey: vi.fn(),
    appFormError: '',
    onSubmit: vi.fn(),
    onBack: vi.fn(),
    onShowGuide: vi.fn()
  }

  it('renders form title', () => {
    render(<GitHubAppForm {...defaultProps} />)
    expect(screen.getByText('GitHub App Configuration')).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<GitHubAppForm {...defaultProps} />)
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
  })

  it('renders all input fields', () => {
    render(<GitHubAppForm {...defaultProps} />)
    expect(screen.getByLabelText('App ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Installation ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Private Key (PEM)')).toBeInTheDocument()
  })

  it('renders setup guide link', () => {
    render(<GitHubAppForm {...defaultProps} />)
    expect(screen.getByText('View setup guide')).toBeInTheDocument()
  })

  it('submit button disabled when fields are empty', () => {
    render(<GitHubAppForm {...defaultProps} />)
    expect(screen.getByRole('button', { name: /save & authenticate/i })).toBeDisabled()
  })

  it('submit button enabled when all fields filled', () => {
    render(<GitHubAppForm {...defaultProps} appId="123" installationId="456" privateKey="key" />)
    expect(screen.getByRole('button', { name: /save & authenticate/i })).not.toBeDisabled()
  })

  it('displays error message when provided', () => {
    render(<GitHubAppForm {...defaultProps} appFormError="Invalid credentials" />)
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('calls onBack when back button clicked', async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<GitHubAppForm {...defaultProps} onBack={onBack} />)
    
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('calls onShowGuide when guide link clicked', async () => {
    const user = userEvent.setup()
    const onShowGuide = vi.fn()
    render(<GitHubAppForm {...defaultProps} onShowGuide={onShowGuide} />)
    
    await user.click(screen.getByText('View setup guide'))
    expect(onShowGuide).toHaveBeenCalledOnce()
  })

  it('calls onSubmit when form submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<GitHubAppForm {...defaultProps} appId="123" installationId="456" privateKey="key" onSubmit={onSubmit} />)
    
    await user.click(screen.getByRole('button', { name: /save & authenticate/i }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('calls setAppId when app id input changes', async () => {
    const user = userEvent.setup()
    const setAppId = vi.fn()
    render(<GitHubAppForm {...defaultProps} setAppId={setAppId} />)
    
    await user.type(screen.getByLabelText('App ID'), '123')
    expect(setAppId).toHaveBeenCalled()
  })

  it('calls setInstallationId when installation id input changes', async () => {
    const user = userEvent.setup()
    const setInstallationId = vi.fn()
    render(<GitHubAppForm {...defaultProps} setInstallationId={setInstallationId} />)
    
    await user.type(screen.getByLabelText('Installation ID'), '456')
    expect(setInstallationId).toHaveBeenCalled()
  })

  it('calls setPrivateKey when private key input changes', async () => {
    const user = userEvent.setup()
    const setPrivateKey = vi.fn()
    render(<GitHubAppForm {...defaultProps} setPrivateKey={setPrivateKey} />)
    
    await user.type(screen.getByLabelText('Private Key (PEM)'), 'key')
    expect(setPrivateKey).toHaveBeenCalled()
  })
})
