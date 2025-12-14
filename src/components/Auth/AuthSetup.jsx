import { MarkGithubIcon, GearIcon } from '@primer/octicons-react'
import { Button } from '@primer/react'
import GitHubAppGuide from './GitHubAppGuide'
import { GitHubAppForm } from './GitHubAppForm'
import { PatForm } from './PatForm'

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
            <MarkGithubIcon size={32} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}} />
            GitHub Authentication
          </h1>
          <p className="color-fg-muted">Choose an authentication method to access workflow statuses.</p>
        
        {!showGitHubAppForm && (
          <>
            <div className="Box mt-4">
              <div className="Box-header">
                <h2 className="Box-title">
                  <GearIcon size={20} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}} />
                  GitHub App (Recommended)
                </h2>
              </div>
              <div className="Box-body">
                <p className="color-fg-muted f6">More secure, automatic token refresh, fine-grained permissions.</p>
                <Button 
                  onClick={() => setShowGitHubAppForm(true)} 
                  variant="primary"
                  block
                  leadingVisual={MarkGithubIcon}
                  sx={{ mt: 3 }}
                >
                  Configure GitHub App
                </Button>
                <p className="note f6 color-fg-muted mt-2 mb-0">
                  Need help?{' '}
                  <Button 
                    onClick={(e) => { e.preventDefault(); setShowGuide(true); }} 
                    variant="invisible"
                    sx={{ padding: 0, height: 'auto', fontWeight: 'normal' }}
                  >
                    View setup guide
                  </Button>
                </p>
              </div>
            </div>
            
            <div className="d-flex flex-items-center my-4">
              <div className="flex-1 border-bottom"></div>
              <span className="px-3 f6 color-fg-muted">OR</span>
              <div className="flex-1 border-bottom"></div>
            </div>
            
            <PatForm
              githubToken={githubToken}
              setGithubToken={setGithubToken}
              onSubmit={saveToken}
            />
          </>
        )}
        
        {showGitHubAppForm && (
          <GitHubAppForm
            appId={appId}
            setAppId={setAppId}
            installationId={installationId}
            setInstallationId={setInstallationId}
            privateKey={privateKey}
            setPrivateKey={setPrivateKey}
            appFormError={appFormError}
            onSubmit={handleGitHubAppSetup}
            onBack={() => setShowGitHubAppForm(false)}
            onShowGuide={() => setShowGuide(true)}
          />
        )}
      </div>
    </div>
    </>
  )
}
