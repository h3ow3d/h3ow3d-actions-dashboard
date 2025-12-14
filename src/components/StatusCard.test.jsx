import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusCard } from './StatusCard'

describe('StatusCard Component', () => {
  describe('Rendering', () => {
    it('renders repository name', () => {
      const status = {
        category: 'Frontend',
        description: 'Main web application'
      }
      
      render(<StatusCard repoName="my-repo" status={status} />)
      
      expect(screen.getByText('my-repo')).toBeInTheDocument()
    })
    
    it('renders description', () => {
      const status = {
        category: 'Backend',
        description: 'API server'
      }
      
      render(<StatusCard repoName="api" status={status} />)
      
      expect(screen.getByText('API server')).toBeInTheDocument()
    })
    
    it('renders category label', () => {
      const status = {
        category: 'DevOps',
        description: 'Infrastructure'
      }
      
      render(<StatusCard repoName="infra" status={status} />)
      
      expect(screen.getByText('DevOps')).toBeInTheDocument()
    })
  })
  
  describe('Error States', () => {
    it('displays error message when error exists', () => {
      const status = {
        category: 'Frontend',
        description: 'Main app',
        error: 'Failed to fetch workflow status'
      }
      
      render(<StatusCard repoName="my-repo" status={status} />)
      
      expect(screen.getByText('Failed to fetch workflow status')).toBeInTheDocument()
    })
    
    it('shows error icon when error exists', () => {
      const status = {
        category: 'Frontend',
        description: 'Main app',
        error: 'API error'
      }
      
      const { container } = render(<StatusCard repoName="my-repo" status={status} />)
      
      expect(container.querySelector('.color-fg-danger')).toBeInTheDocument()
    })
  })
  
  describe('Success States', () => {
    it('displays workflow information for completed success', () => {
      const status = {
        category: 'Frontend',
        description: 'Main app',
        status: 'completed',
        conclusion: 'success',
        workflow: 'CI Pipeline',
        branch: 'main',
        commitMessage: 'fix: update dependencies',
        url: 'https://github.com/example/repo/actions/runs/123'
      }
      
      render(<StatusCard repoName="my-repo" status={status} />)
      
      expect(screen.getByText('CI Pipeline')).toBeInTheDocument()
      expect(screen.getByText('main')).toBeInTheDocument()
      expect(screen.getByText('fix: update dependencies')).toBeInTheDocument()
    })
    
    it('renders View Run link when url exists', () => {
      const status = {
        category: 'Frontend',
        description: 'Main app',
        status: 'completed',
        conclusion: 'success',
        url: 'https://github.com/example/repo/actions/runs/123'
      }
      
      render(<StatusCard repoName="my-repo" status={status} />)
      
      const link = screen.getByText('View Run')
      expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/example/repo/actions/runs/123')
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
    })
  })
  
  describe('In-Progress States', () => {
    it('displays in-progress workflow information', () => {
      const status = {
        category: 'Backend',
        description: 'API',
        status: 'in_progress',
        workflow: 'Deploy to Staging',
        branch: 'develop',
        commitMessage: 'feat: add new endpoint'
      }
      
      render(<StatusCard repoName="api-server" status={status} />)
      
      expect(screen.getByText('Deploy to Staging')).toBeInTheDocument()
      expect(screen.getByText('develop')).toBeInTheDocument()
    })
  })
  
  describe('Empty States', () => {
    it('shows N/A for missing workflow data', () => {
      const status = {
        category: 'Frontend',
        description: 'No runs yet'
      }
      
      render(<StatusCard repoName="new-repo" status={status} />)
      
      expect(screen.getByText('No recent runs')).toBeInTheDocument()
    })
  })
  
  describe('Failure States', () => {
    it('displays failure information', () => {
      const status = {
        category: 'Frontend',
        description: 'Main app',
        status: 'completed',
        conclusion: 'failure',
        workflow: 'Test Suite',
        branch: 'feature/new-ui',
        commitMessage: 'test: add new tests'
      }
      
      render(<StatusCard repoName="my-repo" status={status} />)
      
      expect(screen.getByText('Test Suite')).toBeInTheDocument()
      expect(screen.getByText('feature/new-ui')).toBeInTheDocument()
    })
  })
})
