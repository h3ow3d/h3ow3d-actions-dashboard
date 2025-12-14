import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PatForm } from './PatForm'

describe('PatForm Component', () => {
  const defaultProps = {
    githubToken: '',
    setGithubToken: vi.fn(),
    onSubmit: vi.fn()
  }

  it('renders PAT form title', () => {
    render(<PatForm {...defaultProps} />)
    expect(screen.getByText('Personal Access Token')).toBeInTheDocument()
  })

  it('renders token input field', () => {
    render(<PatForm {...defaultProps} />)
    const input = screen.getByPlaceholderText('ghp_xxxxxxxxxxxx')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders create token link', () => {
    render(<PatForm {...defaultProps} />)
    const link = screen.getByText('Create a new token')
    expect(link).toHaveAttribute('href', 'https://github.com/settings/tokens/new?scopes=repo&description=h3ow3d-dashboard')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders submit button disabled when token is empty', () => {
    render(<PatForm {...defaultProps} githubToken="" />)
    expect(screen.getByRole('button', { name: /save token/i })).toBeDisabled()
  })

  it('renders submit button enabled when token has value', () => {
    render(<PatForm {...defaultProps} githubToken="ghp_test123" />)
    expect(screen.getByRole('button', { name: /save token/i })).not.toBeDisabled()
  })

  it('calls setGithubToken when input changes', async () => {
    const user = userEvent.setup()
    const setGithubToken = vi.fn()
    render(<PatForm {...defaultProps} setGithubToken={setGithubToken} />)
    
    await user.type(screen.getByPlaceholderText('ghp_xxxxxxxxxxxx'), 'test')
    expect(setGithubToken).toHaveBeenCalled()
  })

  it('calls onSubmit when form submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PatForm {...defaultProps} githubToken="ghp_test" onSubmit={onSubmit} />)
    
    await user.click(screen.getByRole('button', { name: /save token/i }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })
})
