import { useState, useEffect } from 'react'
import { 
  RefreshCw, 
  Minimize
} from 'lucide-react'
import './App.css'
import GitHubAppGuide from './components/GitHubAppGuide'
import { StatusCard } from './components/StatusCard'
import { DashboardHeader } from './components/DashboardHeader'
import { AuthSetup } from './components/AuthSetup'
import {
  isGitHubAppConfigured,
  getGitHubAppToken,
  saveGitHubAppCredentials,
  clearGitHubAppAuth,
  validateGitHubAppCredentials,
  getAppInstallationInfo
} from './services/githubAppAuth'

const GITHUB_OWNER = 'h3ow3d'

const REPOSITORIES = {
  common: [
    { name: 'h3ow3d-github-actions', description: 'Shared CI/CD workflows' },
    { name: 'h3ow3d-infra-module-template', description: 'Terraform module template' },
  ],
  modules: [
    { name: 'h3ow3d-infra-cognito', description: 'Cognito authentication module' },
    { name: 'h3ow3d-infra-ecs-cluster', description: 'ECS cluster module' },
    { name: 'h3ow3d-infra-ecs-service', description: 'ECS service module' },
    { name: 'h3ow3d-infra-frontend', description: 'Frontend infrastructure module' },
    { name: 'h3ow3d-infra-monitoring', description: 'Monitoring module' },
    { name: 'h3ow3d-infra-networking', description: 'Networking module' },
  ],
  infra: [
    { name: 'h3ow3d-deployment', description: 'Infrastructure deployment' },
  ],
  services: [
    { name: 'h3ow3d-auth', description: 'Authentication service' },
    { name: 'h3ow3d-frontend', description: 'Frontend application' },
  ],
  utils: [
    { name: 'h3ow3d-actions-dashboard', description: 'GitHub Actions status dashboard' },
  ]
}

