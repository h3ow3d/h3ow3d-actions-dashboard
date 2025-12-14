import { 
  Github,
  Settings,
  Key,
  ExternalLink
} from 'lucide-react'
import GitHubAppGuide from './GitHubAppGuide'

export function AuthSetup({
  showGuide,
  setShowGuide,
  showGitHubAppForm,
  setShowGitHubAppForm,
  githubToken,
  setGithubToken,
  saveToken,
  appId,
  setAppId,
  installationId,
  setInstallationId,
  privateKey,
  setPrivateKey,
  appFormError,
  handleGitHubAppSetup
}) {
  return (
    <>
      {showGuide && <GitHubAppGuide onClose={() => setShowGuide(false)} />}
      <div className="p-3" style={{minHeight: '100vh', maxWidth: '480px', margin: '0 auto'}}>
        <div className="pt-6">
          <h1 className="f3 text-normal mb-2">
            <Github size={32} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}} />
            GitHub Authentication
          </h1>
          <p className="color-fg-muted">Choose an authentication method to access workflow statuses.</p>
        
        {!showGitHubAppForm && (
          <>
            <div className="Box mt-4">
              <div className="Box-header">
                <h2 className="Box-title">
                  <Settings size={20} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}} />
                  GitHub App (Recommended)
                </h2>
              </div>
              <div className="Box-body">
                <p className="color-fg-muted f6">More secure, automatic token refresh, fine-grained permissions.</p>
                <button onClick={() => setShowGitHubAppForm(true)} className="btn btn-primary btn-block mt-3">
                  <Github size={16} style={{marginRight: '0.5rem'}} />
                  Configure GitHub App
                </button>
                <p className="note f6 color-fg-muted mt-2 mb-0">
                  Need help?{' '}
                  <button 
                    onClick={(e) => { e.preventDefault(); setShowGuide(true); }} 
                    className="btn-link"
                  >
                    View setup guide
                  </button>
                </p>
              </div>
            </div>
            
            <div className="d-flex flex-items-center my-4">
              <div className="flex-1 border-bottom"></div>
              <span className="px-3 f6 color-fg-muted">OR</span>
              <div className="flex-1 border-bottom"></div>
            </div>
            
            <div className="Box">
              <div className="Box-header">
                <h2 className="Box-title">
                  <Key size={20} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}} />
                  Personal Access Token
                </h2>
              </div>
              <div className="Box-body">
                <p className="color-fg-muted f6">Simple setup, use a PAT with <code className="p-1">repo</code> scope.</p>
                <p className="f6 mb-2">
                  <a 
                    href="https://github.com/settings/tokens/new?scopes=repo&description=h3ow3d-dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="Link--primary"
                  >
                    Create a new token
                    <ExternalLink size={14} style={{display: 'inline', marginLeft: '4px', verticalAlign: 'text-bottom'}} />
                  </a>
                </p>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="form-control input-block"
                />
                <button 
                  onClick={saveToken} 
                  disabled={!githubToken}
                  className="btn btn-primary btn-block mt-3"
                >
                  <Key size={16} style={{marginRight: '0.5rem'}} />
                  Save Token & Continue
                </button>
                <p className="note f6 color-fg-muted mt-2 mb-0">Token is stored locally in your browser.</p>
              </div>
            </div>
          </>
        )}
        
        {showGitHubAppForm && (
          <div className="Box mt-4">
            <div className="Box-header">
              <button 
                onClick={() => setShowGitHubAppForm(false)} 
                className="btn btn-sm"
              >
                ← Back
              </button>
            </div>
            <div className="Box-body">
              <h2 className="f4 mb-2">GitHub App Configuration</h2>
              <p className="f6 color-fg-muted mb-3">
                Need help setting up?{' '}
                <button 
                  onClick={(e) => { e.preventDefault(); setShowGuide(true); }} 
                  className="btn-link"
                >
                  View setup guide
                </button>
              </p>
              
              <div className="form-group">
                <label htmlFor="app-id" className="form-label">App ID</label>
                <input
                  id="app-id"
                  type="text"
                  placeholder="123456"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="form-control input-block"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="installation-id" className="form-label">Installation ID</label>
                <input
                  id="installation-id"
                  type="text"
                  placeholder="12345678"
                  value={installationId}
                  onChange={(e) => setInstallationId(e.target.value)}
                  className="form-control input-block"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="private-key" className="form-label">Private Key (PEM)</label>
                <textarea
                  id="private-key"
                  placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  rows={8}
                  className="form-control input-block"
                />
              </div>
              
              {appFormError && (
                <div className="flash flash-error">
                  {appFormError}
                </div>
              )}
              
              <button 
                onClick={handleGitHubAppSetup} 
                disabled={!appId || !privateKey || !installationId}
                className="btn btn-primary btn-block mt-3"
              >
                <Settings size={16} style={{marginRight: '0.5rem'}} />
                Save & Authenticate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
