import { useState, useEffect } from 'react'
import './App.css'
import { Dashboard } from './components/Dashboard/Dashboard'
import { AuthSetup } from './components/Auth/AuthSetup'
import { useGitHubStatus } from './hooks/useGitHubStatus'
import { useTheme } from './hooks/useTheme'
import { useAuth } from './hooks/useAuth'
import { REPOSITORIES } from './constants'

function App() {
  const [sortBy, setSortBy] = useState('last-run-desc')
  const [theme, setTheme] = useTheme()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(10)
  const [showGuide, setShowGuide] = useState(false)

  const auth = useAuth()
  
  const { repoStatuses, loading, lastUpdate, fetchAllStatuses } = useGitHubStatus(
    REPOSITORIES,
    auth.getActiveToken,
    auth.authMethod,
    auth.showAuthSetup,
    autoRefresh,
    refreshInterval
  )

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
  }, [theme, loading, fetchAllStatuses, setTheme])

  if (auth.showAuthSetup) {
    return (
      <AuthSetup
        showGuide={showGuide}
        setShowGuide={setShowGuide}
        showGitHubAppForm={auth.showGitHubAppForm}
        setShowGitHubAppForm={auth.setShowGitHubAppForm}
        githubToken={auth.githubToken}
        setGithubToken={auth.setGithubToken}
        saveToken={auth.saveToken}
        appId={auth.appId}
        setAppId={auth.setAppId}
        installationId={auth.installationId}
        setInstallationId={auth.setInstallationId}
        privateKey={auth.privateKey}
        setPrivateKey={auth.setPrivateKey}
        appFormError={auth.appFormError}
        handleGitHubAppSetup={auth.handleGitHubAppSetup}
      />
    )
  }

  return (
    <Dashboard
      repoStatuses={repoStatuses}
      loading={loading}
      lastUpdate={lastUpdate}
      fetchAllStatuses={fetchAllStatuses}
      isFullscreen={isFullscreen}
      toggleFullscreen={toggleFullscreen}
      authMethod={auth.authMethod}
      appInfo={auth.appInfo}
      handleLogout={auth.handleLogout}
      clearToken={auth.clearToken}
      theme={theme}
      setTheme={setTheme}
      sortBy={sortBy}
      setSortBy={setSortBy}
      autoRefresh={autoRefresh}
      setAutoRefresh={setAutoRefresh}
      refreshInterval={refreshInterval}
      setRefreshInterval={setRefreshInterval}
    />
  )
}

export default App