function App() {
  const [repoStatuses, setRepoStatuses] = useState({})
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [githubToken, setGithubToken] = useState('')
  const [showAuthSetup, setShowAuthSetup] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(10) // seconds
  const [sortBy, setSortBy] = useState('last-run-desc') // last-run-desc, last-run-asc, group, status
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [authMethod, setAuthMethod] = useState('none') // 'pat', 'github-app', or 'none'
  const [appInfo, setAppInfo] = useState(null)
  
  // GitHub App setup form state
  const [showGitHubAppForm, setShowGitHubAppForm] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [appId, setAppId] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [installationId, setInstallationId] = useState('')
  const [appFormError, setAppFormError] = useState('')

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isGitHubAppConfigured()) {
        setAuthMethod('github-app')
        try {
          const info = await getAppInstallationInfo()
          setAppInfo(info)
        } catch (err) {
          console.error('Failed to get app info:', err)
        }
        setLoading(false)
      } else if (localStorage.getItem('github_token')) {
        setGithubToken(localStorage.getItem('github_token'))
        setAuthMethod('pat')
        setLoading(false)
      } else {
        setShowAuthSetup(true)
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = () => {
    if (authMethod === 'github-app') {
      clearGitHubAppAuth()
      setAppInfo(null)
    } else {
      localStorage.removeItem('github_token')
    }
    setGithubToken('')
    setAuthMethod('none')
    setShowAuthSetup(true)
    setRepoStatuses({})
  }

  const getActiveToken = async () => {
    if (authMethod === 'github-app') {
      return await getGitHubAppToken()
    }
    return githubToken
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return
      }

      switch(e.key.toLowerCase()) {
        case 't':
          // Toggle between light and dark themes
          const nextTheme = theme === 'dark' ? 'light' : 'dark'
          setTheme(nextTheme)
          break
        case 'r':
          // Refresh
          if (!loading) {
            fetchAllStatuses()
          }
          break
        case 'f':
          // Toggle fullscreen
          toggleFullscreen()
          break
      }
    }

    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [theme, loading])

  const fetchRepoStatus = async (repoName, token) => {
    try {
      const headers = token ? { 'Authorization': `token ${token}` } : {}
      
      // Fetch latest workflow runs
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/actions/runs?per_page=1`,
        { headers }
      )
      
      if (!response.ok) {
        if (response.status === 401) {
          return { error: 'Authentication required' }
        }
        return { error: `HTTP ${response.status}` }
      }

      const data = await response.json()
      
      if (data.workflow_runs && data.workflow_runs.length > 0) {
        const run = data.workflow_runs[0]
        return {
          status: run.status,
          conclusion: run.conclusion,
          workflow: run.name,
          branch: run.head_branch,
          commitMessage: run.head_commit?.message?.split('\n')[0] || 'No message',
          url: run.html_url,
          updatedAt: run.updated_at,
        }
      }
      
      return { status: 'no_runs', conclusion: null }
    } catch (error) {
      return { error: error.message }
    }
  }

  const fetchAllStatuses = async () => {
    setLoading(true)
    const token = await getActiveToken()
    
    const allRepos = [
      ...REPOSITORIES.common.map(r => ({ ...r, category: 'common' })),
      ...REPOSITORIES.modules.map(r => ({ ...r, category: 'modules' })),
      ...REPOSITORIES.infra.map(r => ({ ...r, category: 'infra' })),
      ...REPOSITORIES.services.map(r => ({ ...r, category: 'services' })),
      ...REPOSITORIES.utils.map(r => ({ ...r, category: 'utils' })),
    ]

    const statuses = {}
    
    for (const repo of allRepos) {
      const status = await fetchRepoStatus(repo.name, token)
      statuses[repo.name] = { ...status, category: repo.category, description: repo.description }
    }

    setRepoStatuses(statuses)
    setLastUpdate(new Date())
    setLoading(false)
  }

  useEffect(() => {
    if (!showAuthSetup && authMethod !== 'none') {
      fetchAllStatuses()
      
      if (autoRefresh) {
        const interval = setInterval(fetchAllStatuses, refreshInterval * 1000)
        return () => clearInterval(interval)
      }
    }
  }, [showAuthSetup, authMethod, autoRefresh, refreshInterval])

  useEffect(() => {
    // Set Primer CSS theme attributes correctly
    document.documentElement.setAttribute('data-color-mode', theme)
    if (theme === 'light') {
      document.documentElement.setAttribute('data-light-theme', 'light')
    } else {
      document.documentElement.setAttribute('data-dark-theme', 'dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const saveToken = () => {
    localStorage.setItem('github_token', githubToken)
    setAuthMethod('pat')
    setShowAuthSetup(false)
  }

  const clearToken = () => {
    localStorage.removeItem('github_token')
    setGithubToken('')
    setAuthMethod('none')
    setShowAuthSetup(true)
  }

  const handleGitHubAppSetup = async () => {
    setAppFormError('')
    
    if (!appId || !privateKey || !installationId) {
      setAppFormError('All fields are required')
      return
    }

    try {
      const result = await validateGitHubAppCredentials(appId, privateKey, installationId)
      
      if (!result.valid) {
        setAppFormError(`Validation failed: ${result.error}`)
        return
      }

      saveGitHubAppCredentials(appId, privateKey, installationId)
      setAuthMethod('github-app')
      setShowGitHubAppForm(false)
      setShowAuthSetup(false)
      
      // Get app info
      const info = await getAppInstallationInfo()
      setAppInfo(info)
      
      // Clear form
      setAppId('')
      setPrivateKey('')
      setInstallationId('')
    } catch (err) {
      setAppFormError(`Setup failed: ${err.message}`)
    }
  }

  const sortRepos = (repos) => {
    const entries = Object.entries(repos)
    
    switch (sortBy) {
      case 'last-run-desc':
        return entries.sort(([, a], [, b]) => {
          if (!a.updatedAt) return 1
          if (!b.updatedAt) return -1
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
      
      case 'last-run-asc':
        return entries.sort(([, a], [, b]) => {
          if (!a.updatedAt) return 1
          if (!b.updatedAt) return -1
          return new Date(a.updatedAt) - new Date(b.updatedAt)
        })
      
      case 'group':
        return entries.sort(([, a], [, b]) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category)
          }
          // Within same group, sort by name
          return a.name || 0
        })
      
      case 'status':
        const statusOrder = {
          'failure': 0,
          'in-progress': 1,
          'warning': 2,
          'success': 3,
          'unknown': 4,
          'error': 5
        }
        return entries.sort(([, a], [, b]) => {
          const statusA = getStatusClass(a)
          const statusB = getStatusClass(b)
          return statusOrder[statusA] - statusOrder[statusB]
        })
      
      default:
        return entries
    }
  }

  // Calculate optimal columns to minimize empty space
  const getOptimalColumns = (itemCount) => {
    // In normal mode (with header), use more columns to reduce number of rows
    // This makes cards taller so content fits better
    let bestCols = 4
    let minEmpty = itemCount
    
    const maxCols = isFullscreen ? 6 : 5  // Normal mode: up to 5 columns
    const minCols = isFullscreen ? 3 : 4  // Normal mode: minimum 4 columns
    
    for (let cols = minCols; cols <= maxCols; cols++) {
      const rows = Math.ceil(itemCount / cols)
      const empty = (rows * cols) - itemCount
      if (empty < minEmpty) {
        minEmpty = empty
        bestCols = cols
      }
    }
    
    return bestCols
  }

  if (showAuthSetup) {
    return (
      <AuthSetup
        showGuide={showGuide}
        setShowGuide={setShowGuide}
        showGitHubAppForm={showGitHubAppForm}
        setShowGitHubAppForm={setShowGitHubAppForm}
        githubToken={githubToken}
        setGithubToken={setGithubToken}
        saveToken={saveToken}
        appId={appId}
        setAppId={setAppId}
        installationId={installationId}
        setInstallationId={setInstallationId}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        appFormError={appFormError}
        handleGitHubAppSetup={handleGitHubAppSetup}
      />
    )
  }

  return (
    <div className="p-4" style={{
      height: '100%', 
      maxWidth: isFullscreen ? 'none' : '1600px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      {!isFullscreen && (
        <DashboardHeader
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          authMethod={authMethod}
          appInfo={appInfo}
          handleLogout={handleLogout}
          clearToken={clearToken}
          theme={theme}
          setTheme={setTheme}
          sortBy={sortBy}
          setSortBy={setSortBy}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          lastUpdate={lastUpdate}
          fetchAllStatuses={fetchAllStatuses}
          loading={loading}
        />
      )}

      {loading && Object.keys(repoStatuses).length === 0 ? (
        <div className="text-center p-6 color-fg-muted">
          <div className="mb-2">Loading repository statuses...</div>
        </div>
      ) : (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${getOptimalColumns(Object.keys(repoStatuses).length)}, 1fr)`,
            gridAutoRows: '1fr',
            gap: '16px',
            height: '100%',
            alignContent: 'stretch'
          }}>
          {sortRepos(repoStatuses).map(([repoName, status]) => (
            <StatusCard key={repoName} repoName={repoName} status={status} />
          ))}
          </div>
        </div>
      )}
      
      {isFullscreen && (
        <button 
          onClick={toggleFullscreen} 
          className="btn btn-sm position-fixed top-0 right-0 m-3" 
          title="Exit Fullscreen"
          style={{zIndex: 1000}}
        >
          <Minimize size={16} />
        </button>
      )}
    </div>
  )
}

export default App
